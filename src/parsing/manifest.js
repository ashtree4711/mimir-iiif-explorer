const asArray = (value) => (Array.isArray(value) ? value : (value ? [value] : []));

const getType = (obj) => (obj && (obj.type || obj['@type'])) || '';

const escapeHtml = (text) => String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

const extractXYWH = (value) => {
    if (!value || typeof value !== 'string') return null;
    const match = value.match(/xywh=([^&]+)/);
    if (!match) return null;
    const raw = match[1].replace(/^pixel:/, '').replace(/^pct:/, '').trim();
    const nums = raw.split(',').map(Number);
    if (nums.length !== 4 || nums.some((num) => !Number.isFinite(num))) return null;
    return nums;
};

const extractSvgXYWH = (svgText) => {
    if (!svgText || typeof DOMParser === 'undefined') return null;
    try {
        const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
        const svg = doc.documentElement;
        if (!svg) return null;
        const shape = svg.querySelector('rect, circle, ellipse, polygon, polyline, path');
        if (!shape) return null;
        const temp = document.createElement('div');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        temp.style.top = '-9999px';
        const liveSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const imported = document.importNode ? document.importNode(shape, true) : shape.cloneNode(true);
        liveSvg.appendChild(imported);
        temp.appendChild(liveSvg);
        document.body.appendChild(temp);
        const bbox = imported.getBBox();
        document.body.removeChild(temp);
        return [bbox.x, bbox.y, bbox.width, bbox.height];
    } catch {
        return null;
    }
};

const parseTarget = (target, fallbackCanvasId) => {
    if (!target) return { canvasId: fallbackCanvasId, xywh: null };
    if (typeof target === 'string') {
        const [base, fragment] = target.split('#');
        const xywh = extractXYWH(fragment || target);
        return { canvasId: base || fallbackCanvasId, xywh };
    }
    if (Array.isArray(target)) return parseTarget(target[0], fallbackCanvasId);
    const source = target.source || target.id || target['@id'];
    const selectors = asArray(target.selector || target.selectors);
    let xywh = null;
    selectors.forEach((selector) => {
        if (xywh) return;
        const value = selector?.value || selector?.['@value'] || '';
        xywh = extractXYWH(value);
        if (!xywh && String(selector?.type || selector?.['@type']).includes('Svg')) {
            xywh = extractSvgXYWH(value);
        }
    });
    return { canvasId: source || fallbackCanvasId, xywh };
};

const extractTextBodies = (body, resolveLangValue) => {
    const bodies = asArray(body);
    const results = [];
    bodies.forEach((entry) => {
        if (!entry) return;
        const type = getType(entry);
        const format = entry.format || '';
        if (type === 'SpecificResource' && entry.source) {
            results.push(...extractTextBodies(entry.source, resolveLangValue));
            return;
        }
        const value = entry.value || entry.chars || entry.text || entry['@value'] || (typeof entry === 'string' ? entry : '');
        if (!value) return;
        const isText = type === 'TextualBody' || format.startsWith('text/');
        if (!isText && typeof entry !== 'string') return;
        const isHtml = format.includes('html');
        const html = isHtml ? value : `<p>${escapeHtml(value).replace(/\\n/g, '<br>')}</p>`;
        const label = resolveLangValue(entry.label, '');
        results.push({ html, label });
    });
    return results;
};

export function resolveContentState(data, { ensureHttps } = {}) {
    if (!data || typeof data !== 'object') return null;
    const ensureUrl = ensureHttps || ((value) => value);
    const getId = (obj) => ensureUrl((obj && (obj.id || obj['@id'])) || null);
    const type = String(data.type || data['@type'] || '').toLowerCase();
    const motivations = asArray(data.motivation).map((motivation) => String(motivation || '').toLowerCase());
    const isContentState = type.includes('annotation') && motivations.some((motivation) => motivation.includes('contentstate'));
    if (!isContentState) return null;

    const target = data.target || data.on;
    if (typeof target === 'string') return { manifestUrl: target, target };
    if (target && typeof target === 'object') {
        const targetType = String(target.type || target['@type'] || '').toLowerCase();
        const targetId = getId(target);
        const partOf = asArray(target.partOf || target.within).map(getId).find(Boolean);
        if (targetType.includes('manifest') && targetId) return { manifestUrl: targetId, target };
        if (partOf) return { manifestUrl: partOf, target };
        if (targetId && targetId.includes('/manifest')) return { manifestUrl: targetId, target };
    }

    return null;
}

export function extractAltoSourcesFromItems(items) {
    const sources = [];
    asArray(items).forEach((anno) => {
        const motivation = anno?.motivation || '';
        if (String(motivation).includes('painting')) return;
        const bodies = asArray(anno?.body || anno?.resource);
        bodies.forEach((body) => {
            if (!body) return;
            if (getType(body) === 'SpecificResource' && body.source) {
                sources.push(...extractAltoSourcesFromItems([body.source]));
                return;
            }
            const id = body.id || body['@id'] || (typeof body === 'string' ? body : '');
            const format = body.format || '';
            if (!id) return;
            if (format.includes('alto') || format.includes('xml') || id.endsWith('.xml')) {
                sources.push(id);
            }
        });
    });
    return sources.filter(Boolean);
}

export function parseAnnotationPageItems({
    items,
    canvasId,
    pageStylesheets = [],
    ensureHttps,
    resolveLangValue
}) {
    const ensureUrl = ensureHttps || ((value) => value);
    const resolveLabel = resolveLangValue || ((value, fallback = '') => fallback ?? value ?? '');
    const getId = (obj) => ensureUrl((obj && (obj.id || obj['@id'])) || null);
    const annotations = [];

    asArray(items).forEach((anno) => {
        if (!anno) return;
        const motivation = anno.motivation || '';
        const textBodies = extractTextBodies(anno.body || anno.resource, resolveLabel);
        if (!textBodies.length) return;
        if (String(motivation).includes('painting')) return;

        const targetInfo = parseTarget(anno.target || anno.on, canvasId);
        const html = textBodies.map((body) => body.html).join('');
        const label = resolveLabel(anno.label, '') || textBodies[0]?.label || '';
        const id = getId(anno) || `${canvasId || 'canvas'}-anno-${annotations.length + 1}`;
        const stylesheets = [...pageStylesheets];
        const stylesheet = anno.stylesheet || anno.styleSheet;
        if (stylesheet) {
            if (typeof stylesheet === 'string') stylesheets.push(stylesheet);
            else if (Array.isArray(stylesheet)) {
                stylesheet.forEach((sheet) => stylesheets.push(sheet.id || sheet['@id'] || sheet));
            } else {
                stylesheets.push(stylesheet.id || stylesheet['@id']);
            }
        }
        const styleClass = anno.styleClass || anno.class || anno.body?.styleClass || anno.target?.styleClass || '';
        annotations.push({
            id,
            label,
            html,
            canvasId: targetInfo.canvasId || canvasId,
            xywh: targetInfo.xywh,
            styleClass,
            stylesheets: stylesheets.filter(Boolean).map((href) => ensureUrl(href))
        });
    });

    return annotations;
}

export function extractPointSelector(target) {
    if (!target) return null;
    const collect = (selector, bucket) => {
        if (!selector) return;
        if (Array.isArray(selector)) selector.forEach((entry) => collect(entry, bucket));
        else if (selector.selector) collect(selector.selector, bucket);
        else bucket.push(selector);
    };
    const selectors = [];
    collect(target.selector || target, selectors);
    const point = selectors.find((selector) => String(selector.type || selector['@type']).toLowerCase().includes('pointselector'));
    if (!point) return null;
    const x = Number(point.x);
    const y = Number(point.y);
    const z = Number(point.z);
    if (![x, y, z].every((value) => Number.isFinite(value))) return null;
    return { x, y, z };
}

export function parseImageApiRegion(region, imageW, imageH) {
    if (!region || typeof region !== 'string') return null;
    let raw = region.trim();
    let isPct = false;
    if (raw.startsWith('pct:')) {
        isPct = true;
        raw = raw.slice(4);
    }
    const nums = raw.split(',').map(Number);
    if (nums.length !== 4 || nums.some((num) => !Number.isFinite(num))) return null;
    let [x, y, w, h] = nums;
    if (isPct) {
        if (!Number.isFinite(imageW) || !Number.isFinite(imageH) || imageW <= 0 || imageH <= 0) return null;
        x = imageW * (x / 100);
        y = imageH * (y / 100);
        w = imageW * (w / 100);
        h = imageH * (h / 100);
    }
    return { x, y, w, h };
}

export function extractImageApiRegion(body) {
    const bodies = asArray(body);
    for (const entry of bodies) {
        if (!entry) continue;
        const type = getType(entry);
        if (type === 'SpecificResource') {
            const selectors = asArray(entry.selector || entry.selectors);
            const source = entry.source || entry.resource || null;
            const imageW = source?.width;
            const imageH = source?.height;
            for (const selector of selectors) {
                const selectorType = String(selector?.type || selector?.['@type'] || '').toLowerCase();
                if (!selectorType.includes('imageapiselector')) continue;
                const region = parseImageApiRegion(selector?.region, imageW, imageH);
                if (region) return region;
            }
            if (source) {
                const nested = extractImageApiRegion(source);
                if (nested) return nested;
            }
        }
    }
    return null;
}

export function detectType(manifest, parsed) {
    const manifestType = (manifest.type || manifest['@type'] || '').toLowerCase();
    if (manifestType.includes('collection')) return 'collection';
    if (parsed?.modelItems?.length) return '3d';
    if (parsed?.avItems?.length) return 'av';
    if (parsed?.imageSources?.length) return 'image';
    return (manifest.items || manifest.sequences) ? 'image' : 'unknown';
}

export function parseManifest(manifest, helpers) {
    const {
        ensureHttps,
        resolveThumb,
        collectManifestLanguages,
        pickManifestLanguage,
        resolveLangValue,
        extractAltoSourcesFromItems: extractAltoSources = extractAltoSourcesFromItems,
        extractPointSelector: extractPoint = extractPointSelector,
        extractImageApiRegion: extractRegion = extractImageApiRegion,
        detectType: detectManifestType = detectType
    } = helpers;

    const getId = (obj) => ensureHttps((obj && (obj.id || obj['@id'])) || null);
    const manifestLanguages = collectManifestLanguages(manifest);
    const activeManifestLanguage = pickManifestLanguage(manifestLanguages);
    const getLabel = (label, fallback = '') => resolveLangValue(label, fallback, activeManifestLanguage);
    const getSummary = (summary) => getLabel(summary);

    const extractImageServiceId = (service) => {
        const services = asArray(service);
        for (const svc of services) {
            const type = getType(svc);
            const profile = svc?.profile;
            const id = getId(svc);
            const profileStr = typeof profile === 'string' ? profile : '';
            if (type.includes('ImageService') || profileStr.includes('iiif.io/api/image')) {
                if (id) return id.endsWith('/info.json') ? id : `${id}/info.json`;
            }
        }
        return null;
    };

    const extractFulltextSourcesFromSeeAlso = (seeAlso) => {
        const sources = [];
        asArray(seeAlso).forEach((entry) => {
            if (!entry) return;
            const id = getId(entry) || (typeof entry === 'string' ? entry : '');
            if (!id) return;
            const format = (entry.format || '').toLowerCase();
            const profile = (entry.profile || '').toLowerCase();
            const label = getLabel(entry.label).toLowerCase();
            const isAlto = format.includes('alto')
                || profile.includes('alto')
                || label.includes('alto')
                || id.toLowerCase().includes('alto');
            const isXml = format.includes('xml') || id.toLowerCase().endsWith('.xml');
            if (isAlto || isXml) sources.push(id);
        });
        return sources;
    };

    const parseAnnotationPages = (pages, canvasId, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId) => {
        const annotations = [];
        asArray(pages).forEach((page) => {
            const pageStylesheets = [];
            const pageSheet = page?.stylesheet || page?.styleSheet;
            if (pageSheet) {
                if (typeof pageSheet === 'string') pageStylesheets.push(pageSheet);
                else if (Array.isArray(pageSheet)) {
                    pageSheet.forEach((sheet) => pageStylesheets.push(sheet.id || sheet['@id'] || sheet));
                } else {
                    pageStylesheets.push(pageSheet.id || pageSheet['@id']);
                }
            }
            if (typeof page === 'string') {
                annotationPageRefs.push({ id: page, canvasId });
                fulltextPageRefs.push({ id: page, canvasId });
                return;
            }
            if (page && !page.items && !page.annotations && !page.resources && (page.id || page['@id'])) {
                annotationPageRefs.push({ id: page.id || page['@id'], canvasId });
                fulltextPageRefs.push({ id: page.id || page['@id'], canvasId });
                return;
            }

            const items = asArray(page?.items || page?.annotations || page?.resources);
            const fulltextSources = extractAltoSources(items);
            if (fulltextSources.length) {
                if (!fulltextSourcesByCanvasId[canvasId]) fulltextSourcesByCanvasId[canvasId] = [];
                fulltextSources.forEach((src) => {
                    if (!fulltextSourcesByCanvasId[canvasId].includes(src)) {
                        fulltextSourcesByCanvasId[canvasId].push(src);
                    }
                });
            }
            annotations.push(...parseAnnotationPageItems({
                items,
                canvasId,
                pageStylesheets,
                ensureHttps,
                resolveLangValue: getLabel
            }));
        });
        return annotations;
    };

    const parseBody = (body) => {
        const bodies = asArray(body);
        const imageSources = [];
        const avItems = [];
        const modelItems = [];
        const cameraItems = [];
        bodies.forEach((entry) => {
            if (!entry) return;
            const type = getType(entry);
            const id = getId(entry);
            const format = entry.format || '';
            if (type === 'SpecificResource' && entry.source) {
                const nested = parseBody(entry.source);
                imageSources.push(...nested.imageSources);
                avItems.push(...nested.avItems);
                modelItems.push(...nested.modelItems);
                cameraItems.push(...nested.cameraItems);
            }
            const serviceId = extractImageServiceId(entry.service || entry.services);
            if (serviceId) imageSources.push(serviceId);
            else if (format.startsWith('image/') && id) imageSources.push({ type: 'image', url: id });
            if (id) {
                if (type === 'Sound') {
                    avItems.push({ id, mediaType: 'audio', label: getLabel(entry.label) });
                } else if (type === 'Video') {
                    avItems.push({ id, mediaType: 'video', label: getLabel(entry.label) });
                } else if (format.startsWith('audio/')) {
                    avItems.push({ id, mediaType: 'audio', label: getLabel(entry.label) });
                } else if (format.startsWith('video/')) {
                    avItems.push({ id, mediaType: 'video', label: getLabel(entry.label) });
                }
            }
            if ((type === 'Model' || format.includes('gltf') || (typeof id === 'string' && (id.endsWith('.glb') || id.endsWith('.gltf')))) && id) {
                modelItems.push({ id, label: getLabel(entry.label) });
            }
            if (type === 'PerspectiveCamera' && id) {
                cameraItems.push({
                    id,
                    label: getLabel(entry.label),
                    fieldOfView: entry.fieldOfView ?? entry.fov,
                    near: entry.near,
                    far: entry.far
                });
            }
        });
        return { imageSources, avItems, modelItems, cameraItems };
    };

    const parseCanvas = (canvas, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId) => {
        const imageSources = [];
        const avItems = [];
        const modelItems = [];
        const cameraItems = [];
        let region = null;
        const metadata = asArray(canvas.metadata).map((entry) => ({
            label: getLabel(entry.label),
            value: getLabel(entry.value)
        })).filter((entry) => entry.label || entry.value);
        const placeholderCanvas = canvas.placeholderCanvas;
        const accompanyingCanvas = canvas.accompanyingCanvas;

        const resolveImageUrl = (src) => {
            if (!src) return null;
            if (typeof src === 'string') {
                const safe = ensureHttps(src);
                if (safe.endsWith('/info.json')) return `${safe.slice(0, -10)}/full/max/0/default.jpg`;
                return safe;
            }
            if (src.url) return ensureHttps(src.url);
            return null;
        };

        const extractImageSourcesFromItems = (items) => {
            const list = [];
            const annos = [];
            asArray(items).forEach((entry) => {
                if (!entry) return;
                const type = String(getType(entry)).toLowerCase();
                if (type.includes('annotationpage') || entry.items) {
                    annos.push(...asArray(entry.items));
                } else if (type.includes('annotation') || entry.body || entry.resource) {
                    annos.push(entry);
                }
            });
            annos.forEach((anno) => {
                const motivation = anno.motivation || '';
                const motivations = Array.isArray(motivation)
                    ? motivation.map((item) => String(item).toLowerCase())
                    : [String(motivation).toLowerCase()];
                if (!motivation || motivations.some((item) => item.includes('painting'))) {
                    const parsed = parseBody(anno.body || anno.resource);
                    list.push(...parsed.imageSources);
                }
            });
            return list;
        };

        let placeholderImage = null;
        if (placeholderCanvas && typeof placeholderCanvas === 'object') {
            const placeholderSources = extractImageSourcesFromItems(
                placeholderCanvas.items || placeholderCanvas.annotations || placeholderCanvas.otherContent
            );
            if (placeholderSources.length) {
                const src = placeholderSources[0];
                placeholderImage = resolveImageUrl(src) || resolveThumb(src, 400);
            }
        }

        let accompanyingImage = null;
        if (accompanyingCanvas && typeof accompanyingCanvas === 'object') {
            const accompanyingSources = extractImageSourcesFromItems(
                accompanyingCanvas.items || accompanyingCanvas.annotations || accompanyingCanvas.otherContent
            );
            if (accompanyingSources.length) {
                const src = accompanyingSources[0];
                accompanyingImage = resolveImageUrl(src) || resolveThumb(src, 400);
            }
        }

        const collectAnnos = (container) => {
            const list = [];
            asArray(container).forEach((entry) => {
                if (!entry) return;
                const type = String(getType(entry)).toLowerCase();
                if (type.includes('annotationpage') || entry.items) {
                    list.push(...asArray(entry.items));
                } else if (type.includes('annotation') || entry.body || entry.resource) {
                    list.push(entry);
                }
            });
            return list;
        };

        const annos = [
            ...collectAnnos(canvas.items),
            ...collectAnnos(canvas.annotations),
            ...collectAnnos(canvas.otherContent)
        ];
        annos.forEach((anno) => {
            if (!anno) return;
            const motivation = anno.motivation || '';
            const motivations = Array.isArray(motivation)
                ? motivation.map((item) => String(item).toLowerCase())
                : [String(motivation).toLowerCase()];
            if (!motivation || motivations.some((item) => item.includes('painting'))) {
                const parsed = parseBody(anno.body || anno.resource);
                if (!region) {
                    const foundRegion = extractRegion(anno.body || anno.resource);
                    if (foundRegion) region = foundRegion;
                }
                const point = extractPoint(anno.target || anno.on);
                imageSources.push(...parsed.imageSources);
                parsed.avItems.forEach((item) => avItems.push({ ...item, canvasId: getId(canvas) }));
                const models = point ? parsed.modelItems.map((item) => ({ ...item, position: point })) : parsed.modelItems;
                modelItems.push(...models);
                cameraItems.push(...parsed.cameraItems);
            }
        });

        const images = asArray(canvas.images);
        images.forEach((img) => {
            const res = img.resource || img.body;
            const parsed = parseBody(res);
            imageSources.push(...parsed.imageSources);
        });

        const pickThumb = (value) => {
            if (!value) return null;
            if (typeof value === 'string') return value;
            if (Array.isArray(value)) return pickThumb(value[0]);
            return value.id || value['@id'] || (value.service && getId(value.service)) || null;
        };

        const thumbFromSource = (src) => {
            if (!src) return null;
            if (typeof src === 'string') {
                const base = src.endsWith('/info.json') ? src.slice(0, -10) : src;
                return `${base}/full/!200,200/0/default.jpg`;
            }
            if (src.url) return src.url;
            return null;
        };

        const thumbnail = pickThumb(canvas.thumbnail) || thumbFromSource(imageSources[0]) || null;
        const annotations = [
            ...parseAnnotationPages(canvas.annotations, getId(canvas), annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId),
            ...parseAnnotationPages(canvas.items, getId(canvas), annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId),
            ...parseAnnotationPages(canvas.otherContent, getId(canvas), annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId)
        ];
        const seeAlsoSources = extractFulltextSourcesFromSeeAlso(canvas.seeAlso);
        if (seeAlsoSources.length) {
            const key = getId(canvas);
            if (key) {
                if (!fulltextSourcesByCanvasId[key]) fulltextSourcesByCanvasId[key] = [];
                seeAlsoSources.forEach((src) => {
                    if (!fulltextSourcesByCanvasId[key].includes(src)) fulltextSourcesByCanvasId[key].push(src);
                });
            }
        }

        return {
            id: getId(canvas),
            label: getLabel(canvas.label),
            imageSources,
            avItems,
            modelItems,
            cameraItems,
            thumbnail,
            annotations,
            region,
            metadata,
            placeholderImage,
            accompanyingImage
        };
    };

    const manifestType = getType(manifest).toLowerCase();
    const behavior = asArray(manifest.behavior).map((entry) => (typeof entry === 'string' ? entry.toLowerCase() : '')).filter(Boolean);
    const isCollection = manifestType.includes('collection');
    const label = getLabel(manifest.label);
    const summary = getSummary(manifest.summary || manifest.description);
    const metadata = asArray(manifest.metadata);
    const context = manifest['@context'];
    const contextStr = Array.isArray(context) ? context.join(' ') : (context || '');
    const presentationVersion = contextStr.includes('presentation/2')
        ? 'v2'
        : (contextStr.includes('presentation/3') ? 'v3' : '');
    const prettyType = (() => {
        const kind = (manifest.type || manifest['@type'] || 'Manifest').toString().replace('sc:', '').replace('oa:', '');
        return `IIIF Presentation ${presentationVersion ? `${presentationVersion} ` : ''}${kind}`.trim();
    })();
    const requiredStatement = manifest.requiredStatement || {};
    const attributionLabel = getLabel(requiredStatement.label) || 'Attribution';
    const attribution = getLabel(requiredStatement.value || manifest.attribution || '');

    const pickHomepage = (home) => {
        if (!home) return null;
        if (typeof home === 'string') return home;
        if (Array.isArray(home)) return pickHomepage(home[0]);
        return home.id || home['@id'] || home.url || null;
    };

    const pickLogo = (logo) => {
        if (!logo) return null;
        if (typeof logo === 'string') return logo;
        if (Array.isArray(logo)) return pickLogo(logo[0]);
        return logo.id || logo['@id'] || logo.url || (logo.service && getId(logo.service)) || null;
    };

    const provider = (() => {
        const raw = asArray(manifest.provider)[0];
        if (!raw) return {};
        return {
            label: getLabel(raw.label),
            homepage: pickHomepage(raw.homepage),
            logoUrl: pickLogo(raw.logo || raw.image || raw.thumbnail)
        };
    })();

    const logoUrl = pickLogo(manifest.logo);
    const license = getLabel(manifest.license || manifest.rights || '');

    const canvases = [];
    const canvasIndexById = {};
    const imageSources = [];
    const avItems = [];
    const modelItems = [];
    const cameraItems = [];
    const annotationsByCanvasId = {};
    const annotationPageRefs = [];
    const fulltextPageRefs = [];
    const fulltextSourcesByCanvasId = {};

    const v3Canvases = asArray(manifest.items);
    if (v3Canvases.length) {
        v3Canvases.forEach((canvas) => {
            const parsedCanvas = parseCanvas(canvas, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId);
            const idx = canvases.length;
            canvases.push({
                id: parsedCanvas.id,
                label: parsedCanvas.label,
                thumbnail: parsedCanvas.thumbnail,
                imageSources: parsedCanvas.imageSources,
                region: parsedCanvas.region,
                placeholderImage: parsedCanvas.placeholderImage,
                accompanyingImage: parsedCanvas.accompanyingImage
            });
            if (parsedCanvas.id) canvasIndexById[parsedCanvas.id] = idx;
            imageSources.push(...parsedCanvas.imageSources);
            avItems.push(...parsedCanvas.avItems);
            modelItems.push(...parsedCanvas.modelItems);
            cameraItems.push(...parsedCanvas.cameraItems);
            parsedCanvas.annotations?.forEach((anno) => {
                const key = anno.canvasId || parsedCanvas.id;
                if (!key) return;
                if (!annotationsByCanvasId[key]) annotationsByCanvasId[key] = [];
                annotationsByCanvasId[key].push(anno);
            });
        });
    }

    const v2Seq = asArray(manifest.sequences)[0];
    const v2Canvases = v2Seq ? asArray(v2Seq.canvases) : [];
    if (v2Canvases.length) {
        v2Canvases.forEach((canvas) => {
            const parsedCanvas = parseCanvas(canvas, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId);
            const idx = canvases.length;
            canvases.push({
                id: parsedCanvas.id,
                label: parsedCanvas.label,
                thumbnail: parsedCanvas.thumbnail,
                imageSources: parsedCanvas.imageSources,
                region: parsedCanvas.region,
                placeholderImage: parsedCanvas.placeholderImage,
                accompanyingImage: parsedCanvas.accompanyingImage
            });
            if (parsedCanvas.id) canvasIndexById[parsedCanvas.id] = idx;
            imageSources.push(...parsedCanvas.imageSources);
            avItems.push(...parsedCanvas.avItems);
            modelItems.push(...parsedCanvas.modelItems);
            cameraItems.push(...parsedCanvas.cameraItems);
            parsedCanvas.annotations?.forEach((anno) => {
                const key = anno.canvasId || parsedCanvas.id;
                if (!key) return;
                if (!annotationsByCanvasId[key]) annotationsByCanvasId[key] = [];
                annotationsByCanvasId[key].push(anno);
            });
        });
    }

    const normalizeCanvasId = (id) => (typeof id === 'string' ? id.split('#')[0] : id);
    const topRanges = asArray(manifest.structures || manifest.ranges);
    const sequenceOptions = topRanges.map((range, idx) => {
        if (!range) return null;
        const items = asArray(range.items || range.canvases || range.members);
        const canvasIds = items.map(getId).filter(Boolean).map(normalizeCanvasId)
            .filter((id) => canvasIndexById[id] !== undefined);
        if (canvasIds.length < 2) return null;
        const id = getId(range) || `sequence-${idx + 1}`;
        const label = getLabel(range.label) || `Sequence ${idx + 1}`;
        return { id, label, canvasIds };
    }).filter(Boolean);

    const parseStartTime = (selector) => {
        if (!selector) return null;
        const sel = Array.isArray(selector) ? selector[0] : selector;
        const type = String(sel?.type || sel?.['@type'] || '').toLowerCase();
        if (type.includes('pointselector') && Number.isFinite(Number(sel.t))) return Number(sel.t);
        const value = sel?.value || sel?.['@value'] || '';
        const match = String(value).match(/t=([0-9.]+)/);
        if (match) return Number(match[1]);
        return null;
    };

    const startRef = manifest.start || manifest.startCanvas;
    let startId = typeof startRef === 'string' ? startRef : getId(startRef);
    let startTime = null;
    if (startRef && typeof startRef === 'object') {
        const source = startRef.source || startRef.item;
        const targetType = String(startRef.type || startRef['@type'] || '').toLowerCase();
        if (source && (targetType.includes('specificresource') || !startId)) {
            startId = getId(source) || source;
        }
        startTime = parseStartTime(startRef.selector || startRef.selectors);
    }
    const startCanvasIndex = (startId && canvasIndexById[startId] !== undefined) ? canvasIndexById[startId] : null;

    const manifestSeeAlso = extractFulltextSourcesFromSeeAlso(manifest.seeAlso);
    if (manifestSeeAlso.length && canvases.length === 1) {
        const key = canvases[0].id;
        if (key) {
            if (!fulltextSourcesByCanvasId[key]) fulltextSourcesByCanvasId[key] = [];
            manifestSeeAlso.forEach((src) => {
                if (!fulltextSourcesByCanvasId[key].includes(src)) fulltextSourcesByCanvasId[key].push(src);
            });
        }
    }

    const parseTimeRangeFromId = (id) => {
        if (!id || typeof id !== 'string' || !id.includes('#')) return null;
        const fragment = id.split('#')[1] || '';
        const match = fragment.match(/t=([0-9.]+)(?:,([0-9.]+))?/);
        if (!match) return null;
        const start = Number(match[1]);
        const end = Number(match[2]);
        if (!Number.isFinite(start)) return null;
        return { start, end: Number.isFinite(end) ? end : Number.POSITIVE_INFINITY };
    };

    const parseRanges = (ranges) => asArray(ranges).map((range) => {
        const parsedRange = {
            id: getId(range),
            label: getLabel(range.label),
            items: asArray(range.items || range.canvases || range.members).map(getId).filter(Boolean)
        };
        const children = asArray(range.items || range.ranges || range.members)
            .filter((item) => typeof item === 'object' && (getType(item).toLowerCase().includes('range') || item.items || item.ranges));
        parsedRange.children = parseRanges(children);
        const childIds = parsedRange.children.flatMap((child) => child.canvasIds || []);
        parsedRange.canvasIds = Array.from(new Set([
            ...parsedRange.items.map(normalizeCanvasId),
            ...childIds.map(normalizeCanvasId)
        ]));
        const itemTimes = parsedRange.items.map(parseTimeRangeFromId).filter(Boolean);
        const childTimes = parsedRange.children.flatMap((child) => child.timeRanges || []);
        parsedRange.timeRanges = [...itemTimes, ...childTimes];
        return parsedRange;
    });

    const ranges = parseRanges(manifest.structures || manifest.ranges);
    const rangesFlat = [];
    const assignRangeIdx = (list) => {
        list.forEach((range) => {
            range._idx = rangesFlat.length;
            rangesFlat.push(range);
            if (range.children?.length) assignRangeIdx(range.children);
        });
    };
    assignRangeIdx(ranges);

    const items = asArray(manifest.items || manifest.members).map((item) => ({
        id: getId(item),
        label: getLabel(item.label),
        type: getType(item)
    })).filter((item) => item.id);

    const collectionLinks = [];
    const pushCollection = (collection) => {
        if (!collection) return;
        const id = getId(collection);
        const lbl = getLabel(collection?.label || collection);
        if (id || lbl) collectionLinks.push({ id, label: lbl || id });
    };
    asArray(manifest.partOf).forEach(pushCollection);
    asArray(manifest.within).forEach(pushCollection);

    const dedupe = (arr) => {
        const seen = new Set();
        return arr.filter((item) => {
            const key = typeof item === 'string' ? item : JSON.stringify(item);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };

    return {
        activeManifestLanguage,
        parsed: {
            type: isCollection ? 'collection' : detectManifestType(manifest, { imageSources, avItems, modelItems }),
            label,
            summary,
            metadata,
            iiifTypeLabel: prettyType,
            attribution,
            attributionLabel,
            logoUrl,
            license,
            provider,
            canvases,
            canvasIndexById,
            imageSources: dedupe(imageSources),
            avItems: dedupe(avItems),
            modelItems: dedupe(modelItems),
            cameraItems: dedupe(cameraItems),
            ranges,
            rangesFlat,
            items,
            collectionLinks: dedupe(collectionLinks),
            fulltext: '',
            annotationsByCanvasId,
            annotationPageRefs,
            fulltextPageRefs,
            fulltextSourcesByCanvasId,
            behavior,
            sequenceOptions,
            originalCanvases: canvases.slice(),
            originalCanvasIndexById: { ...canvasIndexById },
            manifestLanguages,
            startCanvasIndex,
            startCanvasId: startId || null,
            startTime: Number.isFinite(startTime) ? startTime : null
        }
    };
}
