import OpenSeadragon from 'openseadragon';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import iconMenu from '@tabler/icons/outline/menu-2.svg?raw';
import iconX from '@tabler/icons/outline/x.svg?raw';
import iconHome from '@tabler/icons/outline/home.svg?raw';
import iconZoomIn from '@tabler/icons/outline/zoom-in.svg?raw';
import iconPlay from '@tabler/icons/outline/player-play.svg?raw';
import iconPause from '@tabler/icons/outline/player-pause.svg?raw';
import iconRewindBack30 from '@tabler/icons/outline/rewind-backward-30.svg?raw';
import iconRewindForward30 from '@tabler/icons/outline/rewind-forward-30.svg?raw';
import iconChevronLeft from '@tabler/icons/outline/chevron-left.svg?raw';
import iconChevronRight from '@tabler/icons/outline/chevron-right.svg?raw';
import iconBook from '@tabler/icons/outline/book.svg?raw';
import iconBookFilled from '@tabler/icons/filled/book.svg?raw';
import iconSun from '@tabler/icons/outline/sun.svg?raw';
import iconMoon from '@tabler/icons/outline/moon.svg?raw';
import iconMaximize from '@tabler/icons/outline/arrows-maximize.svg?raw';
import iconMinimize from '@tabler/icons/outline/arrows-minimize.svg?raw';
import iconDiag from '@tabler/icons/outline/arrows-diagonal.svg?raw';
import iconDiagMin from '@tabler/icons/outline/arrows-diagonal-minimize-2.svg?raw';
import iconVolume from '@tabler/icons/outline/volume-2.svg?raw';
import iconMute from '@tabler/icons/outline/volume-3.svg?raw';
import iconMuteOff from '@tabler/icons/outline/volume-off.svg?raw';
import iconPhoto from '@tabler/icons/outline/photo.svg?raw';
import iconVideo from '@tabler/icons/outline/video.svg?raw';
import iconLayout from '@tabler/icons/outline/layout-grid.svg?raw';
import iconArrowAutofitContent from '@tabler/icons/outline/arrow-autofit-content.svg?raw';
import iconArrowAutofitContentFilled from '@tabler/icons/filled/arrow-autofit-content.svg?raw';
import iconCube from '@tabler/icons/outline/cube.svg?raw';
import iconLanguage from '@tabler/icons/outline/language.svg?raw';
import iconInfo from '@tabler/icons/outline/info-circle.svg?raw';
import iconDownload from '@tabler/icons/outline/download.svg?raw';
import iconFilter from '@tabler/icons/outline/adjustments-horizontal.svg?raw';
import iconRotate from '@tabler/icons/outline/rotate.svg?raw';
import iconRotateCw from '@tabler/icons/outline/rotate-clockwise.svg?raw';
import iconSkewX from '@tabler/icons/outline/skew-x.svg?raw';
import iconSkewY from '@tabler/icons/outline/skew-y.svg?raw';
import iconFlipH from '@tabler/icons/outline/flip-horizontal.svg?raw';
import iconFlipV from '@tabler/icons/outline/flip-vertical.svg?raw';
import iconBrightness from '@tabler/icons/outline/brightness.svg?raw';
import iconContrast from '@tabler/icons/outline/contrast.svg?raw';
import iconColorFilter from '@tabler/icons/outline/color-filter.svg?raw';
import iconPaletteOff from '@tabler/icons/outline/palette-off.svg?raw';
import iconBulb from '@tabler/icons/outline/bulb.svg?raw';
import iconList from '@tabler/icons/outline/list.svg?raw';
import iconTree from '@tabler/icons/outline/list-tree.svg?raw';
import iconStack from '@tabler/icons/outline/stack.svg?raw';
import iconBookmark from '@tabler/icons/outline/bookmark.svg?raw';
import iconBookmarkFilled from '@tabler/icons/filled/bookmark.svg?raw';
import iconFileText from '@tabler/icons/outline/file-text.svg?raw';
import iconHighlight from '@tabler/icons/outline/highlight.svg?raw';
import ccIcon from './assets/cc/cc.svg';
import byIcon from './assets/cc/by.svg';
import ncIcon from './assets/cc/nc.svg';
import ndIcon from './assets/cc/nd.svg';
import saIcon from './assets/cc/sa.svg';
import zeroIcon from './assets/cc/zero.svg';
import pdIcon from './assets/cc/pd.svg';
import logoLight from './assets/mimir_logo_lightmode.png';
import logoDark from './assets/mimir_logo_darkmode.png';

const withIconClass = (svg) => {
    if (!svg) return '';
    return svg.replace('<svg', '<svg class="mimir-icon"');
};

const ICONS = {
    menu: withIconClass(iconMenu),
    close: withIconClass(iconX),
    home: withIconClass(iconHome),
    zoomIn: withIconClass(iconZoomIn),
    play: withIconClass(iconPlay),
    pause: withIconClass(iconPause),
    rewindBack30: withIconClass(iconRewindBack30),
    rewindForward30: withIconClass(iconRewindForward30),
    chevronLeft: withIconClass(iconChevronLeft),
    chevronRight: withIconClass(iconChevronRight),
    book: withIconClass(iconBook),
    bookFilled: withIconClass(iconBookFilled),
    sun: withIconClass(iconSun),
    moon: withIconClass(iconMoon),
    maximize: withIconClass(iconMaximize),
    minimize: withIconClass(iconMinimize),
    diag: withIconClass(iconDiag),
    diagMin: withIconClass(iconDiagMin),
    volume: withIconClass(iconVolume),
    mute: withIconClass(iconMute),
    muteOff: withIconClass(iconMuteOff),
    image: withIconClass(iconPhoto),
    av: withIconClass(iconVideo),
    collection: withIconClass(iconLayout),
    arrowAutofit: withIconClass(iconArrowAutofitContent),
    arrowAutofitFilled: withIconClass(iconArrowAutofitContentFilled),
    model: withIconClass(iconCube),
    language: withIconClass(iconLanguage),
    info: withIconClass(iconInfo),
    down: withIconClass(iconDownload),
    filter: withIconClass(iconFilter),
    rotate: withIconClass(iconRotate),
    rotateCw: withIconClass(iconRotateCw),
    skewX: withIconClass(iconSkewX),
    skewY: withIconClass(iconSkewY),
    flipH: withIconClass(iconFlipH),
    flipV: withIconClass(iconFlipV),
    brightness: withIconClass(iconBrightness),
    contrast: withIconClass(iconContrast),
    colorFilter: withIconClass(iconColorFilter),
    paletteOff: withIconClass(iconPaletteOff),
    bulb: withIconClass(iconBulb),
    list: withIconClass(iconList),
    tree: withIconClass(iconTree),
    stack: withIconClass(iconStack),
    bookmark: withIconClass(iconBookmark),
    bookmarkFilled: withIconClass(iconBookmarkFilled),
    fileText: withIconClass(iconFileText),
    highlight: withIconClass(iconHighlight)
};

export class MimirExplorer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Mimir: Container #${containerId} not found.`);
            return;
        }
        
        this.options = {
            primaryColor: '#451F8D',
            darkMode: 'auto', // auto, light, dark, app
            logoUrl: logoLight,
            logoUrlDark: logoDark,
            ...options
        };

        this.zoomValue = 1;
        this.filterOpen = false;
        this.filterState = {
            rotate: 0,
            flipH: false,
            flipV: false,
            brightness: 1,
            contrast: 1,
            greyscale: 0,
            red: 1,
            green: 1,
            blue: 1
        };
        this.supportedViewerLanguages = Array.isArray(options.viewerLanguages) && options.viewerLanguages.length
            ? options.viewerLanguages.map(l => this.normalizeLang(l))
            : ['it', 'fr', 'de', 'en', 'es', 'nl'];
        this.browserLanguage = this.getBrowserLanguage();
        this.viewerLanguageMode = 'auto';
        this.viewerLanguage = this.resolveViewerLanguage();
        this.manifestLanguage = 'auto';
        this.activeManifestLanguage = null;

        this.currentManifest = null;
        this.currentParsed = null;
        this.osdExplorer = null;
        this.avPlayer = null;
        this.isDark = false;
        this.isBookMode = false;
        this.isContinuousMode = false;
        this.tileSources = [];
        this.avItems = [];
        this.modelItems = [];
        this.currentAvIndex = 0;
        this.currentModelIndex = 0;
        this.threeState = null;
        this.collectionCache = new Map();
        this.collectionItemsCache = new Map();
        this.annotationsByCanvasId = {};
        this.annotationMode = 'single'; // single | all
        this.selectedAnnotationId = null;
        this.currentAnnotations = [];
        this.annotationStylesheets = new Set();
        this.pendingBookmarkPage = null;
        this.fulltextSourcesByCanvasId = {};
        this.fulltextPageRefs = [];
        this.fulltextByCanvasId = {};
        this.currentFulltextLines = [];
        this.fulltextMode = 'lines'; // lines | flow
        this.bookPages = [];
        this.bookPageIndex = 0;
        this.bookCenterPending = false;
        this.bookCenterNeedsFit = false;
        this.bookGap = 0.005;
        this.layoutModeLocked = false;
        this.overlayUpdatePending = false;
        this.currentCanvasIndex = 0;
        this.zoomUpdatePending = false;
        this.pendingZoomValue = null;
        this.pendingContentState = null;
        this.threeFilterOpen = false;

        // Apply theme color as CSS variable
        this.container.style.setProperty('--mimir-primary', this.options.primaryColor);
        
        // Create UI structure
        this.container.innerHTML = `
            <div id="mimir-root" class="mimir-app w-full h-full relative flex items-stretch overflow-hidden">
                <div class="mimir-bg"></div>

                <!-- INTERNAL SIDEBAR -->
                <aside id="mimir-sidebar" class="mimir-sidebar mimir-hidden">
                    <div class="mimir-sidebar-header">
                        <h2 class="mimir-eyebrow">${this.t('structure')}</h2>
                        <button id="mimir-sidebar-close" class="mimir-icon-btn" title="${this.t('close_sidebar')}">
                            ${ICONS.close}
                        </button>
                    </div>
                    <div class="mimir-tabs">
                        <button class="mimir-tab is-active" data-tab="items" data-tooltip="${this.t('items')}">${ICONS.list}</button>
                        <button class="mimir-tab" data-tab="outline" data-tooltip="${this.t('outline')}">${ICONS.tree}</button>
                        <button class="mimir-tab" data-tab="collection" data-tooltip="${this.t('collection')}">${ICONS.stack}</button>
                        <button class="mimir-tab" data-tab="bookmarks" data-tooltip="${this.t('bookmarks')}">${ICONS.bookmark}</button>
                    </div>
                    <div class="mimir-sidebar-body">
                        <div id="mimir-structure-items" class="mimir-tab-panel" data-panel="items"></div>
                        <div id="mimir-structure-outline" class="mimir-tab-panel mimir-hidden" data-panel="outline"></div>
                        <div id="mimir-structure-collection" class="mimir-tab-panel mimir-hidden" data-panel="collection"></div>
                        <div id="mimir-structure-bookmarks" class="mimir-tab-panel mimir-hidden" data-panel="bookmarks"></div>
                    </div>
                </aside>

                <div class="flex-1 relative flex flex-col min-w-0">
                    <!-- TOP BAR -->
                    <div id="mimir-top-bar" class="mimir-topbar">
                        <div class="mimir-topbar-inner">
                            <div class="mimir-title-card">
                                <div class="mimir-title-row">
                                    <div id="mimir-media-icon" class="mimir-media-icon"></div>
                                    <div class="min-w-0">
                                        <h2 id="mimir-title" class="mimir-title">${this.t('untitled')}</h2>
                                        <a id="mimir-collection-link" class="mimir-subtitle mimir-link mimir-hidden" href="#" target="_self" rel="noopener"> </a>
                                    </div>
                                </div>
                            </div>
                            <div class="mimir-topbar-actions">
                                <span class="mimir-divider"></span>
                                <div class="mimir-lang">
                                    <button id="mimir-lang-toggle" class="mimir-icon-btn" title="${this.t('language')}">
                                        ${ICONS.language}
                                    </button>
                                    <div id="mimir-lang-pop" class="mimir-lang-pop mimir-hidden">
                                        <div class="mimir-lang-section">
                                            <p class="mimir-meta-title">${this.t('viewer_language')}</p>
                                            <select id="mimir-viewer-lang" class="mimir-lang-select"></select>
                                        </div>
                                        <div class="mimir-lang-section">
                                            <p class="mimir-meta-title">${this.t('manifest_language')}</p>
                                            <select id="mimir-manifest-lang" class="mimir-lang-select"></select>
                                        </div>
                                    </div>
                                </div>
                                <button id="mimir-dark-toggle-top" class="mimir-icon-btn" title="${this.t('toggle_dark')}">
                                    <span id="mimir-icon-sun-top" class="mimir-hidden">${ICONS.sun}</span>
                                    <span id="mimir-icon-moon-top">${ICONS.moon}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="mimir-osd" class="absolute inset-0"></div>
                    <div id="mimir-fulltext-layer" class="mimir-fulltext-layer"></div>
                    <div id="mimir-annotations-layer" class="mimir-annotations-layer"></div>
                    <div id="mimir-av" class="absolute inset-0 flex items-center justify-center mimir-hidden text-white"></div>
                    <div id="mimir-3d" class="absolute inset-0 flex items-center justify-center mimir-hidden"></div>
                    
                    <div id="mimir-message" class="mimir-empty mimir-hidden">
                        <div class="mimir-empty-card">
                            <img id="mimir-message-logo" src="${this.options.logoUrl}" class="mimir-empty-logo">
                            <div class="mimir-empty-text">
                                <p id="mimir-message-text" class="mimir-empty-title">${this.t('ready')}</p>
                                <p class="mimir-empty-sub">${this.t('load_manifest')}</p>
                            </div>
                        </div>
                    </div>

                    <div id="mimir-loader" class="mimir-loader mimir-hidden">
                        <div class="mimir-spinner"></div>
                        <p class="mimir-loader-text">${this.t('loading_manifest')}</p>
                    </div>

                    <!-- EDGE PANEL TOGGLES -->
                    <button id="mimir-sidebar-toggle" class="mimir-edge-toggle mimir-edge-left mimir-hidden" title="${this.t('open_structure')}">
                        ${ICONS.menu}
                    </button>
                    <button id="mimir-info-toggle" class="mimir-edge-toggle mimir-edge-right mimir-hidden" title="${this.t('open_info')}">
                        ${ICONS.info}
                    </button>
                    
                    <!-- Watermark -->
                    <div class="mimir-watermark">
                        <img id="mimir-watermark" src="${this.options.logoUrl || ''}" alt="" class="mimir-watermark-logo">
                        <div id="mimir-render-mode" class="mimir-render-mode">CANVAS</div>
                    </div>

                    <!-- Color Filters -->
                    <svg id="mimir-color-filters" width="0" height="0" aria-hidden="true" focusable="false" class="absolute">
                        <filter id="mimir-color-filter">
                            <feColorMatrix id="mimir-color-matrix" type="matrix" values="
                                1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                0 0 0 1 0
                            " />
                        </filter>
                    </svg>

                    <!-- FILTER BAR -->
                    <div id="mimir-filter-bar" class="mimir-filter-bar mimir-hidden">
                        <div class="mimir-filter-top-row">
                            <button id="mimir-rotate-ccw" class="mimir-icon-btn" title="${this.t('rotate_ccw')}">${ICONS.rotate}</button>
                            <button id="mimir-rotate-cw" class="mimir-icon-btn" title="${this.t('rotate_cw')}">${ICONS.rotateCw}</button>
                            <button id="mimir-flip-h" class="mimir-icon-btn" title="${this.t('flip_h')}">${ICONS.flipH}</button>
                            <button id="mimir-flip-v" class="mimir-icon-btn" title="${this.t('flip_v')}">${ICONS.flipV}</button>
                            <button id="mimir-filter-greyscale" class="mimir-icon-btn" title="${this.t('greyscale')}">${ICONS.paletteOff}</button>
                        </div>
                        <div class="mimir-filter-column">
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-brightness" class="mimir-icon-btn" title="${this.t('brightness')}">${ICONS.brightness}</button>
                                <input type="range" id="mimir-filter-brightness-slider" min="0.2" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-contrast" class="mimir-icon-btn" title="${this.t('contrast')}">${ICONS.contrast}</button>
                                <input type="range" id="mimir-filter-contrast-slider" min="0.2" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-greyscale" class="mimir-icon-btn" title="${this.t('greyscale')}">${ICONS.paletteOff}</button>
                                <input type="range" id="mimir-filter-greyscale-slider" min="0" max="1" step="0.01" value="0" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-red" class="mimir-icon-btn mimir-filter-icon-red" title="${this.t('red_channel')}">${ICONS.colorFilter}</button>
                                <input type="range" id="mimir-filter-red-slider" min="0" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-green" class="mimir-icon-btn mimir-filter-icon-green" title="${this.t('green_channel')}">${ICONS.colorFilter}</button>
                                <input type="range" id="mimir-filter-green-slider" min="0" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-blue" class="mimir-icon-btn mimir-filter-icon-blue" title="${this.t('blue_channel')}">${ICONS.colorFilter}</button>
                                <input type="range" id="mimir-filter-blue-slider" min="0" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                        </div>
                    </div>

                    <!-- 3D FILTER BAR -->
                    <div id="mimir-3d-filter-bar" class="mimir-filter-bar mimir-hidden">
                        <div class="mimir-filter-top-row">
                            <button id="mimir-3d-auto-rotate" class="mimir-chip">${this.t('auto_rotate')}</button>
                        </div>
                        <div class="mimir-filter-column">
                            <div class="mimir-filter-group">
                                <button id="mimir-3d-light" class="mimir-icon-btn" title="${this.t('light_intensity')}">${ICONS.bulb}</button>
                                <input type="range" id="mimir-3d-light-slider" min="0" max="2" step="0.01" value="0.85" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-3d-ambient" class="mimir-icon-btn" title="${this.t('ambient_light')}">${ICONS.moon}</button>
                                <input type="range" id="mimir-3d-ambient-slider" min="0" max="2" step="0.01" value="0.35" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-3d-exposure" class="mimir-icon-btn" title="${this.t('exposure')}">${ICONS.brightness}</button>
                                <input type="range" id="mimir-3d-exposure-slider" min="0.5" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-3d-azimuth" class="mimir-icon-btn" title="${this.t('light_azimuth')}">${ICONS.skewX}</button>
                                <input type="range" id="mimir-3d-azimuth-slider" min="0" max="360" step="1" value="45" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-3d-elevation" class="mimir-icon-btn" title="${this.t('light_elevation')}">${ICONS.skewY}</button>
                                <input type="range" id="mimir-3d-elevation-slider" min="-30" max="80" step="1" value="35" class="mimir-filter-slider">
                            </div>
                        </div>
                    </div>

                    <!-- BOTTOM BAR (Unified) -->
                    <div id="mimir-bottom-bar" class="mimir-bottom-bar mimir-toolbar-hidden">
                            <div class="mimir-bottom-group">
                                <button id="mimir-home" class="mimir-icon-btn" title="${this.t('back_to_start')}">
                                    ${ICONS.home}
                                </button>
                                <span class="mimir-divider"></span>
                                <button id="mimir-bookmark-add" class="mimir-icon-btn" title="${this.t('add_bookmark')}">
                                    ${ICONS.bookmark}
                                </button>
                                <span class="mimir-divider"></span>
                                <div class="mimir-zoom">
                                    <button id="mimir-zoom" class="mimir-icon-btn" title="${this.t('zoom')}">
                                        ${ICONS.zoomIn}
                                    </button>
                                <div id="mimir-zoom-pop" class="mimir-zoom-pop mimir-hidden">
                                    <input type="range" id="mimir-zoom-slider" min="0.5" max="4" step="0.01" value="1">
                                </div>
                            </div>
                            <button id="mimir-3d-toggle" class="mimir-icon-btn" title="${this.t('three_d_controls')}">
                                ${ICONS.model}
                            </button>
                            <button id="mimir-filter-toggle" class="mimir-icon-btn" title="${this.t('filters')}">
                                ${ICONS.filter}
                            </button>
                        </div>
                        <div class="mimir-bottom-group mimir-bottom-center">
                            <button id="mimir-play-toggle" class="mimir-icon-btn mimir-hidden" title="${this.t('play_pause')}">
                                <span id="mimir-icon-play">${ICONS.play}</span>
                                <span id="mimir-icon-pause" class="mimir-hidden">${ICONS.pause}</span>
                            </button>
                            <div id="mimir-av-controls" class="flex items-center gap-3 mimir-hidden">
                                <button id="mimir-back-30" class="mimir-icon-btn" title="${this.t('back_30')}">
                                    ${ICONS.rewindBack30}
                                </button>
                                <div class="flex flex-col gap-1 min-w-[12rem]">
                                    <input type="range" id="mimir-av-progress" min="0" value="0" step="0.1" class="mimir-range w-full">
                                    <div class="flex justify-between text-[10px] font-semibold uppercase tracking-wide mimir-text-muted">
                                        <span id="mimir-av-current">0:00</span>
                                        <span id="mimir-av-total">0:00</span>
                                    </div>
                                </div>
                                <button id="mimir-forward-30" class="mimir-icon-btn" title="${this.t('forward_30')}">
                                    ${ICONS.rewindForward30}
                                </button>
                            </div>
                            <div id="mimir-image-controls" class="flex items-center gap-2">
                                <button id="mimir-prev" class="mimir-icon-btn" title="${this.t('prev_page')}">
                                    ${ICONS.chevronLeft}
                                </button>
                                <div class="mimir-page-control">
                                <div class="mimir-page-row">
                                    <input id="mimir-page-input" class="mimir-page-input" type="number" min="1" value="1">
                                    <span id="mimir-page-total" class="mimir-page-total">/ 1</span>
                                </div>
                                </div>
                                <button id="mimir-next" class="mimir-icon-btn" title="${this.t('next_page')}">
                                    ${ICONS.chevronRight}
                                </button>
                            </div>
                        </div>
                        <div class="mimir-bottom-group">
                            <div id="mimir-av-audio" class="flex items-center gap-2 mimir-hidden">
                                <div class="mimir-volume-wrap">
                                    <button id="mimir-volume-toggle" class="mimir-icon-btn" title="${this.t('volume')}">
                                        <span id="mimir-icon-volume">${ICONS.volume}</span>
                                        <span id="mimir-icon-volume-off" class="mimir-hidden">${ICONS.mute}</span>
                                    </button>
                                    <div id="mimir-volume-pop" class="mimir-volume-pop mimir-hidden">
                                        <input type="range" id="mimir-volume-slider" min="0" max="1" step="0.01" value="1">
                                    </div>
                                </div>
                                <button id="mimir-mute-toggle" class="mimir-icon-btn" title="${this.t('mute')}">
                                    <span id="mimir-icon-mute">${ICONS.muteOff}</span>
                                </button>
                                <button id="mimir-av-enlarge" class="mimir-icon-btn mimir-hidden" title="${this.t('enlarge_video')}">
                                    ${ICONS.diag}
                                </button>
                            </div>
                            <button id="mimir-dark-toggle" class="mimir-icon-btn mimir-hidden" title="${this.t('toggle_dark')}">
                                <span id="mimir-icon-sun" class="mimir-hidden">${ICONS.sun}</span>
                                <span id="mimir-icon-moon">${ICONS.moon}</span>
                            </button>
                                <span id="mimir-divider-right-1" class="mimir-divider"></span>
                                <button id="mimir-book-toggle" class="mimir-icon-btn" title="${this.t('toggle_book')}">
                                    ${ICONS.book}
                                </button>
                                <button id="mimir-continuous-toggle" class="mimir-icon-btn" title="${this.t('toggle_continuous')}">
                                    ${ICONS.arrowAutofit}
                                </button>
                                <span id="mimir-divider-right-2" class="mimir-divider"></span>
                                <button id="mimir-download" class="mimir-icon-btn mimir-hidden" title="${this.t('download_image')}">
                                    ${ICONS.down}
                                </button>
                            <button id="mimir-fullscreen" class="mimir-icon-btn mimir-hidden" title="${this.t('toggle_fullscreen')}">
                                ${ICONS.maximize}
                            </button>
                        </div>
                    </div>
                </div>

                <aside id="mimir-info" class="mimir-sidebar mimir-sidebar-right mimir-hidden">
                    <div class="mimir-sidebar-header">
                        <h2 class="mimir-eyebrow">${this.t('info')}</h2>
                        <button id="mimir-info-close" class="mimir-icon-btn" title="${this.t('close_info')}">
                            ${ICONS.close}
                        </button>
                    </div>
                    <div class="mimir-tabs">
                        <button class="mimir-tab is-active" data-tab="metadata" data-tooltip="${this.t('metadata')}">${ICONS.info}</button>
                        <button class="mimir-tab" data-tab="fulltext" data-tooltip="${this.t('fulltext')}">${ICONS.fileText}</button>
                        <button class="mimir-tab" data-tab="annotations" data-tooltip="${this.t('annotations')}">${ICONS.highlight}</button>
                    </div>
                    <div class="mimir-sidebar-body">
                        <div id="mimir-metadata" class="mimir-tab-panel" data-panel="metadata"></div>
                        <div id="mimir-fulltext" class="mimir-tab-panel mimir-hidden" data-panel="fulltext">
                            <div class="mimir-annotations-toolbar">
                                <span></span>
                                <button id="mimir-fulltext-toggle" class="mimir-chip">${this.t('flow')}</button>
                            </div>
                            <div id="mimir-fulltext-body"></div>
                        </div>
                        <div id="mimir-annotations" class="mimir-tab-panel mimir-hidden" data-panel="annotations">
                            <div class="mimir-annotations-toolbar">
                                <span id="mimir-annotations-count" class="mimir-annotations-count"></span>
                                <button id="mimir-annotations-toggle" class="mimir-chip">${this.t('show_all')}</button>
                            </div>
                            <div id="mimir-annotations-list" class="mimir-annotations-list"></div>
                        </div>
                    </div>
                </aside>
            </div>
        `;

        this.els = {
            root: this.container.querySelector('#mimir-root'),
            sidebar: this.container.querySelector('#mimir-sidebar'),
            sidebarClose: this.container.querySelector('#mimir-sidebar-close'),
            info: this.container.querySelector('#mimir-info'),
            infoClose: this.container.querySelector('#mimir-info-close'),
            osd: this.container.querySelector('#mimir-osd'),
            fulltextLayer: this.container.querySelector('#mimir-fulltext-layer'),
            annotationsLayer: this.container.querySelector('#mimir-annotations-layer'),
            av: this.container.querySelector('#mimir-av'),
            threeD: this.container.querySelector('#mimir-3d'),
            message: this.container.querySelector('#mimir-message'),
            messageText: this.container.querySelector('#mimir-message-text'),
            messageLogo: this.container.querySelector('#mimir-message-logo'),
            loader: this.container.querySelector('#mimir-loader'),
            bottomBar: this.container.querySelector('#mimir-bottom-bar'),
            filterBar: this.container.querySelector('#mimir-filter-bar'),
            threeFilterBar: this.container.querySelector('#mimir-3d-filter-bar'),
            colorMatrix: this.container.querySelector('#mimir-color-matrix'),
            topBar: this.container.querySelector('#mimir-top-bar'),
            title: this.container.querySelector('#mimir-title'),
            collectionLink: this.container.querySelector('#mimir-collection-link'),
            mediaIcon: this.container.querySelector('#mimir-media-icon'),
            pageNum: this.container.querySelector('#mimir-page-num'),
            pageInput: this.container.querySelector('#mimir-page-input'),
            pageTotal: this.container.querySelector('#mimir-page-total'),
            metadataContainer: this.container.querySelector('#mimir-metadata'),
            fulltextContainer: this.container.querySelector('#mimir-fulltext'),
            fulltextBody: this.container.querySelector('#mimir-fulltext-body'),
            fulltextToggle: this.container.querySelector('#mimir-fulltext-toggle'),
            annotationsContainer: this.container.querySelector('#mimir-annotations'),
            annotationsToggle: this.container.querySelector('#mimir-annotations-toggle'),
            annotationsCount: this.container.querySelector('#mimir-annotations-count'),
            annotationsList: this.container.querySelector('#mimir-annotations-list'),
            structureItems: this.container.querySelector('#mimir-structure-items'),
            structureOutline: this.container.querySelector('#mimir-structure-outline'),
            structureCollection: this.container.querySelector('#mimir-structure-collection'),
            structureBookmarks: this.container.querySelector('#mimir-structure-bookmarks'),
            watermark: this.container.querySelector('#mimir-watermark'),
            renderMode: this.container.querySelector('#mimir-render-mode'),
            iconSun: this.container.querySelector('#mimir-icon-sun'),
            iconMoon: this.container.querySelector('#mimir-icon-moon'),
            iconSunTop: this.container.querySelector('#mimir-icon-sun-top'),
            iconMoonTop: this.container.querySelector('#mimir-icon-moon-top'),
            iconPlay: this.container.querySelector('#mimir-icon-play'),
            iconPause: this.container.querySelector('#mimir-icon-pause'),
            avControls: this.container.querySelector('#mimir-av-controls'),
            imageControls: this.container.querySelector('#mimir-image-controls'),
            avProgress: this.container.querySelector('#mimir-av-progress'),
            avCurrent: this.container.querySelector('#mimir-av-current'),
            avTotal: this.container.querySelector('#mimir-av-total'),
            avAudio: this.container.querySelector('#mimir-av-audio'),
            zoomPop: this.container.querySelector('#mimir-zoom-pop'),
            zoomSlider: this.container.querySelector('#mimir-zoom-slider'),
            volumePop: this.container.querySelector('#mimir-volume-pop'),
            volumeSlider: this.container.querySelector('#mimir-volume-slider'),
            iconVolume: this.container.querySelector('#mimir-icon-volume'),
            iconVolumeOff: this.container.querySelector('#mimir-icon-volume-off'),
            iconMute: this.container.querySelector('#mimir-icon-mute'),
            threeAutoRotate: this.container.querySelector('#mimir-3d-auto-rotate'),
            threeLightSlider: this.container.querySelector('#mimir-3d-light-slider'),
            threeAmbientSlider: this.container.querySelector('#mimir-3d-ambient-slider'),
            threeExposureSlider: this.container.querySelector('#mimir-3d-exposure-slider'),
            threeAzimuthSlider: this.container.querySelector('#mimir-3d-azimuth-slider'),
            threeElevationSlider: this.container.querySelector('#mimir-3d-elevation-slider'),
            langToggle: this.container.querySelector('#mimir-lang-toggle'),
            langPop: this.container.querySelector('#mimir-lang-pop'),
            viewerLangSelect: this.container.querySelector('#mimir-viewer-lang'),
            manifestLangSelect: this.container.querySelector('#mimir-manifest-lang'),
            dividerRight1: this.container.querySelector('#mimir-divider-right-1'),
            dividerRight2: this.container.querySelector('#mimir-divider-right-2'),
            btns: {
                sidebarToggle: this.container.querySelector('#mimir-sidebar-toggle'),
                infoToggle: this.container.querySelector('#mimir-info-toggle'),
                topFullscreen: this.container.querySelector('#mimir-fullscreen-top'),
                topDarkToggle: this.container.querySelector('#mimir-dark-toggle-top'),
                bookToggle: this.container.querySelector('#mimir-book-toggle'),
                download: this.container.querySelector('#mimir-download'),
                playToggle: this.container.querySelector('#mimir-play-toggle'),
                back30: this.container.querySelector('#mimir-back-30'),
                forward30: this.container.querySelector('#mimir-forward-30'),
                volumeToggle: this.container.querySelector('#mimir-volume-toggle'),
                muteToggle: this.container.querySelector('#mimir-mute-toggle'),
                avEnlarge: this.container.querySelector('#mimir-av-enlarge'),
                filterToggle: this.container.querySelector('#mimir-filter-toggle'),
                rotateCcw: this.container.querySelector('#mimir-rotate-ccw'),
                rotateCw: this.container.querySelector('#mimir-rotate-cw'),
                flipH: this.container.querySelector('#mimir-flip-h'),
                flipV: this.container.querySelector('#mimir-flip-v'),
                filterBrightness: this.container.querySelector('#mimir-filter-brightness'),
                filterContrast: this.container.querySelector('#mimir-filter-contrast'),
                filterGreyscale: this.container.querySelector('#mimir-filter-greyscale'),
                filterRed: this.container.querySelector('#mimir-filter-red'),
                filterGreen: this.container.querySelector('#mimir-filter-green'),
                filterBlue: this.container.querySelector('#mimir-filter-blue'),
                zoom: this.container.querySelector('#mimir-zoom'),
                threeToggle: this.container.querySelector('#mimir-3d-toggle'),
                continuousToggle: this.container.querySelector('#mimir-continuous-toggle'),
                bookmarkAdd: this.container.querySelector('#mimir-bookmark-add'),
                prev: this.container.querySelector('#mimir-prev'),
                next: this.container.querySelector('#mimir-next'),
                home: this.container.querySelector('#mimir-home'),
                darkToggle: this.container.querySelector('#mimir-dark-toggle'),
                fullscreen: this.container.querySelector('#mimir-fullscreen')
            },
            sliders: {
                brightness: this.container.querySelector('#mimir-filter-brightness-slider'),
                contrast: this.container.querySelector('#mimir-filter-contrast-slider'),
                greyscale: this.container.querySelector('#mimir-filter-greyscale-slider'),
                red: this.container.querySelector('#mimir-filter-red-slider'),
                green: this.container.querySelector('#mimir-filter-green-slider'),
                blue: this.container.querySelector('#mimir-filter-blue-slider')
            }
        };

        this.initDarkMode();
        this.injectStyles();
        this.setupToolbarEvents();
        this.updateLanguageMenu();
        this.updateStaticLabels();
        this.bindLayoutRules();
        this.bindTabEvents(this.els.sidebar);
        this.bindTabEvents(this.els.info);
        this.els.sidebar.classList.add('mimir-hidden');
        this.els.info.classList.add('mimir-hidden');
        this.els.btns.sidebarToggle.classList.add('mimir-hidden');
        this.els.btns.infoToggle.classList.add('mimir-hidden');
        this.setLeftOpen(false);
        this.setRightOpen(false);
        this.enforcePanelRules();
        
        // Show initial message
        this.showMessage(this.t('ready'));
        this.updateBottomBarOffset();

        // Auto-load manifest from URL query (?manifest=...)
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const manifestUrl = params.get('manifest');
            if (manifestUrl) {
                this.loadManifest(manifestUrl);
            }
        }
    }

    injectStyles() {
        if (document.getElementById('mimir-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'mimir-styles';
        style.textContent = `
            :root { --mimir-primary: #4F46E5; }
            #mimir-root {
                position: absolute; inset: 0;
                display: flex; items-stretch; overflow: hidden;
                font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
                overflow-x: hidden;
            }
            .mimir-bg {
                position: absolute; inset: 0; z-index: 0;
                background-color: #f3f4f6;
                background-image: radial-gradient(rgba(var(--mimir-primary-rgb), 0.18) 1.2px, transparent 1.2px);
                background-size: 28px 28px;
                transition: background 0.4s ease;
                pointer-events: none;
            }
            .mimir-app { position: relative; z-index: 1; }
            .mimir-text { color: #111111; }
            .mimir-text-muted { color: #6b7280; }
            .mimir-hidden { display: none !important; }
            .mimir-loader.mimir-hidden { display: none !important; }

            .mimir-topbar {
                position: absolute; top: 1.5rem; left: 1.5rem; right: 1.5rem;
                z-index: 30; pointer-events: none; opacity: 0;
                transition: opacity 0.4s ease;
            }
            .mimir-topbar-inner {
                display: grid;
                grid-template-columns: auto auto;
                align-items: center;
                pointer-events: auto;
                gap: 0.75rem;
                padding: 0.5rem 0.75rem;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(17,17,17,0.08);
                border-radius: 1rem;
                backdrop-filter: blur(12px);
                box-shadow: 0 20px 30px rgba(17,17,17,0.12);
                width: fit-content;
                max-width: calc(100vw - 3rem);
            }
            .mimir-topbar-inner,
            .mimir-bottom-bar {
                min-height: 3.5rem;
            }
            .mimir-title-card {
                background: transparent;
                border: none;
                box-shadow: none;
                padding: 0;
            }
            .mimir-topbar-actions { display: flex; align-items: center; gap: 0.5rem; }
            .mimir-lang { position: relative; }
            .mimir-lang-pop {
                position: absolute;
                top: calc(100% + 0.6rem);
                right: 0;
                padding: 0.75rem;
                background: rgba(255,255,255,0.95);
                border: 1px solid rgba(17,17,17,0.12);
                border-radius: 0.9rem;
                box-shadow: 0 20px 40px rgba(17,17,17,0.18);
                display: grid;
                gap: 0.7rem;
                min-width: 14rem;
                z-index: 60;
            }
            .mimir-lang-section { display: grid; gap: 0.35rem; }
            .mimir-lang-select {
                width: 100%;
                padding: 0.45rem 0.6rem;
                border-radius: 0.6rem;
                border: 1px solid rgba(17,17,17,0.12);
                background: rgba(255,255,255,0.9);
                font-size: 0.75rem;
                color: #111111;
            }
            .mimir-title-row { display: flex; gap: 0.75rem; align-items: center; }
            .mimir-title {
                font-weight: 700;
                font-size: clamp(0.7rem, 1.4vw, 0.92rem);
                color: #111111;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
                line-height: 1.1;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                max-height: 2.2em;
            }
            .mimir-subtitle { font-size: 0.75rem; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .mimir-link { color: var(--mimir-primary); text-decoration: none; }
            .mimir-link:hover { text-decoration: underline; }
            #mimir-root a { color: var(--mimir-primary); }
            .mimir-media-icon {
                width: 2rem; height: 2rem; border-radius: 0.75rem;
                display: grid; place-items: center;
                background: rgba(var(--mimir-primary-rgb), 0.14);
                color: var(--mimir-primary);
            }
            .mimir-icon { width: 20px; height: 20px; }

            .mimir-sidebar {
                width: 0;
                border-right: 1px solid rgba(17,17,17,0.08);
                background: rgba(255,255,255,0.92);
                backdrop-filter: blur(12px);
                overflow-y: auto; overflow-x: hidden; transition: width 0.4s ease;
                position: relative; z-index: 40;
                flex: 0 0 auto;
                min-width: 0;
                pointer-events: none;
            }
            .mimir-sidebar.mimir-sidebar-open { pointer-events: auto; }
            .mimir-sidebar-right {
                border-right: none;
                border-left: 1px solid rgba(17,17,17,0.08);
            }
            .mimir-sidebar-header {
                display: flex; align-items: center; justify-content: space-between;
                padding: 1.25rem 1.5rem 0.5rem; min-width: 20rem;
            }
            .mimir-tabs {
                display: flex;
                gap: 0.5rem;
                padding: 0 1.5rem 0.75rem;
                min-width: 20rem;
                border-bottom: 1px solid rgba(17,17,17,0.06);
            }
            .mimir-tabs::after {
                content: '';
                flex: 1 1 auto;
            }
            .mimir-tab {
                width: 2.25rem;
                height: 2.25rem;
                padding: 0;
                border-radius: 0.75rem;
                border: 1px solid transparent;
                color: #6b7280;
                background: transparent;
                cursor: pointer;
                transition: all 0.2s ease;
                display: grid;
                place-items: center;
                position: relative;
            }
            .mimir-tab::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: calc(100% + 8px);
                left: 50%;
                transform: translateX(-50%);
                padding: 0.35rem 0.6rem;
                font-size: 0.65rem;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                font-weight: 700;
                color: #111111;
                background: rgba(255,255,255,0.95);
                border: 1px solid rgba(17,17,17,0.08);
                border-radius: 0.5rem;
                box-shadow: 0 10px 20px rgba(17,17,17,0.12);
                opacity: 0;
                pointer-events: none;
                white-space: nowrap;
                transition: opacity 0.2s ease, transform 0.2s ease;
            }
            .mimir-tab:hover::after {
                opacity: 1;
                transform: translateX(-50%) translateY(-2px);
            }
            .mimir-tab.is-active {
                color: #111111;
                background: rgba(17,17,17,0.06);
                border-color: rgba(17,17,17,0.12);
            }
            .mimir-tab-panel { display: grid; gap: 0.75rem; }
            .mimir-eyebrow {
                font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
                color: #9ca3af; font-weight: 700;
            }
            .mimir-sidebar-body { padding: 1rem 1.5rem 1.5rem; min-width: 20rem; display: grid; gap: 0.75rem; overflow-x: hidden; }
            .mimir-card {
                border-radius: 0.85rem;
                border: 1px solid rgba(17,17,17,0.08);
                background: rgba(255,255,255,0.82);
                padding: 0.9rem 1rem;
                overflow-x: hidden;
            }
            .mimir-card-compact { padding: 0.7rem 0.85rem; }
            .mimir-meta-title {
                font-size: 0.65rem;
                letter-spacing: 0.18em;
                text-transform: uppercase;
                color: #9ca3af;
                font-weight: 700;
                margin-bottom: 0.4rem;
            }
            .mimir-meta-value {
                font-size: 0.8rem;
                color: #111111;
                line-height: 1.5;
            }
            .mimir-info-section {
                display: grid;
                gap: 0.45rem;
                padding: 0.2rem 0.1rem;
            }
            .mimir-info-label {
                font-size: 0.58rem;
                letter-spacing: 0.28em;
                text-transform: uppercase;
                color: #9ca3af;
                font-weight: 700;
                text-align: center;
            }
            .mimir-info-value {
                font-size: 0.78rem;
                color: #111111;
                line-height: 1.4;
                word-break: break-word;
            }
            .mimir-title-summary .mimir-info-section {
                gap: 0.35rem;
                text-align: left;
            }
            .mimir-title-lg {
                font-size: 0.95rem;
                font-weight: 700;
                color: #111111;
                line-height: 1.25;
            }
            .mimir-summary-sm {
                font-size: 0.74rem;
                color: #6b7280;
                line-height: 1.45;
            }
            .mimir-info-row {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .mimir-info-divider {
                height: 1px;
                background: rgba(17,17,17,0.12);
                width: 100%;
            }
            .mimir-info-logo {
                width: 100%;
                max-width: 220px;
                max-height: 72px;
                height: auto;
                border-radius: 0.45rem;
                object-fit: contain;
                border: 1px solid rgba(17,17,17,0.1);
                background: rgba(17,17,17,0.04);
            }
            .mimir-license-badges {
                display: flex;
                align-items: center;
                gap: 0.35rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .mimir-license-icon-img {
                width: 28px;
                height: 28px;
                object-fit: contain;
                display: inline-block;
                border-radius: 999px;
                border: 1px solid rgba(17,17,17,0.18);
                background: #ffffff;
                padding: 2px;
            }
            .mimir-meta-grid {
                display: grid;
                gap: 0.45rem;
            }
            .mimir-meta-item {
                display: grid;
                gap: 0.15rem;
            }
            .mimir-meta-item .mimir-meta-title { margin-bottom: 0; font-size: 0.6rem; }
            .mimir-meta-item .mimir-meta-value { font-size: 0.78rem; }
            .mimir-list { display: grid; gap: 0.5rem; }
            .mimir-list-btn {
                width: 100%;
                text-align: left;
                font-size: 0.8rem;
                padding: 0.55rem 0.75rem;
                border-radius: 0.7rem;
                border: 1px solid rgba(17,17,17,0.08);
                background: rgba(17,17,17,0.03);
                color: #111111;
                transition: all 0.2s ease;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .mimir-list-row {
                display: grid;
                grid-template-columns: 2.8rem 1fr;
                align-items: start;
                gap: 0.75rem;
            }
            .mimir-thumb {
                width: 2.8rem;
                height: 3.8rem;
                border-radius: 0.5rem;
                object-fit: cover;
                background: rgba(17,17,17,0.06);
                border: 1px solid rgba(17,17,17,0.08);
                background-size: cover;
                background-position: center;
            }
            .mimir-thumb-placeholder {
                display: inline-block;
            }
            .mimir-chip {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.3rem 0.6rem;
                border-radius: 999px;
                border: 1px solid rgba(17,17,17,0.12);
                background: rgba(17,17,17,0.05);
                font-size: 0.72rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #111111;
            }
            .mimir-chip.is-active {
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
                background: rgba(var(--mimir-primary-rgb), 0.12);
                color: var(--mimir-primary);
            }
            .mimir-annotations-toolbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .mimir-annotations-count {
                font-size: 0.7rem;
                color: #6b7280;
                font-weight: 600;
            }
            .mimir-bookmarks {
                display: grid;
                gap: 0.5rem;
            }
            .mimir-bookmarks-group {
                display: grid;
                gap: 0.35rem;
            }
            .mimir-bookmarks-title {
                font-size: 0.68rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #6b7280;
                margin-bottom: 0.1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }
            #mimir-root.mimir-dark .mimir-bookmarks-title {
                color: rgba(148,163,184,0.9);
            }
            .mimir-bookmark-item {
                display: grid;
                grid-template-columns: 1fr auto;
                align-items: center;
                gap: 0.4rem;
                padding: 0.35rem 0.5rem;
                border-radius: 0.55rem;
                border: 1px solid rgba(17,17,17,0.08);
                background: rgba(17,17,17,0.03);
                font-size: 0.72rem;
                color: #111111;
            }
            .mimir-bookmark-item:hover {
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
                background: rgba(var(--mimir-primary-rgb), 0.08);
                color: var(--mimir-primary);
            }
            #mimir-root.mimir-dark .mimir-bookmark-item {
                border-color: rgba(255,255,255,0.08);
                background: rgba(255,255,255,0.04);
                color: #f8fafc;
            }
            #mimir-root.mimir-dark .mimir-bookmark-item:hover {
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
                background: rgba(var(--mimir-primary-rgb), 0.18);
                color: #f8fafc;
            }
            .mimir-bookmark-label {
                background: transparent;
                border: none;
                padding: 0;
                margin: 0;
                text-align: left;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .mimir-bookmark-remove {
                padding: 0.15rem 0.3rem;
            }
            .mimir-annotations-list {
                display: grid;
                gap: 0.6rem;
                margin-top: 0.5rem;
            }
            .mimir-anno-item {
                width: 100%;
                text-align: left;
                padding: 0.6rem 0.75rem;
                border-radius: 0.7rem;
                border: 1px solid rgba(17,17,17,0.08);
                background: rgba(17,17,17,0.03);
                color: #111111;
                display: grid;
                gap: 0.25rem;
            }
            .mimir-anno-item.is-active {
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
                background: rgba(var(--mimir-primary-rgb), 0.12);
                color: var(--mimir-primary);
            }
            .mimir-anno-item.is-hover {
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
                background: rgba(var(--mimir-primary-rgb), 0.08);
            }
            .mimir-anno-title {
                font-weight: 700;
                font-size: 0.78rem;
            }
            .mimir-anno-excerpt {
                font-size: 0.75rem;
                color: #6b7280;
            }
            .mimir-annotations-layer {
                position: absolute;
                inset: 0;
                z-index: 20;
                pointer-events: none;
            }
            .mimir-fulltext-layer {
                position: absolute;
                inset: 0;
                z-index: 19;
                pointer-events: none;
            }
            .mimir-anno-box {
                position: absolute;
                border: 2px solid rgba(var(--mimir-primary-rgb), 0.85);
                background: transparent;
                border-radius: 0.4rem;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                pointer-events: auto;
            }
            .mimir-anno-box.is-active {
                background: rgba(var(--mimir-primary-rgb), 0.2);
                border-color: rgba(var(--mimir-primary-rgb), 1);
            }
            .mimir-anno-note {
                position: absolute;
                max-width: 260px;
                padding: 0.6rem 0.75rem;
                border-radius: 0.6rem;
                background: rgba(255,255,255,0.95);
                color: #111111;
                border: 1px solid rgba(17,17,17,0.12);
                box-shadow: 0 10px 30px rgba(17,17,17,0.2);
                font-size: 0.78rem;
                line-height: 1.4;
                pointer-events: none;
            }
            #mimir-root.mimir-dark .mimir-anno-note {
                background: rgba(17,17,17,0.95);
                color: #f8fafc;
                border-color: rgba(255,255,255,0.12);
            }
            .mimir-ocr-list {
                display: grid;
                gap: 0.5rem;
            }
            .mimir-ocr-card {
                padding: 0.75rem;
                border-radius: 0.8rem;
                border: 1px solid rgba(17,17,17,0.08);
                background: rgba(17,17,17,0.03);
                color: #111111;
                font-size: 0.78rem;
                line-height: 1.5;
                white-space: pre-wrap;
                margin-bottom: 0.75rem;
            }
            #mimir-root.mimir-dark .mimir-ocr-card {
                background: rgba(17,17,17,0.6);
                border-color: rgba(255,255,255,0.12);
                color: #f8fafc;
            }
            .mimir-ocr-span {
                padding: 0.1rem 0.15rem;
                border-radius: 0.25rem;
                transition: background 0.15s ease;
            }
            #mimir-root.mimir-dark .mimir-ocr-span {
                color: #f8fafc;
            }
            .mimir-ocr-span.is-active {
                background: rgba(var(--mimir-primary-rgb), 0.2);
            }
            .mimir-ocr-span.is-hover {
                background: rgba(var(--mimir-primary-rgb), 0.12);
            }
            #mimir-root.mimir-dark .mimir-ocr-span.is-active {
                background: rgba(var(--mimir-primary-rgb), 0.4);
            }
            #mimir-root.mimir-dark .mimir-ocr-span.is-hover {
                background: rgba(var(--mimir-primary-rgb), 0.25);
            }
            .mimir-ocr-box {
                position: absolute;
                border: 1.5px solid rgba(var(--mimir-primary-rgb), 0.85);
                background: transparent;
                border-radius: 0.3rem;
                pointer-events: auto;
                opacity: 0;
                transition: opacity 0.15s ease;
            }
            .mimir-ocr-box.is-active {
                background: rgba(var(--mimir-primary-rgb), 0.18);
                border-color: rgba(var(--mimir-primary-rgb), 1);
                opacity: 1;
            }
            .mimir-list-label {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                white-space: normal;
            }
            .mimir-list-btn.is-active {
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
                background: rgba(var(--mimir-primary-rgb), 0.12);
            }
            .mimir-list-btn:hover {
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
                background: rgba(var(--mimir-primary-rgb), 0.08);
                color: var(--mimir-primary);
            }
            .mimir-outline {
                display: grid;
                gap: 0.4rem;
                overflow-x: hidden;
            }
            .mimir-outline-node {
                display: grid;
                gap: 0.35rem;
            }
            .mimir-outline-row {
                display: grid;
                grid-template-columns: 1.5rem 1fr;
                align-items: center;
                gap: 0.35rem;
                padding: 0.3rem 0.4rem;
                border-radius: 0.6rem;
                border: 1px solid rgba(17,17,17,0.08);
                background: rgba(17,17,17,0.03);
            }
            .mimir-outline-label {
                background: transparent;
                border: none;
                color: #111111;
                text-align: left;
                font-size: 0.8rem;
                cursor: pointer;
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            .mimir-outline-toggle,
            .mimir-outline-leaf {
                width: 1.25rem;
                height: 1.25rem;
                display: grid;
                place-items: center;
                font-weight: 700;
                border: none;
                background: transparent;
                color: #111111;
            }
            .mimir-outline-toggle {
                cursor: pointer;
            }
            .mimir-outline-leaf::before {
                content: '';
                width: 0.45rem;
                height: 0.45rem;
                border-radius: 999px;
                background: rgba(17,17,17,0.4);
                box-shadow: 0 0 0 4px rgba(17,17,17,0.06);
                display: block;
            }
            .mimir-outline-children {
                margin-left: 0.8rem;
                padding-left: 0.5rem;
                border-left: 1px solid rgba(17,17,17,0.2);
                display: none;
                gap: 0.4rem;
            }
            .mimir-outline-node.mimir-outline-open > .mimir-outline-children {
                display: grid;
            }
            .mimir-outline-node.mimir-outline-active > .mimir-outline-row {
                background: rgba(var(--mimir-primary-rgb), 0.18);
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
            }
            .mimir-outline-row:hover {
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
                background: rgba(var(--mimir-primary-rgb), 0.08);
            }

            .mimir-bottom-bar {
                position: absolute; left: 1.5rem; bottom: 1.5rem; z-index: 40;
                display: flex; align-items: center; justify-content: flex-start;
                gap: 1rem; flex-wrap: wrap;
                padding: 0.5rem 0.75rem;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(17,17,17,0.08);
                border-radius: 1rem;
                backdrop-filter: blur(12px);
                box-shadow: 0 20px 30px rgba(17,17,17,0.12);
                transition: opacity 0.4s ease;
                width: fit-content;
                max-width: calc(100vw - 3rem);
            }
            .mimir-filter-bar {
                position: absolute; left: 1.5rem;
                bottom: calc(1.5rem + var(--mimir-bottom-height, 3.5rem) + 0.75rem);
                z-index: 40;
                display: flex; flex-direction: column; align-items: stretch; gap: 0.6rem;
                padding: 0.6rem 0.75rem;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(17,17,17,0.08);
                border-radius: 1rem;
                backdrop-filter: blur(12px);
                box-shadow: 0 20px 30px rgba(17,17,17,0.12);
                width: 12.5rem;
                max-height: calc(100vh - 6rem);
                overflow: hidden;
            }
            .mimir-filter-top-row {
                display: flex; align-items: center; gap: 0.35rem; flex-wrap: nowrap;
                padding-bottom: 0.4rem;
                border-bottom: 1px solid rgba(17,17,17,0.08);
            }
            .mimir-filter-column {
                display: grid; gap: 0.55rem;
            }
            .mimir-filter-group {
                display: grid; grid-template-columns: 2.25rem 1fr; align-items: center; gap: 0.5rem;
            }
            .mimir-filter-slider {
                width: 100%; height: 6px;
                -webkit-appearance: none; appearance: none;
                background: transparent; cursor: pointer;
            }
            .mimir-filter-slider::-webkit-slider-runnable-track {
                background: rgba(17,17,17,0.18); height: 6px; border-radius: 999px;
            }
            .mimir-filter-slider::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
                margin-top: -4px;
            }
            .mimir-filter-slider::-moz-range-track {
                background: rgba(17,17,17,0.18); height: 6px; border-radius: 999px;
            }
            .mimir-filter-slider::-moz-range-thumb {
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
            }
            .mimir-filter-icon-red { color: #ef4444; }
            .mimir-filter-icon-green { color: #22c55e; }
            .mimir-filter-icon-blue { color: #3b82f6; }
            .mimir-filter-icon-red .mimir-icon { color: #ef4444; }
            .mimir-filter-icon-green .mimir-icon { color: #22c55e; }
            .mimir-filter-icon-blue .mimir-icon { color: #3b82f6; }
            .mimir-filter-active {
                color: var(--mimir-primary);
                background: rgba(var(--mimir-primary-rgb), 0.12);
                border-color: rgba(var(--mimir-primary-rgb), 0.2);
            }
            .mimir-toolbar-hidden { opacity: 0; pointer-events: none; }
            .mimir-bottom-group { display: flex; align-items: center; gap: 0.5rem; }
            .mimir-bottom-center { }
            .mimir-edge-toggle {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 3rem; height: 3rem;
                border-radius: 0 0.9rem 0.9rem 0;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(17,17,17,0.08);
                backdrop-filter: blur(10px);
                display: grid; place-items: center;
                z-index: 45;
                cursor: pointer;
                color: #111111;
                transition: all 0.2s ease;
            }
            #mimir-root:not(.mimir-ready) .mimir-edge-toggle { display: none !important; }
            .mimir-edge-toggle:hover {
                color: var(--mimir-primary);
                background: rgba(var(--mimir-primary-rgb), 0.12);
                border-color: rgba(var(--mimir-primary-rgb), 0.2);
            }
            .mimir-edge-right {
                right: 0;
                border-radius: 0.9rem 0 0 0.9rem;
            }
            .mimir-edge-left { left: 0; }

            .mimir-icon-btn {
                width: 2.25rem; height: 2.25rem;
                border-radius: 0.75rem;
                border: 1px solid transparent;
                background: transparent; cursor: pointer;
                display: grid; place-items: center;
                color: #111111;
                transition: all 0.2s ease;
            }
            .mimir-icon-btn:hover {
                color: var(--mimir-primary);
                background: rgba(var(--mimir-primary-rgb), 0.12);
                border-color: rgba(var(--mimir-primary-rgb), 0.2);
            }
            .mimir-icon-btn:active { transform: scale(0.96); }
            .mimir-divider { width: 1px; height: 1.2rem; background: rgba(156,163,175,0.4); margin: 0 0.25rem; }
            .mimir-pill {
                font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
                padding: 0.3rem 0.6rem; border-radius: 999px; color: #111111;
                background: rgba(17,17,17,0.06);
                min-width: 4.5rem; text-align: center;
            }
            .mimir-page-control {
                display: grid; gap: 0.15rem; min-width: 5.5rem;
                margin: 0 0.5rem;
            }
            .mimir-page-row {
                display: flex; align-items: center; gap: 0.35rem;
                justify-content: center;
            }
            .mimir-page-input {
                width: auto; min-width: 2ch; max-width: 6ch;
                background: rgba(17,17,17,0.06);
                border: 1px solid rgba(17,17,17,0.12);
                border-radius: 0.6rem;
                padding: 0.2rem 0.4rem;
                font-size: 0.7rem;
                font-weight: 700;
                color: #111111;
                text-align: center;
            }
            .mimir-page-input:focus {
                outline: none;
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
                box-shadow: 0 0 0 2px rgba(var(--mimir-primary-rgb), 0.15);
            }
            .mimir-page-total {
                font-size: 0.7rem; font-weight: 700; color: #6b7280;
                text-align: center;
            }

            .mimir-empty {
                position: absolute; inset: 0; z-index: 10;
                display: grid; place-items: center;
                pointer-events: none;
            }
            .mimir-empty-card {
                display: flex; align-items: center; gap: 1rem;
                padding: 1.25rem 1.5rem;
                border-radius: 1rem;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(17,17,17,0.08);
                box-shadow: 0 20px 30px rgba(17,17,17,0.15);
                backdrop-filter: blur(10px);
            }
            .mimir-empty-logo { width: 56px; height: 56px; border-radius: 12px; object-fit: cover; }
            .mimir-empty-title { font-weight: 700; color: #111111; }
            .mimir-empty-sub { font-size: 0.8rem; color: #6b7280; margin-top: 0.2rem; }

            .mimir-loader {
                position: absolute; inset: 0; z-index: 60;
                background: rgba(17,17,17,0.55);
                display: grid; place-items: center; gap: 0.75rem;
                color: #f8fafc;
            }
            .mimir-spinner {
                width: 28px; height: 28px;
                border-radius: 999px;
                border: 3px solid rgba(248,250,252,0.3);
                border-top-color: #f8fafc;
                animation: spin 0.9s linear infinite;
            }
            .mimir-loader-text { font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; }

            .mimir-watermark {
                position: absolute; bottom: 1.5rem; right: 1.5rem;
                opacity: 0.25; pointer-events: none;
                display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem;
            }
            .mimir-watermark-logo {
                width: 36px;
                height: auto;
            }
            .mimir-render-mode {
                font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
                color: #111111; font-weight: 700;
            }

            @media (max-width: 768px) {
                .mimir-sidebar {
                    position: absolute; top: 0; bottom: 0; left: 0;
                    box-shadow: 0 20px 40px rgba(17,17,17,0.2);
                }
                .mimir-sidebar-right { left: auto; right: 0; }
            }

            /* Scrollbar styling */
            .mimir-sidebar {
                scrollbar-width: thin;
                scrollbar-color: rgba(120,120,120,0.5) transparent;
            }
            .mimir-sidebar::-webkit-scrollbar {
                width: 6px;
            }
            .mimir-sidebar::-webkit-scrollbar-track {
                background: transparent;
            }
            .mimir-sidebar::-webkit-scrollbar-thumb {
                background-color: rgba(120,120,120,0.4);
                border-radius: 999px;
            }
            .mimir-sidebar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(120,120,120,0.7);
            }

            .mimir-three-canvas { width: 100%; height: 100%; display: block; }
            #mimir-osd { transform-origin: center; }
            video, audio { border-radius: 1rem; background: #1a1a1a; box-shadow: 0 25px 50px -12px rgba(17,17,17,0.5); }
            .mimir-av-wrapper { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
            .mimir-av-media { max-width: 80%; max-height: 80%; outline: none; transition: all 0.3s ease; transform-origin: center; }
            .mimir-av-media.mimir-av-full { width: 100%; height: 100%; max-width: 100%; max-height: 100%; border-radius: 0; object-fit: contain; }
            .mimir-zoom { position: relative; }
            .mimir-zoom-pop {
                position: absolute;
                bottom: 120%;
                left: 50%;
                transform: translateX(-50%);
                padding: 0;
                width: 2.6rem;
                height: 9rem;
                border-radius: 0.75rem;
                background: rgba(255,255,255,0.95);
                border: 1px solid rgba(17,17,17,0.12);
                display: flex; align-items: center; justify-content: center;
                backdrop-filter: blur(10px);
                z-index: 10;
                pointer-events: auto;
                overflow: hidden;
            }
            .mimir-zoom-pop input[type="range"] {
                width: 8.1rem; height: 6px;
                transform: rotate(-90deg);
                transform-origin: center;
                -webkit-appearance: none;
                appearance: none;
                background: rgba(17,17,17,0.18);
                border-radius: 999px;
                outline: none;
                cursor: pointer;
                pointer-events: auto;
                position: relative;
                z-index: 1;
            }
            .mimir-zoom-pop input[type="range"]::-webkit-slider-runnable-track {
                background: transparent; width: 6px; border-radius: 999px;
            }
            .mimir-zoom-pop input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
                margin-left: -4px;
            }
            .mimir-zoom-pop input[type="range"]::-moz-range-track {
                background: transparent; width: 6px; border-radius: 999px;
            }
            .mimir-zoom-pop input[type="range"]::-moz-range-thumb {
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
            }
            .mimir-volume { position: relative; }
            .mimir-volume-wrap { position: relative; display: grid; place-items: center; }
            .mimir-volume-pop {
                position: absolute;
                bottom: 120%;
                left: 50%;
                transform: translateX(-50%);
                padding: 0;
                width: 2.6rem;
                height: 9rem;
                border-radius: 0.75rem;
                background: rgba(255,255,255,0.95);
                border: 1px solid rgba(17,17,17,0.12);
                display: flex; align-items: center; justify-content: center;
                backdrop-filter: blur(10px);
                z-index: 10;
                overflow: hidden;
            }
            .mimir-volume-pop input[type="range"] {
                width: 8.1rem; height: 6px;
                transform: rotate(-90deg);
                transform-origin: center;
                -webkit-appearance: none;
                appearance: none;
                background: rgba(17,17,17,0.18);
                border-radius: 999px;
                outline: none;
                cursor: pointer;
                pointer-events: auto;
                position: relative;
                z-index: 1;
            }
            .mimir-volume-pop input[type="range"]::-webkit-slider-runnable-track {
                background: transparent; width: 6px; border-radius: 999px;
            }
            .mimir-volume-pop input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
                margin-left: -4px;
            }
            .mimir-volume-pop input[type="range"]::-moz-range-track {
                background: transparent; width: 6px; border-radius: 999px;
            }
            .mimir-volume-pop input[type="range"]::-moz-range-thumb {
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
            }
            #mimir-root.mimir-dark .mimir-volume-pop {
                background: rgba(17,17,17,0.95);
                border-color: rgba(148,163,184,0.3);
            }
            #mimir-root.mimir-dark .mimir-volume-pop input[type="range"] {
                background: rgba(255,255,255,0.2);
            }
            #mimir-root.mimir-dark .mimir-zoom-pop {
                background: rgba(17,17,17,0.95);
                border-color: rgba(148,163,184,0.3);
            }
            #mimir-root.mimir-dark .mimir-zoom-pop input[type="range"]::-webkit-slider-runnable-track {
                background: transparent;
            }
            #mimir-root.mimir-dark .mimir-zoom-pop input[type="range"]::-moz-range-track {
                background: transparent;
            }
            #mimir-root.mimir-dark .mimir-zoom-pop input[type="range"] {
                background: rgba(255,255,255,0.2);
            }

            .mimir-eq {
                display: flex; align-items: center; gap: 6px;
                height: 48px; margin-top: 1rem;
            }
            .mimir-eq-bar {
                width: 6px; height: 8px;
                border-radius: 999px;
                background: linear-gradient(180deg, rgba(var(--mimir-primary-rgb),0.95), rgba(var(--mimir-primary-rgb),0.4));
                transform-origin: center;
            }
            .mimir-eq-playing .mimir-eq-bar {
                animation: mimir-eq 1.1s ease-in-out infinite;
            }
            .mimir-eq-bar:nth-child(2) { animation-delay: -0.2s; }
            .mimir-eq-bar:nth-child(3) { animation-delay: -0.4s; }
            .mimir-eq-bar:nth-child(4) { animation-delay: -0.6s; }
            .mimir-eq-bar:nth-child(5) { animation-delay: -0.8s; }
            @keyframes mimir-eq {
                0%, 100% { transform: scaleY(0.6); opacity: 0.6; }
                50% { transform: scaleY(1.6); opacity: 1; }
            }
            .mimir-waveform {
                width: min(520px, 80vw);
                height: 80px;
                margin-top: 1rem;
                border-radius: 0.75rem;
                background: rgba(17,17,17,0.08);
                border: 1px solid rgba(17,17,17,0.12);
            }
            #mimir-root.mimir-dark .mimir-waveform {
                background: rgba(148,163,184,0.1);
                border-color: rgba(148,163,184,0.2);
            }

            .mimir-range {
                -webkit-appearance: none; appearance: none;
                background: transparent; cursor: pointer; height: 4px;
            }
            .mimir-range::-webkit-slider-runnable-track {
                background: rgba(var(--mimir-primary-rgb), 0.2); height: 4px; border-radius: 2px;
            }
            .mimir-range::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                background: var(--mimir-primary); height: 12px; width: 12px;
                border-radius: 50%; margin-top: -4px; transition: transform 0.2s;
            }
            .mimir-range:hover::-webkit-slider-thumb { transform: scale(1.2); }

            .mimir-format-tag {
                padding: 0.25rem 0.5rem; border-radius: 0.5rem;
                font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
            }
            .mimir-format-tag-primary { background-color: rgba(var(--mimir-primary-rgb), 0.15); color: var(--mimir-primary); }

            @keyframes spin { to { transform: rotate(360deg); } }

            #mimir-root.mimir-dark .mimir-bg {
                background-color: #111111;
                background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px);
                background-size: 28px 28px;
            }
            #mimir-root.mimir-dark .mimir-title-card,
            #mimir-root.mimir-dark .mimir-topbar-inner,
            #mimir-root.mimir-dark .mimir-bottom-bar,
            #mimir-root.mimir-dark .mimir-filter-bar,
            #mimir-root.mimir-dark .mimir-empty-card,
            #mimir-root.mimir-dark .mimir-sidebar {
                background: rgba(17,17,17,0.9);
                border-color: rgba(255,255,255,0.08);
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-lang-pop {
                background: rgba(17,17,17,0.9);
                border-color: rgba(255,255,255,0.12);
            }
            #mimir-root.mimir-dark .mimir-lang-select {
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,255,255,0.12);
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-edge-toggle {
                background: rgba(17,17,17,0.9);
                border-color: rgba(255,255,255,0.08);
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-render-mode { color: #e5e7eb; }
            #mimir-root.mimir-dark .mimir-sidebar {
                scrollbar-color: rgba(156,163,175,0.5) transparent;
            }
            #mimir-root.mimir-dark .mimir-tabs {
                border-bottom-color: rgba(255,255,255,0.08);
            }
            #mimir-root.mimir-dark .mimir-tab {
                color: #9ca3af;
            }
            #mimir-root.mimir-dark .mimir-tab.is-active {
                color: #e5e7eb;
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,255,255,0.12);
            }
            #mimir-root.mimir-dark .mimir-tab::after {
                color: #e5e7eb;
                background: rgba(17,17,17,0.95);
                border-color: rgba(255,255,255,0.12);
            }
            #mimir-root.mimir-dark .mimir-page-input {
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,255,255,0.12);
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-page-total {
                color: rgba(229,231,235,0.8);
            }
            #mimir-root.mimir-dark .mimir-filter-slider::-webkit-slider-runnable-track {
                background: rgba(255,255,255,0.2);
            }
            #mimir-root.mimir-dark .mimir-filter-slider::-moz-range-track {
                background: rgba(255,255,255,0.2);
            }
            #mimir-root.mimir-dark .mimir-sidebar::-webkit-scrollbar-thumb {
                background-color: rgba(156,163,175,0.45);
            }
            #mimir-root.mimir-dark .mimir-sidebar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(156,163,175,0.7);
            }
            #mimir-root.mimir-dark .mimir-card {
                background: rgba(24,24,24,0.85);
                border-color: rgba(255,255,255,0.08);
            }
            #mimir-root.mimir-dark .mimir-info-value {
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-title-lg {
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-summary-sm {
                color: #9ca3af;
            }
            #mimir-root.mimir-dark .mimir-info-divider {
                background: rgba(255,255,255,0.12);
            }
            #mimir-root.mimir-dark .mimir-info-logo {
                background: rgba(255,255,255,0.06);
                border-color: rgba(255,255,255,0.1);
            }
            #mimir-root.mimir-dark .mimir-license-icon-img {
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,255,255,0.18);
            }
            #mimir-root.mimir-dark .mimir-meta-value,
            #mimir-root.mimir-dark .mimir-list-btn,
            #mimir-root.mimir-dark .mimir-text { color: #e5e7eb; }
            #mimir-root.mimir-dark .mimir-list-btn {
                background: rgba(255,255,255,0.04);
                border-color: rgba(255,255,255,0.08);
            }
            #mimir-root.mimir-dark .mimir-list-btn.is-active {
                background: rgba(var(--mimir-primary-rgb), 0.22);
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
            }
            #mimir-root.mimir-dark .mimir-thumb {
                background: rgba(255,255,255,0.05);
                border-color: rgba(255,255,255,0.08);
            }
            #mimir-root.mimir-dark .mimir-list-btn:hover {
                background: rgba(var(--mimir-primary-rgb), 0.2);
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-outline-row {
                border-color: rgba(255,255,255,0.1);
                background: rgba(255,255,255,0.04);
            }
            #mimir-root.mimir-dark .mimir-outline-label {
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-outline-toggle,
            #mimir-root.mimir-dark .mimir-outline-leaf {
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-outline-leaf::before {
                background: rgba(255,255,255,0.5);
                box-shadow: 0 0 0 4px rgba(255,255,255,0.08);
            }
            #mimir-root.mimir-dark .mimir-outline-children {
                border-left-color: rgba(255,255,255,0.2);
            }
            #mimir-root.mimir-dark .mimir-outline-node.mimir-outline-active > .mimir-outline-row {
                background: rgba(var(--mimir-primary-rgb), 0.2);
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
            }
            #mimir-root.mimir-dark .mimir-outline-row:hover {
                border-color: rgba(var(--mimir-primary-rgb), 0.45);
                background: rgba(var(--mimir-primary-rgb), 0.12);
            }
            #mimir-root.mimir-dark .mimir-title,
            #mimir-root.mimir-dark .mimir-icon-btn,
            #mimir-root.mimir-dark .mimir-empty-title { color: #e5e7eb; }
            #mimir-root.mimir-dark .mimir-subtitle,
            #mimir-root.mimir-dark .mimir-text-muted,
            #mimir-root.mimir-dark .mimir-empty-sub,
            #mimir-root.mimir-dark .mimir-eyebrow { color: #9ca3af; }
            #mimir-root.mimir-dark .mimir-link { color: #c7baff; }
            #mimir-root.mimir-dark .mimir-icon-btn:hover {
                background: rgba(var(--mimir-primary-rgb), 0.2);
                border-color: rgba(var(--mimir-primary-rgb), 0.35);
                color: #e5e7eb;
            }
            #mimir-root.mimir-dark .mimir-divider { background: rgba(156,163,175,0.4); }
            #mimir-root.mimir-dark .mimir-pill { background: rgba(255,255,255,0.08); color: #e5e7eb; }
        `;
        document.head.appendChild(style);
        const hex = this.options.primaryColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16);
        this.container.style.setProperty('--mimir-primary-rgb', `${r}, ${g}, ${b}`);
    }

    initDarkMode() {
        if (this.options.darkMode === 'app') this.syncWithApp();
        else if (this.options.darkMode === 'auto') {
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            this.setDarkMode(mql.matches);
            mql.addEventListener('change', e => this.setDarkMode(e.matches));
        } else this.setDarkMode(this.options.darkMode === 'dark');
    }

    syncWithApp() {
        const checkApp = () => {
            const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
            this.setDarkMode(isDark);
        };
        checkApp();
        const observer = new MutationObserver(checkApp);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    setDarkMode(isDark) {
        this.isDark = isDark;
        this.els.root.classList.toggle('mimir-dark', isDark);
        this.els.iconSun.classList.toggle('mimir-hidden', !isDark);
        this.els.iconMoon.classList.toggle('mimir-hidden', isDark);
        this.els.iconSunTop.classList.toggle('mimir-hidden', !isDark);
        this.els.iconMoonTop.classList.toggle('mimir-hidden', isDark);
        
        const logo = isDark ? (this.options.logoUrlDark || this.options.logoUrl) : this.options.logoUrl;
        if (this.els.watermark) this.els.watermark.src = logo;
        if (this.els.messageLogo) this.els.messageLogo.src = logo;
    }

    setupToolbarEvents() {
        this.els.btns.sidebarToggle.onclick = () => this.toggleLeftPanel();
        this.els.btns.infoToggle.onclick = () => this.toggleRightPanel();
        if (this.els.sidebarClose) {
            this.els.sidebarClose.onclick = () => this.setLeftOpen(false);
        }
        if (this.els.infoClose) {
            this.els.infoClose.onclick = () => this.setRightOpen(false);
        }
        this.els.btns.zoom.onclick = () => {
            this.els.zoomPop.classList.toggle('mimir-hidden');
        };
        this.els.zoomSlider.oninput = () => {
            const value = Number(this.els.zoomSlider.value);
            this.zoomValue = value;
            this.pendingZoomValue = value;
            this.bookCenterNeedsFit = false;
            this.scheduleZoomUpdate();
        };
        this.els.zoomSlider.onchange = () => {
            const value = Number(this.els.zoomSlider.value);
            this.zoomValue = value;
            this.pendingZoomValue = value;
            this.bookCenterNeedsFit = false;
            this.applyZoom();
        };
        this.els.btns.home.onclick = () => {
            this.resetFilters();
            this.resetTransforms();
            this.zoomValue = 1;
            if (this.els.zoomSlider) this.els.zoomSlider.value = 1;
            if (this.osdExplorer) this.osdExplorer.viewport.goHome();
            if (this.avPlayer) this.avPlayer.currentTime = 0;
            if (this.threeState?.camera && this.threeState?.controls) {
                const { camera, controls, baseTarget, baseDir, baseDistance } = this.threeState;
                if (baseTarget && baseDir && Number.isFinite(baseDistance)) {
                    controls.target.copy(baseTarget);
                    const pos = baseTarget.clone().add(baseDir.clone().multiplyScalar(baseDistance));
                    camera.position.copy(pos);
                    camera.lookAt(baseTarget);
                    camera.updateProjectionMatrix();
                }
            }
            if (this.els.threeAutoRotate) this.els.threeAutoRotate.classList.remove('is-active');
            if (this.threeState?.controls) this.threeState.controls.autoRotate = false;
        };
        this.updateNavHandlers = () => {
            if (this.isBookMode) {
                this.els.btns.prev.onclick = () => this.goToBookPage(this.bookPageIndex - 1);
                this.els.btns.next.onclick = () => this.goToBookPage(this.bookPageIndex + 1);
            } else {
                this.els.btns.prev.onclick = () => this.osdExplorer?.goToPage(this.osdExplorer.currentPage() - 1);
                this.els.btns.next.onclick = () => this.osdExplorer?.goToPage(this.osdExplorer.currentPage() + 1);
            }
        };
        this.updateNavHandlers();
        if (this.els.pageInput) {
            const goToInputPage = () => {
                if (!this.osdExplorer) return;
                const total = this.tileSources?.length || 0;
                let target = Number(this.els.pageInput.value || 1);
                if (!Number.isFinite(target)) target = 1;
                target = Math.max(1, Math.min(total || 1, target));
                if (this.isBookMode) {
                    const bookIndex = target <= 1 ? 0 : Math.floor((target - 2) / 2) + 1;
                    this.goToBookPage(bookIndex);
                } else {
                    const pageIndex = target - 1;
                    this.osdExplorer.goToPage(pageIndex);
                }
            };
            this.els.pageInput.addEventListener('change', goToInputPage);
            this.els.pageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') goToInputPage();
            });
        }
        this.els.btns.bookToggle.onclick = () => {
            const current = this.osdExplorer?.currentPage?.() ?? 0;
            if (!this.isBookMode) {
                this.bookPageIndex = current <= 0 ? 0 : Math.floor((current - 1) / 2) + 1;
            } else {
                this.bookPageIndex = 0;
            }
            this.isBookMode = !this.isBookMode;
            if (this.isBookMode) this.isContinuousMode = false;
            this.layoutModeLocked = true;
            this.els.btns.bookToggle.style.color = this.isBookMode ? 'var(--mimir-primary)' : '';
            this.els.btns.bookToggle.innerHTML = this.isBookMode ? ICONS.bookFilled : ICONS.book;
            this.renderImage(this.currentManifest, this.currentParsed);
            this.updateNavHandlers();
        };
        this.els.btns.continuousToggle.onclick = () => {
            this.isContinuousMode = !this.isContinuousMode;
            if (this.isContinuousMode) this.isBookMode = false;
            this.layoutModeLocked = true;
            this.els.btns.continuousToggle.style.color = this.isContinuousMode ? 'var(--mimir-primary)' : '';
            this.els.btns.continuousToggle.innerHTML = this.isContinuousMode ? ICONS.arrowAutofitFilled : ICONS.arrowAutofit;
            this.renderImage(this.currentManifest, this.currentParsed);
            this.updateNavHandlers();
        };

        this.els.btns.playToggle.onclick = () => {
            if (!this.avPlayer) return;
            if (this.avPlayer.paused) this.avPlayer.play(); else this.avPlayer.pause();
        };

        this.els.btns.back30.onclick = () => {
            if (this.avPlayer) this.avPlayer.currentTime = Math.max(0, this.avPlayer.currentTime - 30);
        };
        this.els.btns.forward30.onclick = () => {
            if (this.avPlayer) this.avPlayer.currentTime = Math.min(this.avPlayer.duration, this.avPlayer.currentTime + 30);
        };

        this.els.avProgress.oninput = () => {
            if (this.avPlayer) this.avPlayer.currentTime = this.els.avProgress.value;
        };

        this.els.btns.volumeToggle.onclick = () => {
            this.els.volumePop.classList.toggle('mimir-hidden');
            this.els.volumePop.classList.toggle('hidden');
        };
        this.els.volumeSlider.oninput = () => {
            if (!this.avPlayer) return;
            const v = Number(this.els.volumeSlider.value);
            this.avPlayer.volume = v;
            if (v === 0) {
                this.avPlayer.muted = true;
                this.els.iconVolume.classList.add('mimir-hidden');
                this.els.iconVolumeOff.classList.remove('mimir-hidden');
            } else {
                this.avPlayer.muted = false;
                this.els.iconVolume.classList.remove('mimir-hidden');
                this.els.iconVolumeOff.classList.add('mimir-hidden');
            }
        };
        this.els.btns.muteToggle.onclick = () => {
            if (!this.avPlayer) return;
            this.avPlayer.muted = !this.avPlayer.muted;
            this.els.iconVolume.classList.toggle('mimir-hidden', this.avPlayer.muted);
            this.els.iconVolumeOff.classList.toggle('mimir-hidden', !this.avPlayer.muted);
        };
        this.els.btns.avEnlarge.onclick = () => {
            const media = this.els.av.querySelector('.mimir-av-media');
            if (!media) return;
            const isFull = media.classList.toggle('mimir-av-full');
            this.els.btns.avEnlarge.innerHTML = isFull ? ICONS.diagMin : ICONS.diag;
        };

        this.els.btns.filterToggle.onclick = () => this.setFilterOpen(!this.filterOpen);
        if (this.els.btns.threeToggle) {
            this.els.btns.threeToggle.onclick = () => this.setThreeFilterOpen(!this.threeFilterOpen);
        }
        if (this.els.threeAutoRotate) {
            this.els.threeAutoRotate.onclick = () => {
                const enabled = !this.els.threeAutoRotate.classList.contains('is-active');
                this.els.threeAutoRotate.classList.toggle('is-active', enabled);
                if (this.threeState?.controls) this.threeState.controls.autoRotate = enabled;
            };
        }
        const updateLightDir = () => {
            if (!this.threeState?.lights?.dir) return;
            const az = Number(this.els.threeAzimuthSlider?.value ?? 45) * (Math.PI / 180);
            const el = Number(this.els.threeElevationSlider?.value ?? 35) * (Math.PI / 180);
            const radius = 5;
            const x = radius * Math.cos(el) * Math.cos(az);
            const y = radius * Math.sin(el);
            const z = radius * Math.cos(el) * Math.sin(az);
            this.threeState.lights.dir.position.set(x, y, z);
        };
        if (this.els.threeLightSlider) {
            this.els.threeLightSlider.oninput = () => {
                if (this.threeState?.lights?.dir) {
                    this.threeState.lights.dir.intensity = Number(this.els.threeLightSlider.value);
                }
            };
        }
        if (this.els.threeAmbientSlider) {
            this.els.threeAmbientSlider.oninput = () => {
                if (this.threeState?.lights?.ambient) {
                    this.threeState.lights.ambient.intensity = Number(this.els.threeAmbientSlider.value);
                }
            };
        }
        if (this.els.threeExposureSlider) {
            this.els.threeExposureSlider.oninput = () => {
                if (this.threeState?.renderer) {
                    this.threeState.renderer.toneMappingExposure = Number(this.els.threeExposureSlider.value);
                }
            };
        }
        if (this.els.threeAzimuthSlider) {
            this.els.threeAzimuthSlider.oninput = updateLightDir;
        }
        if (this.els.threeElevationSlider) {
            this.els.threeElevationSlider.oninput = updateLightDir;
        }
        this.els.btns.rotateCcw.onclick = () => { this.filterState.rotate = (this.filterState.rotate - 90 + 360) % 360; this.applyTransforms(); };
        this.els.btns.rotateCw.onclick = () => { this.filterState.rotate = (this.filterState.rotate + 90) % 360; this.applyTransforms(); };
        this.els.btns.flipH.onclick = () => { this.filterState.flipH = !this.filterState.flipH; this.applyTransforms(); };
        this.els.btns.flipV.onclick = () => { this.filterState.flipV = !this.filterState.flipV; this.applyTransforms(); };
        this.els.btns.filterBrightness.onclick = () => { this.filterState.brightness = 1; this.els.sliders.brightness.value = 1; this.applyFilters(); };
        this.els.btns.filterContrast.onclick = () => { this.filterState.contrast = 1; this.els.sliders.contrast.value = 1; this.applyFilters(); };
        this.els.btns.filterGreyscale.onclick = () => {
            const next = this.filterState.greyscale ? 0 : 1;
            this.filterState.greyscale = next;
            if (this.els.sliders.greyscale) this.els.sliders.greyscale.value = next;
            this.els.btns.filterGreyscale.classList.toggle('mimir-filter-active', !!this.filterState.greyscale);
            this.applyFilters();
        };
        this.els.btns.filterRed.onclick = () => { this.filterState.red = 1; this.els.sliders.red.value = 1; this.applyFilters(); };
        this.els.btns.filterGreen.onclick = () => { this.filterState.green = 1; this.els.sliders.green.value = 1; this.applyFilters(); };
        this.els.btns.filterBlue.onclick = () => { this.filterState.blue = 1; this.els.sliders.blue.value = 1; this.applyFilters(); };

        Object.entries(this.els.sliders).forEach(([key, slider]) => {
            if (!slider) return;
            const onChange = () => {
                this.filterState[key] = Number(slider.value);
                if (key === 'greyscale' && this.els.btns.filterGreyscale) {
                    this.els.btns.filterGreyscale.classList.toggle('mimir-filter-active', this.filterState.greyscale > 0);
                }
                this.applyFilters();
            };
            slider.addEventListener('input', onChange);
            slider.addEventListener('change', onChange);
        });

        this.els.btns.darkToggle.onclick = () => {
            if (typeof window.toggleDarkMode === 'function') window.toggleDarkMode();
            else this.setDarkMode(!this.isDark);
        };
        if (this.els.btns.topDarkToggle) this.els.btns.topDarkToggle.onclick = this.els.btns.darkToggle.onclick;
        if (this.els.btns.fullscreen) {
            this.els.btns.fullscreen.onclick = () => {
                if (!document.fullscreenElement) this.container.requestFullscreen();
                else document.exitFullscreen();
            };
        }
        if (this.els.btns.topFullscreen && this.els.btns.fullscreen) {
            this.els.btns.topFullscreen.onclick = this.els.btns.fullscreen.onclick;
        }
        this.els.btns.download.onclick = () => this.downloadCurrentImage();
        if (this.els.btns.bookmarkAdd) {
            this.els.btns.bookmarkAdd.onclick = () => this.addBookmark();
        }
        document.addEventListener('fullscreenchange', () => {
            const isFull = !!document.fullscreenElement;
            if (this.els.btns.fullscreen) this.els.btns.fullscreen.innerHTML = isFull ? ICONS.minimize : ICONS.maximize;
            if (this.els.btns.topFullscreen) this.els.btns.topFullscreen.innerHTML = isFull ? ICONS.minimize : ICONS.maximize;
        });

        if (this.els.langToggle && this.els.langPop) {
            this.els.langToggle.onclick = (e) => {
                e.stopPropagation();
                this.els.langPop.classList.toggle('mimir-hidden');
            };
            document.addEventListener('click', (e) => {
                if (!this.els.langPop || this.els.langPop.classList.contains('mimir-hidden')) return;
                if (this.els.langPop.contains(e.target) || this.els.langToggle.contains(e.target)) return;
                this.els.langPop.classList.add('mimir-hidden');
            });
        }
        if (this.els.viewerLangSelect) {
            this.els.viewerLangSelect.onchange = () => {
                const value = this.els.viewerLangSelect.value;
                if (value === 'auto') {
                    this.clearCookie('mimir_viewer_lang');
                    this.viewerLanguageMode = 'auto';
                    this.viewerLanguage = this.resolveViewerLanguage();
                } else {
                    this.viewerLanguageMode = 'manual';
                    this.viewerLanguage = this.normalizeLang(value);
                    this.setCookie('mimir_viewer_lang', this.viewerLanguage);
                }
                this.updateStaticLabels();
                this.refreshLanguageUI();
            };
        }
        if (this.els.manifestLangSelect) {
            this.els.manifestLangSelect.onchange = () => {
                const value = this.els.manifestLangSelect.value || 'auto';
                this.manifestLanguage = value;
                this.refreshLanguageUI();
            };
        }

        if (this.els.annotationsToggle) {
            this.els.annotationsToggle.onclick = () => {
                this.setAnnotationMode(this.annotationMode === 'all' ? 'single' : 'all');
            };
        }
        if (this.els.fulltextToggle) {
            this.els.fulltextToggle.onclick = () => {
                this.fulltextMode = this.fulltextMode === 'lines' ? 'flow' : 'lines';
                this.els.fulltextToggle.textContent = this.fulltextMode === 'lines' ? this.t('flow') : this.t('lines');
                this.updateFulltextPanel(this.osdExplorer?.currentPage?.() || 0);
            };
        }
    }

    bindLayoutRules() {
        window.addEventListener('resize', () => {
            this.enforcePanelRules();
            this.updateBottomBarOffset();
        });
    }

    updateBottomBarOffset() {
        if (!this.els.bottomBar || !this.els.root) return;
        const height = this.els.bottomBar.offsetHeight || 56;
        this.els.root.style.setProperty('--mimir-bottom-height', `${height}px`);
    }

    setFilterOpen(open) {
        this.filterOpen = open;
        if (this.els.filterBar) this.els.filterBar.classList.toggle('mimir-hidden', !open);
        if (this.els.btns.filterToggle) this.els.btns.filterToggle.classList.toggle('mimir-filter-active', open);
        if (open && this.threeFilterOpen) this.setThreeFilterOpen(false);
        this.updateBottomBarOffset();
    }

    setThreeFilterOpen(open) {
        this.threeFilterOpen = open;
        if (this.els.threeFilterBar) this.els.threeFilterBar.classList.toggle('mimir-hidden', !open);
        if (this.els.btns.threeToggle) this.els.btns.threeToggle.classList.toggle('mimir-filter-active', open);
        if (open && this.filterOpen) this.setFilterOpen(false);
        this.updateBottomBarOffset();
    }

    updateBottomDividers() {
        const isVisible = (el) => !!el && !el.classList.contains('mimir-hidden');
        const leftVisible = isVisible(this.els.avAudio) || isVisible(this.els.btns.darkToggle);
        const midVisible = isVisible(this.els.btns.bookToggle) || isVisible(this.els.btns.continuousToggle);
        const rightVisible = isVisible(this.els.btns.download) || isVisible(this.els.btns.fullscreen);
        if (this.els.dividerRight1) {
            const show = midVisible ? (leftVisible && midVisible) : (leftVisible && rightVisible);
            this.els.dividerRight1.classList.toggle('mimir-hidden', !show);
        }
        if (this.els.dividerRight2) {
            const show = midVisible && rightVisible;
            this.els.dividerRight2.classList.toggle('mimir-hidden', !show);
        }
    }

    applyFilters() {
        const { brightness, contrast, greyscale, red, green, blue } = this.filterState;
        if (this.els.colorMatrix) {
            const values = [
                `${red} 0 0 0 0`,
                `0 ${green} 0 0 0`,
                `0 0 ${blue} 0 0`,
                `0 0 0 1 0`
            ].join(' ');
            this.els.colorMatrix.setAttribute('values', values);
        }
        const filter = `brightness(${brightness}) contrast(${contrast}) grayscale(${greyscale}) url(#mimir-color-filter)`;
        const targets = this.getOsdTargets();
        targets.forEach(el => { el.style.filter = filter; });
        const media = this.els.av?.querySelector('.mimir-av-media');
        if (media) media.style.filter = filter;
    }

    applyTransforms() {
        const { rotate, flipH, flipV } = this.filterState;
        const viewport = this.osdExplorer?.viewport;
        const canRotate = !!viewport?.setRotation;
        const canFlip = !!viewport?.setFlip;
        if (canRotate) viewport.setRotation(rotate);
        if (canFlip) viewport.setFlip(!!flipH);
        const scaleX = (!canFlip && flipH) ? -1 : 1;
        const scaleY = flipV ? -1 : 1;
        const cssRotate = canRotate ? 0 : rotate;
        const targets = this.getOsdTargets();
        targets.forEach(el => { el.style.transform = `rotate(${cssRotate}deg) scale(${scaleX}, ${scaleY})`; });
        const media = this.els.av?.querySelector('.mimir-av-media');
        if (media) {
            const zoom = this.zoomValue || 1;
            media.style.transform = `scale(${zoom}) rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`;
        }
        if (this.els.btns.flipH) this.els.btns.flipH.classList.toggle('mimir-filter-active', !!flipH);
        if (this.els.btns.flipV) this.els.btns.flipV.classList.toggle('mimir-filter-active', !!flipV);
    }

    resolveThumb(value) {
        if (!value) return null;
        if (typeof value === 'string') return this.buildThumbUrl(value);
        if (Array.isArray(value)) return this.resolveThumb(value[0]);
        const id = value.id || value['@id'] || value.url;
        if (id) return this.buildThumbUrl(id);
        const service = value.service || value.services;
        if (service) {
            const svc = Array.isArray(service) ? service[0] : service;
            const svcId = svc?.id || svc?.['@id'];
            if (svcId) return this.buildThumbUrl(svcId);
        }
        return null;
    }

    buildThumbUrl(url) {
        if (!url) return null;
        if (/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url)) return url;
        if (url.includes('/full/') || url.includes('/pct:') || url.includes('/square/') || url.includes('/max/')) return url;
        const base = url.endsWith('/info.json') ? url.slice(0, -10) : url;
        return `${base}/full/!120,120/0/default.jpg`;
    }

    extractManifestThumbnail(manifest) {
        if (!manifest) return null;
        const thumb = this.resolveThumb(manifest.thumbnail);
        if (thumb) return thumb;
        const asArray = (v) => (Array.isArray(v) ? v : (v ? [v] : []));
        const getId = (obj) => (obj && (obj.id || obj['@id'])) || null;
        const canvases = asArray(manifest.items) || [];
        const v2Canvases = asArray(manifest.sequences?.[0]?.canvases) || [];
        const list = canvases.length ? canvases : v2Canvases;
        const canvas = list[0];
        if (!canvas) return null;
        const canvasThumb = this.resolveThumb(canvas.thumbnail);
        if (canvasThumb) return canvasThumb;
        const pages = asArray(canvas.items);
        for (const page of pages) {
            const annos = asArray(page.items);
            for (const anno of annos) {
                const body = anno.body || anno.resource;
                const svc = body?.service || body?.services;
                const svcArr = asArray(svc);
                for (const s of svcArr) {
                    const id = getId(s);
                    if (id) return this.buildThumbUrl(id);
                }
                const bodyId = getId(body);
                if (bodyId) return this.buildThumbUrl(bodyId);
            }
        }
        const images = asArray(canvas.images);
        for (const img of images) {
            const res = img.resource || img.body;
            const svc = res?.service || res?.services;
            const svcArr = asArray(svc);
            for (const s of svcArr) {
                const id = getId(s);
                if (id) return this.buildThumbUrl(id);
            }
            const resId = getId(res);
            if (resId) return this.buildThumbUrl(resId);
        }
        return null;
    }

    getOsdTargets() {
        const targets = [];
        if (this.els.osd) targets.push(this.els.osd);
        if (this.els.osd) {
            const canvas = this.els.osd.querySelector('.openseadragon-canvas');
            if (canvas) targets.push(canvas);
            const innerCanvas = this.els.osd.querySelector('canvas');
            if (innerCanvas) targets.push(innerCanvas);
        }
        return targets;
    }

    resetFilters() {
        this.filterState = {
            rotate: 0,
            flipH: false,
            flipV: false,
            brightness: 1,
            contrast: 1,
            greyscale: 0,
            red: 1,
            green: 1,
            blue: 1
        };
        if (this.els.sliders?.brightness) this.els.sliders.brightness.value = 1;
        if (this.els.sliders?.contrast) this.els.sliders.contrast.value = 1;
        if (this.els.sliders?.greyscale) this.els.sliders.greyscale.value = 0;
        if (this.els.sliders?.red) this.els.sliders.red.value = 1;
        if (this.els.sliders?.green) this.els.sliders.green.value = 1;
        if (this.els.sliders?.blue) this.els.sliders.blue.value = 1;
        if (this.els.btns.filterGreyscale) this.els.btns.filterGreyscale.classList.remove('mimir-filter-active');
        this.applyFilters();
        this.applyTransforms();
    }

    resetTransforms() {
        this.filterState.rotate = 0;
        this.filterState.flipH = false;
        this.filterState.flipV = false;
        this.applyTransforms();
    }

    bindTabEvents(container) {
        if (!container) return;
        const tabs = Array.from(container.querySelectorAll('.mimir-tab'));
        const panels = Array.from(container.querySelectorAll('.mimir-tab-panel'));
        if (!tabs.length) return;
        tabs.forEach(tab => {
            tab.onclick = () => {
                const target = tab.getAttribute('data-tab');
                this.setActiveTab(container, target);
            };
        });
    }

    setActiveTab(container, tabName) {
        if (!container) return;
        const tabs = Array.from(container.querySelectorAll('.mimir-tab'));
        const panels = Array.from(container.querySelectorAll('.mimir-tab-panel'));
        tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('data-tab') === tabName));
        panels.forEach(p => p.classList.toggle('mimir-hidden', p.getAttribute('data-panel') !== tabName));
        if (container === this.els.sidebar && tabName === 'collection') {
            const collection = this.currentParsed?.collectionLinks?.[0];
            if (collection?.id) this.loadCollectionMembers(collection.id);
        }
    }

    getPanelWidth() { return 320; }

    getAvailableStageWidth(leftOpen, rightOpen) {
        const panelW = this.getPanelWidth();
        const total = window.innerWidth || this.container.clientWidth || 0;
        const used = (leftOpen ? panelW : 0) + (rightOpen ? panelW : 0);
        return total - used;
    }

    enforcePanelRules() {
        if (!this.currentManifest) {
            this.setLeftOpen(false);
            this.setRightOpen(false);
            return;
        }
        const leftOpen = this.els.sidebar.classList.contains('mimir-sidebar-open');
        const rightOpen = this.els.info.classList.contains('mimir-sidebar-open');
        const canOpenBoth = this.getAvailableStageWidth(true, true) >= 720;
        if (!leftOpen && !rightOpen && canOpenBoth) {
            this.setLeftOpen(true);
            this.setRightOpen(true);
        }
        if (this.getAvailableStageWidth(leftOpen, rightOpen) < 720) {
            if (leftOpen && rightOpen) this.setRightOpen(false);
        }
    }

    setLeftOpen(open) {
        this.els.sidebar.style.width = open ? '20rem' : '0';
        this.els.sidebar.classList.toggle('mimir-sidebar-open', open);
        this.els.btns.sidebarToggle.classList.toggle('mimir-hidden', open);
    }

    setRightOpen(open) {
        this.els.info.style.width = open ? '20rem' : '0';
        this.els.info.classList.toggle('mimir-sidebar-open', open);
        this.els.btns.infoToggle.classList.toggle('mimir-hidden', open);
    }

    toggleLeftPanel() {
        const isOpen = this.els.sidebar.classList.contains('mimir-sidebar-open');
        if (!isOpen && this.getAvailableStageWidth(true, this.els.info.classList.contains('mimir-sidebar-open')) < 720) {
            this.setRightOpen(false);
        }
        this.setLeftOpen(!isOpen);
    }

    toggleRightPanel() {
        const isOpen = this.els.info.classList.contains('mimir-sidebar-open');
        if (!isOpen && this.getAvailableStageWidth(this.els.sidebar.classList.contains('mimir-sidebar-open'), true) < 720) {
            this.setLeftOpen(false);
        }
        this.setRightOpen(!isOpen);
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    async loadManifest(url) {
        this.showLoader(true); this.resetExplorers();
        try {
            this.currentParsed = null;
            this.layoutModeLocked = false;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const manifest = await response.json();
            const contentState = this.resolveContentState(manifest);
            if (contentState?.manifestUrl && contentState.manifestUrl !== url) {
                this.pendingContentState = contentState.target || null;
                await this.loadManifest(contentState.manifestUrl);
                return;
            }
            this.currentManifest = manifest;
            this.currentAvIndex = 0;
            this.currentModelIndex = 0;
            this.currentParsed = this.parseManifest(manifest);
            if (this.currentParsed?.type === '3d' && (this.currentParsed.modelItems?.length || 0) > 1) {
                this.currentModelIndex = -1;
            }
            this.fulltextSourcesByCanvasId = this.currentParsed.fulltextSourcesByCanvasId || {};
            this.fulltextPageRefs = this.currentParsed.fulltextPageRefs || [];
            this.render(this.currentParsed.type, manifest, this.currentParsed);
            this.fetchAnnotationPages(this.currentParsed.annotationPageRefs || []);
            this.fetchFulltextPages(this.fulltextPageRefs || []);
            this.applyContentStateTarget(this.currentParsed);
        } catch (error) {
            console.error('Mimir: Error loading manifest', error);
            this.showMessage(`Error: ${error.message}`);
        } finally { this.showLoader(false); }
    }

    resolveContentState(data) {
        if (!data || typeof data !== 'object') return null;
        const getId = (obj) => (obj && (obj.id || obj['@id'])) || null;
        const asArray = (val) => (Array.isArray(val) ? val : (val ? [val] : []));
        const type = String(data.type || data['@type'] || '').toLowerCase();
        const motivations = asArray(data.motivation).map(m => String(m || '').toLowerCase());
        const isContentState = type.includes('annotation') && motivations.some(m => m.includes('contentstate'));
        if (!isContentState) return null;
        const target = data.target || data.on;
        if (typeof target === 'string') return { manifestUrl: target, target };
        if (target && typeof target === 'object') {
            const tType = String(target.type || target['@type'] || '').toLowerCase();
            const targetId = getId(target);
            const partOf = asArray(target.partOf || target.within).map(getId).find(Boolean);
            if (tType.includes('manifest') && targetId) return { manifestUrl: targetId, target };
            if (partOf) return { manifestUrl: partOf, target };
            if (targetId && targetId.includes('/manifest')) return { manifestUrl: targetId, target };
        }
        return null;
    }

    applyContentStateTarget(parsed) {
        if (!this.pendingContentState || !parsed) return;
        const target = this.pendingContentState;
        const getId = (obj) => (obj && (obj.id || obj['@id'])) || null;
        let canvasId = null;
        if (typeof target === 'string') {
            if (target.includes('/canvas/')) canvasId = target;
        } else if (target && typeof target === 'object') {
            const tType = String(target.type || target['@type'] || '').toLowerCase();
            const targetId = getId(target);
            if (tType.includes('canvas') && targetId) canvasId = targetId;
            const source = target.source || target.item;
            const sourceId = getId(source);
            if (!canvasId && sourceId) canvasId = sourceId;
            if (!canvasId && typeof targetId === 'string' && targetId.includes('/canvas/')) canvasId = targetId;
        }
        if (canvasId && parsed?.canvasIndexById?.[canvasId] !== undefined) {
            const idx = parsed.canvasIndexById[canvasId];
            if (this.osdExplorer) this.osdExplorer.goToPage(idx);
            else this.pendingBookmarkPage = idx;
        }
        this.pendingContentState = null;
    }

    async fetchAnnotationPages(refs) {
        if (!refs?.length) return;
        const unique = Array.from(new Map(refs.filter(r => r?.id).map(r => [r.id, r])).values());
        await Promise.all(unique.map(async (ref) => {
            try {
                const response = await fetch(ref.id);
                if (!response.ok) return;
                const page = await response.json();
                const items = (page.items || page.annotations || page.resources || []);
                const pageStylesheets = [];
                const pageSheet = page?.stylesheet || page?.styleSheet;
                if (pageSheet) {
                    if (typeof pageSheet === 'string') pageStylesheets.push(pageSheet);
                    else if (Array.isArray(pageSheet)) {
                        pageSheet.forEach(s => pageStylesheets.push(s.id || s['@id'] || s));
                    } else pageStylesheets.push(pageSheet.id || pageSheet['@id']);
                }
                const list = this.parseAnnotationPageItems(items, ref.canvasId, pageStylesheets);
                list.forEach((anno) => {
                    const key = anno.canvasId || ref.canvasId;
                    if (!key) return;
                    if (!this.currentParsed.annotationsByCanvasId[key]) this.currentParsed.annotationsByCanvasId[key] = [];
                    this.currentParsed.annotationsByCanvasId[key].push(anno);
                    if (!this.annotationsByCanvasId[key]) this.annotationsByCanvasId[key] = [];
                    this.annotationsByCanvasId[key].push(anno);
                });
            } catch (err) {
                console.warn('Mimir: Failed to load annotation page', ref.id, err);
            }
        }));
        this.updateAnnotationsPanel(this.osdExplorer?.currentPage?.() || 0);
    }

    async fetchFulltextPages(refs) {
        if (!refs?.length) return;
        const unique = Array.from(new Map(refs.filter(r => r?.id).map(r => [r.id, r])).values());
        await Promise.all(unique.map(async (ref) => {
            try {
                const response = await fetch(ref.id);
                if (!response.ok) return;
                const page = await response.json();
                const items = (page.items || page.annotations || page.resources || []);
                const sources = this.extractAltoSourcesFromItems(items);
                if (!sources.length) return;
                const key = ref.canvasId;
                if (!key) return;
                if (!this.fulltextSourcesByCanvasId[key]) this.fulltextSourcesByCanvasId[key] = [];
                sources.forEach(src => {
                    if (!this.fulltextSourcesByCanvasId[key].includes(src)) {
                        this.fulltextSourcesByCanvasId[key].push(src);
                    }
                });
            } catch (err) {
                console.warn('Mimir: Failed to load fulltext page', ref.id, err);
            }
        }));
        this.updateFulltextPanel(this.osdExplorer?.currentPage?.() || 0);
    }

    extractAltoSourcesFromItems(items) {
        const asArray = (val) => (Array.isArray(val) ? val : (val ? [val] : []));
        const getType = (obj) => (obj && (obj.type || obj['@type'])) || '';
        const sources = [];
        asArray(items).forEach((anno) => {
            const motivation = anno?.motivation || '';
            if (String(motivation).includes('painting')) return;
            const bodies = asArray(anno?.body || anno?.resource);
            bodies.forEach((b) => {
                if (!b) return;
                if (getType(b) === 'SpecificResource' && b.source) {
                    sources.push(...this.extractAltoSourcesFromItems([b.source]));
                    return;
                }
                const id = b.id || b['@id'] || (typeof b === 'string' ? b : '');
                const format = b.format || '';
                if (!id) return;
                if (format.includes('alto') || format.includes('xml') || id.endsWith('.xml')) {
                    sources.push(id);
                }
            });
        });
        return sources.filter(Boolean);
    }

    parseAnnotationPageItems(items, canvasId, pageStylesheets = []) {
        const asArray = (val) => (Array.isArray(val) ? val : (val ? [val] : []));
        const getId = (obj) => (obj && (obj.id || obj['@id'])) || null;
        const getType = (obj) => (obj && (obj.type || obj['@type'])) || '';
        const getLabel = (label) => this.resolveLangValue(label, '');
        const escapeHtml = (text) => String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
        const extractXYWH = (val) => {
            if (!val || typeof val !== 'string') return null;
            const match = val.match(/xywh=([^&]+)/);
            if (!match) return null;
            const raw = match[1].replace(/^pixel:/, '').replace(/^pct:/, '').trim();
            const nums = raw.split(',').map(Number);
            if (nums.length !== 4 || nums.some(n => !Number.isFinite(n))) return null;
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
            selectors.forEach(sel => {
                if (xywh) return;
                const value = sel?.value || sel?.['@value'] || '';
                xywh = extractXYWH(value);
                if (!xywh && String(sel?.type || sel?.['@type']).includes('Svg')) {
                    xywh = extractSvgXYWH(value);
                }
            });
            return { canvasId: source || fallbackCanvasId, xywh };
        };
        const extractTextBodies = (body) => {
            const bodies = asArray(body);
            const results = [];
            bodies.forEach(b => {
                if (!b) return;
                const type = getType(b);
                const format = b.format || '';
                if (type === 'SpecificResource' && b.source) {
                    results.push(...extractTextBodies(b.source));
                    return;
                }
                const value = b.value || b.chars || b.text || b['@value'] || (typeof b === 'string' ? b : '');
                if (!value) return;
                const isText = type === 'TextualBody' || format.startsWith('text/');
                if (!isText && typeof b !== 'string') return;
                const isHtml = format.includes('html');
                const html = isHtml ? value : `<p>${escapeHtml(value).replace(/\\n/g, '<br>')}</p>`;
                const label = getLabel(b.label);
                results.push({ html, label });
            });
            return results;
        };
        const annotations = [];
        asArray(items).forEach((anno) => {
            if (!anno) return;
            const motivation = anno.motivation || '';
            const textBodies = extractTextBodies(anno.body || anno.resource);
            if (!textBodies.length) return;
            if (String(motivation).includes('painting')) return;
            const targetInfo = parseTarget(anno.target || anno.on, canvasId);
            const html = textBodies.map(b => b.html).join('');
            const label = getLabel(anno.label) || textBodies[0]?.label || '';
            const id = getId(anno) || `${canvasId || 'canvas'}-anno-${annotations.length + 1}`;
            const stylesheets = [...pageStylesheets];
            const stylesheet = anno.stylesheet || anno.styleSheet;
            if (stylesheet) {
                if (typeof stylesheet === 'string') stylesheets.push(stylesheet);
                else if (Array.isArray(stylesheet)) {
                    stylesheet.forEach(s => stylesheets.push(s.id || s['@id'] || s));
                } else stylesheets.push(stylesheet.id || stylesheet['@id']);
            }
            const styleClass = anno.styleClass || anno.class || anno.body?.styleClass || anno.target?.styleClass || '';
            annotations.push({
                id,
                label,
                html,
                canvasId: targetInfo.canvasId || canvasId,
                xywh: targetInfo.xywh,
                styleClass,
                stylesheets: stylesheets.filter(Boolean)
            });
        });
        return annotations;
    }

    extractPointSelector(target) {
        if (!target) return null;
        const collect = (sel, bucket) => {
            if (!sel) return;
            if (Array.isArray(sel)) sel.forEach(s => collect(s, bucket));
            else if (sel.selector) collect(sel.selector, bucket);
            else bucket.push(sel);
        };
        const selectors = [];
        collect(target.selector || target, selectors);
        const point = selectors.find(s => String(s.type || s['@type']).toLowerCase().includes('pointselector'));
        if (!point) return null;
        const x = Number(point.x), y = Number(point.y), z = Number(point.z);
        if (![x, y, z].every(n => Number.isFinite(n))) return null;
        return { x, y, z };
    }

    detectType(manifest, parsed) {
        const mType = (manifest.type || manifest['@type'] || '').toLowerCase();
        if (mType.includes('collection')) return 'collection';
        if (parsed?.modelItems?.length) return '3d';
        if (parsed?.avItems?.length) return 'av';
        if (parsed?.imageSources?.length) return 'image';
        return (manifest.items || manifest.sequences) ? 'image' : 'unknown';
    }

    render(type, manifest, parsed) {
        this.hideMessage();
        this.els.root.classList.add('mimir-ready');
        this.updateTopBar(type, manifest, parsed);
        this.updateStructure(parsed);
        this.updateMetadata(manifest, parsed);
        this.updateLanguageMenu();
        this.updateStaticLabels();
        this.updateBottomDividers();
        this.els.btns.sidebarToggle.classList.remove('mimir-hidden');
        this.els.btns.infoToggle.classList.remove('mimir-hidden');
        this.els.sidebar.classList.remove('mimir-hidden');
        this.els.info.classList.remove('mimir-hidden');
        this.updateBottomBarOffset();
        this.setFilterOpen(this.filterOpen);
        this.enforcePanelRules();
        const activeCollectionTab = this.els.sidebar?.querySelector('.mimir-tab.is-active')?.getAttribute('data-tab') === 'collection';
        if (activeCollectionTab) {
            const collection = this.currentParsed?.collectionLinks?.[0];
            if (collection?.id) this.loadCollectionMembers(collection.id);
        }
        
        this.els.btns.playToggle.classList.toggle('mimir-hidden', type !== 'av');
        this.els.avControls.classList.toggle('mimir-hidden', type !== 'av');
        this.els.avAudio.classList.toggle('mimir-hidden', type !== 'av');
        this.els.imageControls.classList.toggle('mimir-hidden', type !== 'image');
        
        this.els.btns.zoom.classList.toggle('mimir-hidden', type !== 'image' && type !== 'av' && type !== '3d');
        this.els.btns.filterToggle.classList.toggle('mimir-hidden', type !== 'image' && type !== 'av');
        if (type !== 'image' && type !== 'av') this.setFilterOpen(false);
        if (this.els.btns.threeToggle) this.els.btns.threeToggle.classList.toggle('mimir-hidden', type !== '3d');
        if (type !== '3d') this.setThreeFilterOpen(false);
        if (type === 'image' && !this.layoutModeLocked) {
            if (parsed?.behavior?.includes('continuous')) {
                this.isContinuousMode = true;
                this.isBookMode = false;
            } else if (parsed?.behavior?.includes('paged')) {
                this.isBookMode = true;
                this.isContinuousMode = false;
                this.bookPageIndex = 0;
            } else {
                this.isBookMode = false;
                this.isContinuousMode = false;
            }
        }
        if (this.updateNavHandlers) this.updateNavHandlers();
        if (this.els.btns.bookToggle) this.els.btns.bookToggle.classList.toggle('mimir-hidden', type !== 'image' || this.isContinuousMode);
        if (this.els.btns.continuousToggle) this.els.btns.continuousToggle.classList.toggle('mimir-hidden', type !== 'image');
        if (this.els.btns.download) this.els.btns.download.classList.toggle('mimir-hidden', type !== 'image');
        if (this.els.btns.topDarkToggle) this.els.btns.topDarkToggle.classList.remove('mimir-hidden');
        if (this.els.btns.topFullscreen) this.els.btns.topFullscreen.classList.remove('mimir-hidden');
        if (this.els.btns.darkToggle) this.els.btns.darkToggle.classList.add('mimir-hidden');
        if (this.els.btns.fullscreen) this.els.btns.fullscreen.classList.remove('mimir-hidden');
        if (this.els.threeFilterBar) this.els.threeFilterBar.classList.add('mimir-hidden');
        this.threeFilterOpen = false;

        switch (type) {
            case 'collection': this.renderCollection(manifest, parsed); break;
            case 'image': this.renderImage(manifest, parsed); break;
            case 'av': this.renderAV(manifest, parsed); break;
            case '3d': this.render3D(manifest, parsed); break;
            default: this.showMessage(this.t('unsupported'));
        }
    }

    renderImage(manifest, parsed) {
        this.els.osd.classList.remove('mimir-hidden'); this.showToolbar(true);
        if (this.els.fulltextLayer) this.els.fulltextLayer.classList.remove('mimir-hidden');
        if (this.els.annotationsLayer) this.els.annotationsLayer.classList.remove('mimir-hidden');
        this.tileSources = parsed?.imageSources?.length ? parsed.imageSources : [];
        if (this.els.btns.continuousToggle) {
            const allowContinuous = !!(parsed?.behavior?.includes('continuous')) && this.tileSources.length > 1;
            this.els.btns.continuousToggle.classList.toggle('mimir-hidden', !allowContinuous);
            this.els.btns.continuousToggle.style.color = this.isContinuousMode ? 'var(--mimir-primary)' : '';
            this.els.btns.continuousToggle.innerHTML = this.isContinuousMode ? ICONS.arrowAutofitFilled : ICONS.arrowAutofit;
        }
        if (this.els.btns.bookToggle) {
            this.els.btns.bookToggle.classList.toggle('mimir-hidden', this.tileSources.length <= 2);
            this.els.btns.bookToggle.style.color = this.isBookMode ? 'var(--mimir-primary)' : '';
            this.els.btns.bookToggle.innerHTML = this.isBookMode ? ICONS.bookFilled : ICONS.book;
        }
        this.updateBottomDividers();
        if (this.osdExplorer) this.osdExplorer.destroy();
        if (this.tileSources.length === 0) { this.showMessage(this.t('no_image_services')); this.showToolbar(true); return; }
        const normalizeTileSource = (src) => {
            if (!src) return src;
            if (typeof src === 'string') return src;
            if (src.url) return src.url;
            return src;
        };
        let finalSources = this.tileSources;
        if (this.isContinuousMode) {
            const gap = 0;
            finalSources = this.tileSources.map((src, idx) => ({
                tileSource: normalizeTileSource(src),
                x: idx * (1 + gap),
                y: 0,
                width: 1
            }));
        } else if (this.isBookMode) {
            this.bookPages = [];
            if (this.tileSources.length > 0) {
                this.bookPages.push([this.tileSources[0]]);
                for (let i = 1; i < this.tileSources.length; i += 2) {
                    const spread = [this.tileSources[i]];
                    if (this.tileSources[i + 1]) spread.push(this.tileSources[i + 1]);
                    this.bookPages.push(spread);
                }
            }
            const initial = this.bookPages[this.bookPageIndex] || this.bookPages[0] || [];
            const gap = this.bookGap;
            const startX = 0;
            finalSources = initial.map((src, idx) => ({
                tileSource: normalizeTileSource(src),
                x: startX + idx * (1 + gap),
                y: 0,
                width: 1
            }));
        }
        const supportsWebGL = (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
            } catch {
                return false;
            }
        })();
        this.osdExplorer = OpenSeadragon({
            element: this.els.osd, tileSources: finalSources, sequenceMode: !this.isBookMode && !this.isContinuousMode,
            showNavigationControl: false, showSequenceControl: false, prefixUrl: "",
            blendTime: 0.1, animationTime: 0.5, preserveViewport: !this.isBookMode && !this.isContinuousMode,
            visibilityRatio: 1, minZoomLevel: 0, defaultZoomLevel: 0, homeFillsExplorer: true,
            drawer: supportsWebGL ? ['webgl', 'canvas'] : ['canvas']
        });
        this.osdExplorer.addHandler('open', () => {
            if (Number.isFinite(this.pendingBookmarkPage)) {
                this.osdExplorer.goToPage(this.pendingBookmarkPage);
                this.pendingBookmarkPage = null;
            }
            this.scheduleOverlayUpdate();
            if (this.isBookMode) {
                this.goToBookPage(this.bookPageIndex, true);
                this.bookCenterNeedsFit = true;
                this.centerBookSpread(true);
            } else if (this.isContinuousMode) {
                this.centerContinuous();
            }
        });
        this.osdExplorer.addHandler('tile-loaded', () => {
            if (this.isContinuousMode) this.centerContinuous();
        });
        this.osdExplorer.addHandler('tile-loaded', () => {
            if (this.isBookMode) this.centerBookSpread();
        });
        this.osdExplorer.addHandler('animation', () => { this.scheduleOverlayUpdate(); });
        this.osdExplorer.addHandler('resize', () => { this.scheduleOverlayUpdate(); });
        if (!this.isBookMode) {
            this.osdExplorer.addHandler('page', (e) => this.updatePageNum(e.page));
        }
        if (this.els.renderMode) this.els.renderMode.textContent = supportsWebGL ? 'WEBGL' : 'CANVAS';
        if (this.els.zoomSlider) this.els.zoomSlider.value = 1;
        this.zoomValue = 1;
        this.applyFilters();
        this.applyTransforms();
        const initialIndex = this.isBookMode ? this.bookPageIndex : 0;
        this.updatePageNum(initialIndex);
        this.highlightActiveCanvas(initialIndex, true);
    }

    downloadCurrentImage() {
        if (!this.tileSources?.length) return;
        const pageIndex = this.isBookMode ? (this.bookPageIndex <= 0 ? 0 : this.bookPageIndex * 2 - 1) : Math.max(0, this.osdExplorer?.currentPage?.() || 0);
        const infoUrl = this.tileSources[Math.max(0, pageIndex)] || this.tileSources[0];
        if (!infoUrl) return;
        const base = infoUrl.endsWith('/info.json') ? infoUrl.slice(0, -10) : infoUrl;
        const url = `${base}/full/full/0/default.jpg`;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.jpg';
        link.target = '_blank';
        link.rel = 'noopener';
        link.click();
    }

    updatePageNum(osdPageIndex) {
        const totalImages = this.tileSources.length;
        let displayString = "";
        if (!this.isBookMode) displayString = `${osdPageIndex + 1} / ${totalImages}`;
        else {
            if (osdPageIndex === 0) displayString = `1 / ${totalImages}`;
            else {
                const start = (osdPageIndex * 2);
                const end = Math.min(start + 1, totalImages);
                displayString = (start === end) ? `${start} / ${totalImages}` : `${start}-${end} / ${totalImages}`;
            }
        }
        let currentPage = osdPageIndex + 1;
        if (this.isBookMode) {
            currentPage = osdPageIndex === 0 ? 1 : osdPageIndex * 2;
        }
        if (this.els.pageInput) this.els.pageInput.value = String(currentPage);
        if (this.els.pageTotal) this.els.pageTotal.innerText = `/ ${totalImages}`;
        if (this.isBookMode) {
            this.currentCanvasIndex = this.bookPageIndex === 0 ? 0 : (this.bookPageIndex * 2 - 1);
        } else {
            this.currentCanvasIndex = osdPageIndex;
        }
        this.highlightActiveCanvas(osdPageIndex, true);
        this.highlightActiveOutline(osdPageIndex);
        this.updateAnnotationsPanel(osdPageIndex);
        this.updateFulltextPanel(osdPageIndex);
        this.updateBookmarkButton();
    }

    goToBookPage(index, skipHome = false) {
        if (!this.isBookMode || !this.osdExplorer) return;
        const max = Math.max(0, this.bookPages.length - 1);
        this.bookPageIndex = Math.max(0, Math.min(max, index));
        this.bookCenterNeedsFit = true;
        const spread = this.bookPages[this.bookPageIndex] || [];
        const world = this.osdExplorer.world;
        while (world.getItemCount() > 0) {
            world.removeItem(world.getItemAt(0));
        }
        const gap = this.bookGap;
        const startX = 0;
        spread.forEach((src, idx) => {
            const tileSource = (typeof src === 'string') ? src : (src?.url || src);
            if (!tileSource) return;
            this.osdExplorer.addTiledImage({
                tileSource,
                x: startX + idx * (1 + gap),
                y: 0,
                width: 1
            });
        });
        if (!skipHome) this.centerBookSpread();
        this.updatePageNum(this.bookPageIndex);
        const baseIndex = this.bookPageIndex === 0 ? 0 : (this.bookPageIndex * 2 - 1);
        this.updateAnnotationsPanel(baseIndex);
        this.updateFulltextPanel(baseIndex);
    }

    centerBookSpread(force = false) {
        if (!this.osdExplorer) return;
        if (!force && !this.bookCenterNeedsFit) return;
        if (this.bookCenterPending) return;
        this.bookCenterPending = true;
        const applyCenter = () => {
            const world = this.osdExplorer.world;
            if (!world || world.getItemCount() === 0) return false;
            let union = null;
            for (let i = 0; i < world.getItemCount(); i += 1) {
                const item = world.getItemAt(i);
                if (!item) continue;
                const b = item.getBounds();
                if (!b) continue;
                union = union ? union.union(b) : b;
            }
            if (!union) return false;
            this.osdExplorer.viewport.fitBounds(union, true);
            this.osdExplorer.viewport.panTo(union.getCenter(), true);
            if (this.osdExplorer.viewport.applyConstraints) this.osdExplorer.viewport.applyConstraints(true);
            this.bookCenterNeedsFit = false;
            return true;
        };
        requestAnimationFrame(() => {
            applyCenter();
            setTimeout(() => {
                applyCenter();
                this.bookCenterPending = false;
            }, 60);
        });
    }

    centerContinuous() {
        if (!this.osdExplorer) return;
        const world = this.osdExplorer.world;
        if (!world || world.getItemCount() === 0) return;
        let union = null;
        for (let i = 0; i < world.getItemCount(); i += 1) {
            const item = world.getItemAt(i);
            if (!item) continue;
            const b = item.getBounds();
            if (!b) continue;
            union = union ? union.union(b) : b;
        }
        if (!union) return;
        this.osdExplorer.viewport.fitBounds(union, true);
        this.osdExplorer.viewport.panTo(union.getCenter(), true);
        if (this.osdExplorer.viewport.applyConstraints) this.osdExplorer.viewport.applyConstraints(true);
    }

    highlightActiveCanvas(osdPageIndex, scroll) {
        if (!this.els.structureItems) return;
        const buttons = Array.from(this.els.structureItems.querySelectorAll('[data-mimir-canvas]'));
        if (!buttons.length) return;
        let activeIdx = [osdPageIndex];
        if (this.isBookMode) {
            if (osdPageIndex === 0) activeIdx = [0];
            else {
                const first = osdPageIndex * 2 - 1;
                const second = osdPageIndex * 2;
                activeIdx = [first, second];
            }
        }
        buttons.forEach(btn => {
            const idx = Number(btn.getAttribute('data-mimir-canvas'));
            btn.classList.toggle('is-active', activeIdx.includes(idx));
        });
        if (scroll) {
            const active = this.els.structureItems.querySelector('[data-mimir-canvas].is-active');
            if (active) active.scrollIntoView({ block: 'nearest' });
        }
    }

    highlightActiveOutline(osdPageIndex) {
        if (!this.els.structureOutline || !this.currentParsed?.ranges?.length) return;
        const canvasId = this.currentParsed?.canvases?.[osdPageIndex]?.id;
        if (!canvasId) return;
        const activeIdx = new Set();
        const walk = (ranges, ancestors = []) => {
            ranges.forEach(r => {
                const contains = r.canvasIds?.includes(canvasId);
                if (contains) {
                    activeIdx.add(r._idx);
                    ancestors.forEach(a => activeIdx.add(a._idx));
                }
                if (r.children?.length) walk(r.children, contains ? [...ancestors, r] : [...ancestors]);
            });
        };
        walk(this.currentParsed.ranges);
        const nodes = this.els.structureOutline.querySelectorAll('[data-mimir-outline-idx]');
        nodes.forEach(node => {
            const idx = Number(node.getAttribute('data-mimir-outline-idx'));
            node.classList.toggle('mimir-outline-active', activeIdx.has(idx));
            if (activeIdx.has(idx)) node.classList.add('mimir-outline-open');
        });
        const firstActive = this.els.structureOutline.querySelector('.mimir-outline-node.mimir-outline-active');
        if (firstActive) firstActive.scrollIntoView({ block: 'nearest' });
    }

    updateTopBar(type, manifest, parsed) {
        this.els.topBar.style.opacity = '1';
        const getLabel = (label, fallback) => this.resolveLangValue(label, fallback);
        this.els.title.innerText = parsed?.label || getLabel(manifest.label, this.t('untitled'));
        const collection = parsed?.collectionLinks?.[0];
        if (collection?.label) {
            this.els.collectionLink.textContent = collection.label;
            this.els.collectionLink.classList.remove('mimir-hidden');
            this.els.collectionLink.onclick = (e) => {
                e.preventDefault();
                this.setLeftOpen(true);
                this.setActiveTab(this.els.sidebar, 'collection');
                if (collection.id) this.loadCollectionMembers(collection.id);
            };
        } else {
            this.els.collectionLink.textContent = '';
            this.els.collectionLink.classList.add('mimir-hidden');
            this.els.collectionLink.onclick = null;
        }
        let iconSvg = '';
        if (type === 'image') iconSvg = ICONS.image;
        else if (type === 'av') iconSvg = ICONS.av;
        else if (type === 'collection') iconSvg = ICONS.collection;
        else iconSvg = ICONS.model;
        this.els.mediaIcon.innerHTML = iconSvg;
    }

    updateMetadata(manifest, parsed) {
        const getLabel = (label, fallback = '') => this.resolveLangValue(label, fallback);
        const attributionLabel = parsed?.attributionLabel || getLabel(manifest?.requiredStatement?.label, this.t('provider')) || this.t('provider');
        const attributionValue = parsed?.attribution || getLabel(manifest?.requiredStatement?.value || manifest?.attribution || '');
        const logoUrl = parsed?.logoUrl;
        const licenseUrl = parsed?.license || '';
        const provider = parsed?.provider || {};
        const LICENSE_ICON_URLS = {
            cc: ccIcon,
            by: byIcon,
            nc: ncIcon,
            nd: ndIcon,
            sa: saIcon,
            zero: zeroIcon,
            pd: pdIcon
        };
        const licenseTokens = (() => {
            if (!licenseUrl) return [];
            const lower = licenseUrl.toLowerCase();
            if (lower.includes('creativecommons.org/publicdomain/zero') || lower.includes('cc0')) return ['cc', 'zero'];
            if (lower.includes('creativecommons.org/publicdomain/mark')) return ['cc', 'pd'];
            if (lower.includes('creativecommons.org/licenses/')) {
                const slug = lower.split('creativecommons.org/licenses/')[1] || '';
                const type = slug.split('/')[0] || '';
                const parts = type.split('-').filter(Boolean).map(p => p.toLowerCase());
                return ['cc', ...parts];
            }
            if (lower.includes('rightsstatements.org')) return [];
            return [];
        })();
        const licenseIcons = licenseTokens.length
            ? licenseTokens
                .map(token => LICENSE_ICON_URLS[token] ? `<img class="mimir-license-icon-img" src="${LICENSE_ICON_URLS[token]}" alt="">` : '')
                .filter(Boolean)
                .join('')
            : '';

        let html = '';

        if (attributionValue || logoUrl) {
            html += `<div class="mimir-card mimir-card-compact">
                <div class="mimir-info-section">
                    <div class="mimir-info-label">${attributionLabel || this.t('attribution')}</div>
                    <div class="mimir-info-row">
                        <div class="mimir-info-value">${attributionValue || ''}</div>
                    </div>
                </div>
            </div>`;
        }

        if (licenseUrl || licenseIcons) {
            html += `<div class="mimir-card mimir-card-compact">
                <div class="mimir-info-section">
                    <div class="mimir-info-label">${this.t('rights')}</div>
                    <div class="mimir-info-row mimir-info-divider"></div>
                    <div class="mimir-info-row">
                        ${licenseIcons ? `<div class="mimir-license-badges">${licenseIcons}</div>` : ''}
                        ${licenseUrl ? `<a class="mimir-info-value mimir-link" href="${licenseUrl}" target="_blank" rel="noopener">${licenseUrl}</a>` : ''}
                    </div>
                </div>
            </div>`;
        }

        const normalizeText = (val) => (val || '').toString().toLowerCase().replace(/\s+/g, ' ').trim();
        const sameProviderAsAttribution = (() => {
            if (!provider) return false;
            const attrText = normalizeText(attributionValue);
            const providerText = normalizeText(provider.label);
            const attrHas = Boolean(attrText);
            const providerHas = Boolean(providerText);
            const textMatch = attrHas && providerHas && (attrText.includes(providerText) || providerText.includes(attrText));
            const logoMatch = logoUrl && provider.logoUrl && logoUrl === provider.logoUrl;
            const homeMatch = provider.homepage && attributionValue && normalizeText(attributionValue).includes(normalizeText(provider.homepage));
            return textMatch || logoMatch || homeMatch;
        })();

        if (!sameProviderAsAttribution && (provider?.label || provider?.logoUrl || provider?.homepage)) {
            html += `<div class="mimir-card mimir-card-compact">
                <div class="mimir-info-section">
                    <div class="mimir-info-label">${this.t('provider')}</div>
                    <div class="mimir-info-row mimir-info-divider"></div>
                    <div class="mimir-info-row">
                        ${provider.logoUrl ? `<img class="mimir-info-logo" src="${provider.logoUrl}" alt="">` : ''}
                    </div>
                    ${provider.label ? `<div class="mimir-info-row"><div class="mimir-info-value">${provider.label}</div></div>` : ''}
                    ${provider.homepage ? `<div class="mimir-info-row"><a class="mimir-info-value mimir-link" href="${provider.homepage}" target="_blank" rel="noopener">${provider.homepage}</a></div>` : ''}
                </div>
            </div>`;
        }

        const titleLabel = parsed?.label || getLabel(manifest.label);
        const summary = parsed?.summary || getLabel(manifest.summary || manifest.description || '');
        const meta = parsed?.metadata?.length ? parsed.metadata : (manifest.metadata || []);
        let metaHtml = '';
        meta.forEach(item => {
            metaHtml += `<div class="mimir-meta-item"><p class="mimir-meta-title">${getLabel(item.label)}</p><p class="mimir-meta-value">${getLabel(item.value)}</p></div>`;
        });
        if (titleLabel || summary) {
            html += `<div class="mimir-card mimir-card-compact mimir-title-summary">
                <div class="mimir-info-section">
                    ${titleLabel ? `<div class="mimir-title-lg">${titleLabel}</div>` : ''}
                    ${summary ? `<div class="mimir-summary-sm">${summary}</div>` : ''}
                </div>
            </div>`;
        }
        html += `<div class="mimir-card mimir-card-compact">
            <p class="mimir-meta-title">${this.t('metadata')}</p>
            <div class="mimir-meta-grid">
                ${metaHtml || `<p class="mimir-meta-value">${this.t('no_metadata')}</p>`}
            </div>
        </div>`;
        if (this.els.metadataContainer) {
            this.els.metadataContainer.innerHTML = html;
            this.bindSidebarActions(parsed, this.els.metadataContainer);
        }
        if (this.els.fulltextBody) {
            const text = parsed?.fulltext || '';
            this.els.fulltextBody.innerHTML = text
                ? `<div class="mimir-card"><p class="mimir-meta-title">${this.t('fulltext')}</p><p class="mimir-meta-value">${text}</p></div>`
                : `<div class="mimir-card"><p class="mimir-meta-title">${this.t('fulltext')}</p><p class="mimir-meta-value">${this.t('no_fulltext')}</p></div>`;
        }
        this.updateAnnotationsPanel(0);
        this.updateFulltextPanel(0);
        this.updateBookmarks();
    }

    escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || '').trim();
    }

    setAnnotationMode(mode) {
        this.annotationMode = mode;
        if (this.els.annotationsToggle) {
            const isAll = mode === 'all';
            this.els.annotationsToggle.textContent = isAll ? this.t('show_selected') : this.t('show_all');
            this.els.annotationsToggle.classList.toggle('is-active', isAll);
        }
        this.updateAnnotationsPanel();
        this.updateAnnotationOverlays();
    }

    updateAnnotationsPanel(pageIndex = null) {
        if (!this.els.annotationsList) return;
        const allMap = this.currentParsed?.annotationsByCanvasId || {};
        let list = [];
        if (this.isBookMode && Number.isFinite(this.bookPageIndex)) {
            const leftIdx = this.bookPageIndex === 0 ? 0 : (this.bookPageIndex * 2 - 1);
            const rightIdx = leftIdx + 1;
            const leftId = this.currentParsed?.canvases?.[leftIdx]?.id;
            const rightId = this.currentParsed?.canvases?.[rightIdx]?.id;
            list = [
                ...(leftId ? (allMap[leftId] || []) : []),
                ...(rightId ? (allMap[rightId] || []) : [])
            ];
        } else {
            const canvasId = pageIndex === null
                ? this.currentAnnotations?.[0]?.canvasId
                : this.currentParsed?.canvases?.[pageIndex]?.id;
            list = canvasId ? (allMap[canvasId] || []) : [];
            if (!list.length) {
                const allKeys = Object.keys(allMap);
                if (allKeys.length === 1) list = allMap[allKeys[0]] || [];
            }
        }
        this.currentAnnotations = list;
        this.loadAnnotationStylesheets(list);

        const totalCount = Object.values(allMap).reduce((sum, arr) => sum + (arr?.length || 0), 0);
        if (!list.length) {
            const keys = Object.keys(this.currentParsed?.annotationsByCanvasId || {});
            const keyInfo = keys.length ? `<p class="mimir-meta-value">Parsed keys: ${this.escapeHtml(keys.join(', '))}</p>` : '';
            this.els.annotationsList.innerHTML = `
                <div class="mimir-card">
                    <p class="mimir-meta-title">Annotations</p>
                    <p class="mimir-meta-value">${this.t('no_annotations')}</p>
                    <p class="mimir-meta-value">Parsed total: ${totalCount}</p>
                    ${keyInfo}
                </div>
            `;
            if (this.els.annotationsToggle) this.els.annotationsToggle.classList.add('mimir-hidden');
            if (this.els.annotationsCount) this.els.annotationsCount.textContent = '';
            this.selectedAnnotationId = null;
            this.updateAnnotationOverlays();
            return;
        }

        if (this.els.annotationsToggle) this.els.annotationsToggle.classList.remove('mimir-hidden');
        if (this.els.annotationsCount) this.els.annotationsCount.textContent = `${list.length} annotation${list.length === 1 ? '' : 's'} (total ${totalCount})`;
        if (this.annotationMode === 'single' && this.selectedAnnotationId) {
            const exists = list.some(a => a.id === this.selectedAnnotationId);
            if (!exists) this.selectedAnnotationId = null;
        }

        const itemsHtml = list.map((anno, idx) => {
            const title = anno.label || `Annotation ${idx + 1}`;
            const excerpt = this.stripHtml(anno.html || '');
            const short = excerpt.length > 140 ? `${excerpt.slice(0, 140)}…` : excerpt;
            const isActive = this.annotationMode === 'single' && anno.id === this.selectedAnnotationId;
            return `
                <button class="mimir-anno-item ${isActive ? 'is-active' : ''}" data-mimir-anno-id="${anno.id}">
                    <div class="mimir-anno-title">${this.escapeHtml(title)}</div>
                    <div class="mimir-anno-excerpt">${this.escapeHtml(short || this.t('no_text'))}</div>
                </button>
            `;
        }).join('');

        this.els.annotationsList.innerHTML = itemsHtml;
        this.els.annotationsList.querySelectorAll('[data-mimir-anno-id]').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-mimir-anno-id');
                if (this.annotationMode !== 'single') this.annotationMode = 'single';
                if (this.selectedAnnotationId === id) this.selectedAnnotationId = null;
                else this.selectedAnnotationId = id;
                this.setAnnotationMode('single');
            };
            btn.onmouseenter = () => {
                const id = btn.getAttribute('data-mimir-anno-id');
                if (this.annotationMode === 'all') {
                    this.showAnnotationPreview(id, true);
                }
            };
            btn.onmouseleave = () => {
                const id = btn.getAttribute('data-mimir-anno-id');
                if (this.annotationMode === 'all') {
                    this.showAnnotationPreview(id, false);
                }
            };
        });

        this.updateAnnotationOverlays();
    }

    async updateFulltextPanel(pageIndex = null) {
        if (!this.els.fulltextContainer) return;
        let canvasId = pageIndex === null
            ? this.currentFulltextLines?.[0]?.canvasId
            : this.currentParsed?.canvases?.[pageIndex]?.id;
        if (!canvasId) {
            this.els.fulltextContainer.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('fulltext')}</p><p class="mimir-meta-value">${this.t('no_fulltext')}</p></div>`;
            return;
        }
        const allSourcesMap = this.fulltextSourcesByCanvasId || {};
        if (!allSourcesMap[canvasId]) {
            const keys = Object.keys(allSourcesMap);
            if (keys.length === 1) canvasId = keys[0];
        }
        const lines = this.fulltextByCanvasId[canvasId] || [];
        if (!lines.length) {
            if (this.isBookMode) {
                const leftIdx = this.bookPageIndex === 0 ? 0 : (this.bookPageIndex * 2 - 1);
                const rightIdx = leftIdx + 1;
                const leftId = this.currentParsed?.canvases?.[leftIdx]?.id;
                const rightId = this.currentParsed?.canvases?.[rightIdx]?.id;
                const leftSources = leftId ? (this.fulltextSourcesByCanvasId[leftId] || []) : [];
                const rightSources = rightId ? (this.fulltextSourcesByCanvasId[rightId] || []) : [];
                if (leftSources.length || rightSources.length) {
                    if (this.els.fulltextBody) {
                        this.els.fulltextBody.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('fulltext')}</p><p class="mimir-meta-value">${this.t('loading_fulltext')}</p></div>`;
                    }
                    await Promise.all([
                        leftId && leftSources.length ? this.fetchAndParseAlto(leftId, leftSources) : null,
                        rightId && rightSources.length ? this.fetchAndParseAlto(rightId, rightSources) : null
                    ]);
                } else {
                    const keys = Object.keys(this.fulltextSourcesByCanvasId || {});
                    const keyInfo = keys.length ? `<p class="mimir-meta-value">Sources: ${this.escapeHtml(keys.join(', '))}</p>` : '';
                    if (this.els.fulltextBody) {
                        this.els.fulltextBody.innerHTML = `
                            <div class="mimir-card">
                                <p class="mimir-meta-title">${this.t('fulltext')}</p>
                                <p class="mimir-meta-value">${this.t('no_fulltext')}</p>
                                ${keyInfo}
                            </div>
                        `;
                    }
                    if (this.els.fulltextLayer) this.els.fulltextLayer.innerHTML = '';
                    return;
                }
            } else {
                const sources = this.fulltextSourcesByCanvasId[canvasId] || [];
                if (sources.length) {
                    if (this.els.fulltextBody) {
                        this.els.fulltextBody.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('fulltext')}</p><p class="mimir-meta-value">${this.t('loading_fulltext')}</p></div>`;
                    }
                    await this.fetchAndParseAlto(canvasId, sources);
                } else {
                const keys = Object.keys(this.fulltextSourcesByCanvasId || {});
                const keyInfo = keys.length ? `<p class="mimir-meta-value">Sources: ${this.escapeHtml(keys.join(', '))}</p>` : '';
                if (this.els.fulltextBody) {
                    this.els.fulltextBody.innerHTML = `
                        <div class="mimir-card">
                            <p class="mimir-meta-title">${this.t('fulltext')}</p>
                            <p class="mimir-meta-value">${this.t('no_fulltext')}</p>
                            ${keyInfo}
                        </div>
                    `;
                }
                    if (this.els.fulltextLayer) this.els.fulltextLayer.innerHTML = '';
                    return;
                }
            }
        }
        const finalLines = this.fulltextByCanvasId[canvasId] || [];
        this.currentFulltextLines = finalLines;
        if (!finalLines.length && !this.isBookMode) {
            if (this.els.fulltextBody) {
                this.els.fulltextBody.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('fulltext')}</p><p class="mimir-meta-value">${this.t('no_fulltext')}</p></div>`;
            }
            if (this.els.fulltextLayer) this.els.fulltextLayer.innerHTML = '';
            return;
        }
        if (this.els.fulltextBody) {
            let html = '';
            if (this.isBookMode) {
                const leftIdx = this.bookPageIndex === 0 ? 0 : (this.bookPageIndex * 2 - 1);
                const rightIdx = leftIdx + 1;
                const leftId = this.currentParsed?.canvases?.[leftIdx]?.id;
                const rightId = this.currentParsed?.canvases?.[rightIdx]?.id;
                const leftLines = leftId ? (this.fulltextByCanvasId[leftId] || []) : [];
                const rightLines = rightId ? (this.fulltextByCanvasId[rightId] || []) : [];
                this.currentFulltextLines = [...leftLines, ...rightLines];
                if (leftLines.length) {
                    html += `<div class="mimir-ocr-card">${this.renderFulltextText(leftLines)}</div>`;
                } else {
                    html += `<div class="mimir-ocr-card"><p class="mimir-meta-value">${this.t('no_fulltext_left')}</p></div>`;
                }
                if (rightId) {
                    if (rightLines.length) {
                        html += `<div class="mimir-ocr-card">${this.renderFulltextText(rightLines)}</div>`;
                    } else {
                        html += `<div class="mimir-ocr-card"><p class="mimir-meta-value">${this.t('no_fulltext_right')}</p></div>`;
                    }
                }
            } else {
                html = `<div class="mimir-ocr-card">${this.renderFulltextText(finalLines)}</div>`;
            }
            this.els.fulltextBody.innerHTML = html;
            this.els.fulltextBody.querySelectorAll('[data-mimir-ocr-id]').forEach(span => {
                span.onmouseenter = () => {
                    const id = span.getAttribute('data-mimir-ocr-id');
                    this.showOcrPreview(id, true);
                };
                span.onmouseleave = () => {
                    const id = span.getAttribute('data-mimir-ocr-id');
                    this.showOcrPreview(id, false);
                };
                span.onclick = () => {
                    const id = span.getAttribute('data-mimir-ocr-id');
                    this.focusOcrLine(id);
                };
            });
        }
        this.updateFulltextOverlays();
    }

    renderFulltextText(lines) {
        const parts = [];
        let lastPara = null;
        lines.forEach((line, idx) => {
            const paraId = line.paragraphId || null;
            const text = this.escapeHtml(line.text || `Line ${idx + 1}`);
            if (this.fulltextMode === 'lines') {
                if (idx > 0) parts.push(line.paragraphId && lastPara !== paraId ? '<br><br>' : '<br>');
            } else {
                if (idx > 0) parts.push(line.paragraphId && lastPara !== paraId ? '<br><br>' : ' ');
            }
            parts.push(`<span class="mimir-ocr-span" data-mimir-ocr-id="${line.id}">${text}</span>`);
            lastPara = paraId;
        });
        return parts.join('');
    }

    async fetchAndParseAlto(canvasId, sources) {
        if (!sources?.length) return;
        const canvas = this.currentParsed?.canvases?.find(c => c.id === canvasId);
        const canvasWidth = canvas?.width || this.currentManifest?.items?.find(i => i.id === canvasId)?.width || 0;
        const canvasHeight = canvas?.height || this.currentManifest?.items?.find(i => i.id === canvasId)?.height || 0;
        const allLines = [];
        await Promise.all(sources.map(async (src) => {
            try {
                const res = await fetch(src);
                if (!res.ok) return;
                const text = await res.text();
                const lower = src.toLowerCase();
                const isHocr = lower.includes('hocr') || /hocr/i.test(text);
                const lines = isHocr
                    ? this.parseHocr(text, canvasWidth, canvasHeight)
                    : this.parseAltoXml(text, canvasWidth, canvasHeight);
                lines.forEach(l => { l.canvasId = canvasId; });
                allLines.push(...lines);
            } catch (err) {
                console.warn('Mimir: Failed to load ALTO', src, err);
            }
        }));
        this.fulltextByCanvasId[canvasId] = allLines;
    }

    parseAltoXml(xmlText, canvasWidth, canvasHeight) {
        if (!xmlText || typeof DOMParser === 'undefined') return [];
        const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
        const page = doc.getElementsByTagName('Page')[0];
        const pageW = Number(page?.getAttribute('WIDTH') || 0);
        const pageH = Number(page?.getAttribute('HEIGHT') || 0);
        const scaleX = pageW && canvasWidth ? canvasWidth / pageW : 1;
        const scaleY = pageH && canvasHeight ? canvasHeight / pageH : 1;
        const lines = [];
        const textLines = Array.from(doc.getElementsByTagName('TextLine'));
        textLines.forEach((lineEl, idx) => {
            const paraEl = lineEl.closest ? lineEl.closest('TextBlock,TextBlockType') : null;
            const paragraphId = paraEl?.getAttribute?.('ID') || paraEl?.getAttribute?.('id') || null;
            const x = Number(lineEl.getAttribute('HPOS') || 0) * scaleX;
            const y = Number(lineEl.getAttribute('VPOS') || 0) * scaleY;
            const w = Number(lineEl.getAttribute('WIDTH') || 0) * scaleX;
            const h = Number(lineEl.getAttribute('HEIGHT') || 0) * scaleY;
            const strings = Array.from(lineEl.getElementsByTagName('String'));
            const text = strings.map(s => s.getAttribute('CONTENT')).filter(Boolean).join(' ').trim();
            lines.push({
                id: `line-${idx}-${x}-${y}`,
                text,
                box: { x, y, w, h },
                paragraphId
            });
        });
        return lines;
    }

    parseHocr(htmlText, canvasWidth, canvasHeight) {
        if (!htmlText || typeof DOMParser === 'undefined') return [];
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
        const page = doc.querySelector('.ocr_page');
        const pageBox = page?.getAttribute('title') || '';
        const pageMatch = pageBox.match(/bbox\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)/);
        const pageW = pageMatch ? Number(pageMatch[3]) : 0;
        const pageH = pageMatch ? Number(pageMatch[4]) : 0;
        const scaleX = pageW && canvasWidth ? canvasWidth / pageW : 1;
        const scaleY = pageH && canvasHeight ? canvasHeight / pageH : 1;
        const lines = [];
        const lineEls = Array.from(doc.querySelectorAll('.ocr_line, .ocrx_line'));
        lineEls.forEach((lineEl, idx) => {
            const title = lineEl.getAttribute('title') || '';
            const match = title.match(/bbox\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)/);
            const x = match ? Number(match[1]) * scaleX : 0;
            const y = match ? Number(match[2]) * scaleY : 0;
            const w = match ? (Number(match[3]) - Number(match[1])) * scaleX : 0;
            const h = match ? (Number(match[4]) - Number(match[2])) * scaleY : 0;
            const text = lineEl.textContent?.trim() || '';
            const paraEl = lineEl.closest('.ocr_par');
            const paragraphId = paraEl?.getAttribute('id') || null;
            lines.push({
                id: `hocr-${idx}-${x}-${y}`,
                text,
                box: { x, y, w, h },
                paragraphId
            });
        });
        return lines;
    }

    updateFulltextOverlays() {
        if (!this.els.fulltextLayer) return;
        this.els.fulltextLayer.innerHTML = '';
        if (!this.osdExplorer || !this.currentFulltextLines?.length) return;
        this.currentFulltextLines.forEach((line) => {
            if (!line.box || !Number.isFinite(line.box.w) || !Number.isFinite(line.box.h)) return;
            const rect = this.getRectPxForCanvas(line.box, line.canvasId);
            if (!rect) return;
            const box = document.createElement('div');
            box.className = 'mimir-ocr-box';
            box.style.left = `${rect.x}px`;
            box.style.top = `${rect.y}px`;
            box.style.width = `${rect.width}px`;
            box.style.height = `${rect.height}px`;
            box.dataset.mimirOcrId = line.id;
            this.els.fulltextLayer.appendChild(box);
            box.addEventListener('mouseenter', () => this.showOcrPreview(line.id, true));
            box.addEventListener('mouseleave', () => this.showOcrPreview(line.id, false));
            box.addEventListener('click', () => this.focusOcrLine(line.id, true));
        });
    }

    scheduleOverlayUpdate() {
        if (this.overlayUpdatePending) return;
        this.overlayUpdatePending = true;
        requestAnimationFrame(() => {
            this.updateAnnotationOverlays();
            this.updateFulltextOverlays();
            this.overlayUpdatePending = false;
        });
    }

    scheduleZoomUpdate() {
        if (this.zoomUpdatePending) return;
        this.zoomUpdatePending = true;
        requestAnimationFrame(() => {
            this.applyZoom();
            this.zoomUpdatePending = false;
        });
    }

    applyZoom() {
        const value = Number(this.pendingZoomValue ?? this.zoomValue ?? 1);
        if (this.osdExplorer && !this.els.osd.classList.contains('mimir-hidden')) {
            const viewport = this.osdExplorer.viewport;
            const homeZoom = viewport.getHomeZoom ? viewport.getHomeZoom() : 1;
            viewport.zoomTo(homeZoom * value);
        }
        if (this.threeState && !this.els.threeD.classList.contains('mimir-hidden')) {
            const { camera, controls, baseTarget, baseDir, baseDistance } = this.threeState;
            if (camera && controls && baseTarget && baseDir && Number.isFinite(baseDistance)) {
                const dist = baseDistance / Math.max(0.01, value);
                camera.position.copy(baseTarget.clone().add(baseDir.clone().multiplyScalar(dist)));
                camera.lookAt(baseTarget);
                camera.updateProjectionMatrix();
                controls.update();
            }
        }
        this.applyTransforms();
    }

    showOcrPreview(id, show) {
        const box = this.els.fulltextLayer?.querySelector(`[data-mimir-ocr-id="${id}"]`);
        const item = this.els.fulltextBody?.querySelector(`[data-mimir-ocr-id="${id}"]`);
        if (box) box.classList.toggle('is-active', show);
        if (item) item.classList.toggle('is-hover', show);
    }

    focusOcrLine(id, openTab = false) {
        if (openTab) {
            this.setRightOpen(true);
            this.setActiveTab(this.els.info, 'fulltext');
        }
        const item = this.els.fulltextBody?.querySelector(`[data-mimir-ocr-id="${id}"]`);
        if (item) {
            this.els.fulltextBody.querySelectorAll('.mimir-ocr-span.is-active').forEach(el => el.classList.remove('is-active'));
            item.classList.add('is-active');
            item.scrollIntoView({ block: 'nearest' });
        }
        const box = this.els.fulltextLayer?.querySelector(`[data-mimir-ocr-id="${id}"]`);
        if (box) box.classList.add('is-active');
    }

    getRectPxFromImage(box) {
        if (!this.osdExplorer || !box) return null;
        const rect = new OpenSeadragon.Rect(box.x, box.y, box.w, box.h);
        const vRect = this.osdExplorer.viewport.imageToViewportRectangle(rect);
        const tl = this.osdExplorer.viewport.pixelFromPoint(vRect.getTopLeft(), true);
        const br = this.osdExplorer.viewport.pixelFromPoint(vRect.getBottomRight(), true);
        return {
            x: tl.x,
            y: tl.y,
            width: Math.max(1, br.x - tl.x),
            height: Math.max(1, br.y - tl.y)
        };
    }

    getRectPxForCanvas(box, canvasId) {
        if (!this.osdExplorer || !box) return null;
        const rect = new OpenSeadragon.Rect(box.x, box.y, box.w, box.h);
        if (!this.isBookMode) {
            const vRect = this.osdExplorer.viewport.imageToViewportRectangle(rect);
            const tl = this.osdExplorer.viewport.pixelFromPoint(vRect.getTopLeft(), true);
            const br = this.osdExplorer.viewport.pixelFromPoint(vRect.getBottomRight(), true);
            return {
                x: tl.x,
                y: tl.y,
                width: Math.max(1, br.x - tl.x),
                height: Math.max(1, br.y - tl.y)
            };
        }
        const leftIdx = this.bookPageIndex === 0 ? 0 : (this.bookPageIndex * 2 - 1);
        const rightIdx = leftIdx + 1;
        const leftId = this.currentParsed?.canvases?.[leftIdx]?.id;
        const rightId = this.currentParsed?.canvases?.[rightIdx]?.id;
        const itemIndex = canvasId === rightId ? 1 : 0;
        const item = this.osdExplorer.world.getItemAt(itemIndex);
        if (!item || !item.imageToViewportRectangle) return null;
        const vRect = item.imageToViewportRectangle(rect);
        const tl = this.osdExplorer.viewport.pixelFromPoint(vRect.getTopLeft(), true);
        const br = this.osdExplorer.viewport.pixelFromPoint(vRect.getBottomRight(), true);
        return {
            x: tl.x,
            y: tl.y,
            width: Math.max(1, br.x - tl.x),
            height: Math.max(1, br.y - tl.y)
        };
    }

    loadAnnotationStylesheets(list) {
        if (!list?.length) return;
        list.forEach((anno) => {
            (anno.stylesheets || []).forEach((href) => {
                if (!href || this.annotationStylesheets.has(href)) return;
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
                this.annotationStylesheets.add(href);
            });
        });
    }

    getManifestId() {
        return this.currentManifest?.id || this.currentManifest?.['@id'] || '';
    }

    getBookmarks() {
        const match = document.cookie.match(/(?:^|; )mimir_bookmarks=([^;]+)/);
        if (!match) return [];
        try {
            return JSON.parse(decodeURIComponent(match[1])) || [];
        } catch {
            return [];
        }
    }

    setBookmarks(list) {
        const value = encodeURIComponent(JSON.stringify(list));
        document.cookie = `mimir_bookmarks=${value}; path=/; max-age=31536000`;
    }

    addBookmark() {
        if (!this.currentManifest) return;
        const manifestId = this.getManifestId();
        if (!manifestId) return;
        const pageIndex = Number.isFinite(this.currentCanvasIndex) ? this.currentCanvasIndex : (this.osdExplorer?.currentPage?.() ?? 0);
        const label = this.currentParsed?.label || 'Untitled Manifest';
        const itemLabel = this.currentParsed?.canvases?.[pageIndex]?.label || '';
        const entry = {
            id: `${manifestId}::${pageIndex}`,
            manifestId,
            pageIndex,
            label,
            itemLabel,
            createdAt: Date.now()
        };
        const list = this.getBookmarks();
        const exists = list.some(b => b.id === entry.id);
        const next = exists ? list.filter(b => b.id !== entry.id) : [entry, ...list];
        this.setBookmarks(next);
        this.updateBookmarks();
        this.updateBookmarkButton();
    }

    removeBookmark(id) {
        const list = this.getBookmarks().filter(b => b.id !== id);
        this.setBookmarks(list);
        this.updateBookmarks();
        this.updateBookmarkButton();
    }

    updateBookmarkButton() {
        if (!this.els.btns.bookmarkAdd) return;
        const manifestId = this.getManifestId();
        if (!manifestId) return;
        const pageIndex = Number.isFinite(this.currentCanvasIndex) ? this.currentCanvasIndex : (this.osdExplorer?.currentPage?.() ?? 0);
        const id = `${manifestId}::${pageIndex}`;
        const list = this.getBookmarks();
        const exact = list.some(b => b.id === id);
        const anyInManifest = list.some(b => b.manifestId === manifestId);
        this.els.btns.bookmarkAdd.innerHTML = exact ? ICONS.bookmarkFilled : ICONS.bookmark;
        this.els.btns.bookmarkAdd.style.color = (exact || anyInManifest) ? 'var(--mimir-primary)' : '';
    }

    updateBookmarks() {
        if (!this.els.structureBookmarks) return;
        const list = this.getBookmarks();
        if (!list.length) {
            this.els.structureBookmarks.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('bookmarks')}</p><p class="mimir-meta-value">${this.t('no_bookmarks')}</p></div>`;
            return;
        }
        const grouped = list.reduce((acc, b) => {
            const key = b.manifestId || 'unknown';
            if (!acc[key]) acc[key] = { label: b.label || key, items: [] };
            acc[key].items.push(b);
            return acc;
        }, {});
        const html = Object.values(grouped).map(group => {
            const items = group.items.map((b) => {
                const itemLabel = b.itemLabel || `Page ${b.pageIndex + 1}`;
                return `
                    <div class="mimir-bookmark-item">
                        <button class="mimir-bookmark-label" data-mimir-bookmark="${b.id}">
                            ${this.escapeHtml(itemLabel)}
                        </button>
                        <button class="mimir-icon-btn mimir-bookmark-remove" title="Remove bookmark" data-mimir-bookmark-remove="${b.id}">${ICONS.close}</button>
                    </div>
                `;
            }).join('');
            return `
                <div class="mimir-bookmarks-group">
                    <div class="mimir-bookmarks-title">${this.escapeHtml(group.label)} (${group.items.length})</div>
                    ${items}
                </div>
            `;
        }).join('');
        this.els.structureBookmarks.innerHTML = `<div class="mimir-bookmarks">${html}</div>`;
        this.els.structureBookmarks.querySelectorAll('[data-mimir-bookmark]').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-mimir-bookmark');
                const entry = list.find(b => b.id === id);
                if (!entry) return;
                if (this.getManifestId() === entry.manifestId) {
                    if (this.osdExplorer && Number.isFinite(entry.pageIndex)) this.osdExplorer.goToPage(entry.pageIndex);
                } else {
                    this.pendingBookmarkPage = entry.pageIndex;
                    this.loadManifest(entry.manifestId);
                }
            };
        });
        this.els.structureBookmarks.querySelectorAll('[data-mimir-bookmark-remove]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-mimir-bookmark-remove');
                if (id) this.removeBookmark(id);
            };
        });
    }

    updateAnnotationOverlays() {
        if (!this.els.annotationsLayer) return;
        this.els.annotationsLayer.innerHTML = '';
        if (!this.osdExplorer || !this.currentAnnotations?.length) return;

        const annotations = this.annotationMode === 'all'
            ? this.currentAnnotations
            : this.currentAnnotations.filter(a => a.id === this.selectedAnnotationId);

        annotations.forEach((anno) => {
            if (!anno.xywh) return;
            const rect = this.getRectPxForCanvas(
                { x: anno.xywh[0], y: anno.xywh[1], w: anno.xywh[2], h: anno.xywh[3] },
                anno.canvasId
            );
            if (!rect) return;

            const box = document.createElement('div');
            const isSelected = this.annotationMode === 'single' && anno.id === this.selectedAnnotationId;
            box.className = `mimir-anno-box${isSelected ? ' is-active' : ''}${anno.styleClass ? ` ${anno.styleClass}` : ''}`;
            box.style.left = `${rect.x}px`;
            box.style.top = `${rect.y}px`;
            box.style.width = `${rect.width}px`;
            box.style.height = `${rect.height}px`;
            box.dataset.mimirAnnoId = anno.id;
            box.style.background = this.annotationMode === 'all' && !isSelected ? 'transparent' : '';

            const note = document.createElement('div');
            note.className = `mimir-anno-note${anno.styleClass ? ` ${anno.styleClass}` : ''}`;
            note.innerHTML = anno.html || '';
            note.dataset.mimirAnnoId = anno.id;
            if (this.annotationMode === 'all') {
                note.style.display = 'none';
            }

            this.els.annotationsLayer.appendChild(box);
            this.els.annotationsLayer.appendChild(note);
            this.positionAnnotationNote(note, rect);

            if (this.annotationMode === 'all') {
                box.addEventListener('mouseenter', () => {
                    this.showAnnotationPreview(anno.id, true, rect);
                });
                box.addEventListener('mouseleave', () => {
                    this.showAnnotationPreview(anno.id, false);
                });
            }
        });
    }

    showAnnotationPreview(id, show, rect = null) {
        const box = this.els.annotationsLayer?.querySelector(`.mimir-anno-box[data-mimir-anno-id="${id}"]`);
        const note = this.els.annotationsLayer?.querySelector(`.mimir-anno-note[data-mimir-anno-id="${id}"]`);
        if (box) box.classList.toggle('is-active', show);
        if (note) {
            note.style.display = show ? 'block' : 'none';
            if (show) {
                const currentRect = rect || this.getAnnotationRectPx(this.currentAnnotations.find(a => a.id === id)?.xywh);
                if (currentRect) this.positionAnnotationNote(note, currentRect);
            }
        }
        this.setAnnotationHover(id, show);
    }

    setAnnotationHover(id, isHover) {
        const item = this.els.annotationsList?.querySelector(`[data-mimir-anno-id="${id}"]`);
        if (item) item.classList.toggle('is-hover', isHover);
    }

    getAnnotationRectPx(xywh) {
        if (!this.osdExplorer || !xywh) return null;
        const [x, y, w, h] = xywh;
        const rect = new OpenSeadragon.Rect(x, y, w, h);
        const vRect = this.osdExplorer.viewport.imageToViewportRectangle(rect);
        const tl = this.osdExplorer.viewport.pixelFromPoint(vRect.getTopLeft(), true);
        const br = this.osdExplorer.viewport.pixelFromPoint(vRect.getBottomRight(), true);
        return {
            x: tl.x,
            y: tl.y,
            width: Math.max(1, br.x - tl.x),
            height: Math.max(1, br.y - tl.y)
        };
    }

    positionAnnotationNote(note, rect) {
        if (!note || !this.els.osd) return;
        const margin = 10;
        const stage = this.els.osd.getBoundingClientRect();
        const noteWidth = note.offsetWidth || 240;
        const noteHeight = note.offsetHeight || 120;
        let left = rect.x + rect.width + margin;
        let top = rect.y;
        if (left + noteWidth > stage.width) {
            left = rect.x - noteWidth - margin;
        }
        if (left < margin) left = margin;
        if (top + noteHeight > stage.height) {
            top = Math.max(margin, stage.height - noteHeight - margin);
        }
        note.style.left = `${left}px`;
        note.style.top = `${top}px`;
    }

    updateStructure(parsed) {
        if (!this.els.structureItems || !this.els.structureOutline || !this.els.structureCollection || !this.els.structureBookmarks) return;

        let itemsHtml = '';
        if (parsed?.canvases?.length > 1) {
            itemsHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">${this.t('items')}</p>
                <div class="mimir-list">`;
            parsed.canvases.forEach((canvas, idx) => {
                const label = canvas.label || `Canvas ${idx + 1}`;
                const source = canvas.thumbnail || canvas.imageSources?.[0];
                const thumb = this.resolveThumb(source);
                const thumbHtml = thumb
                    ? `<img class="mimir-thumb" src="${thumb}" alt="">`
                    : `<span class="mimir-thumb mimir-thumb-placeholder"></span>`;
                itemsHtml += `<button data-mimir-canvas="${idx}" class="mimir-list-btn">
                    <span class="mimir-list-row">
                        ${thumbHtml}
                        <span class="mimir-list-label">${label}</span>
                    </span>
                </button>`;
            });
            itemsHtml += `</div></div>`;
        }
        if (parsed?.avItems?.length > 1) {
            itemsHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">${this.t('segments')}</p>
                <div class="mimir-list">`;
            parsed.avItems.forEach((item, idx) => {
                const label = item.label || `Track ${idx + 1}`;
                itemsHtml += `<button data-mimir-av="${idx}" class="mimir-list-btn">${label}</button>`;
            });
            itemsHtml += `</div></div>`;
        }
        if (parsed?.modelItems?.length > 1) {
            itemsHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">${this.t('models')}</p>
                <div class="mimir-list">`;
            itemsHtml += `<button data-mimir-model="-1" class="mimir-list-btn">${this.t('all_models')}</button>`;
            parsed.modelItems.forEach((item, idx) => {
                const label = item.label || `Model ${idx + 1}`;
                itemsHtml += `<button data-mimir-model="${idx}" class="mimir-list-btn">${label}</button>`;
            });
            itemsHtml += `</div></div>`;
        }
        this.els.structureItems.innerHTML = itemsHtml || `<div class="mimir-card"><p class="mimir-meta-title">${this.t('items')}</p><p class="mimir-meta-value">${this.t('no_items')}</p></div>`;

        let outlineHtml = '';
        if (parsed?.ranges?.length) {
            const renderRange = (range, depth = 1) => {
                const label = range.label || `Range`;
                const children = Array.isArray(range.children) ? range.children : [];
                const hasChildren = children.length > 0 && depth < 5;
                const toggle = hasChildren
                    ? `<button class="mimir-outline-toggle" data-mimir-outline-toggle>−</button>`
                    : `<span class="mimir-outline-leaf"></span>`;
                const openClass = hasChildren && depth <= 3 ? 'mimir-outline-open' : '';
                let html = `<div class="mimir-outline-node ${openClass}" data-mimir-outline-node data-mimir-outline-idx="${range._idx}">
                    <div class="mimir-outline-row">
                        ${toggle}
                        <button data-mimir-range="${range._idx}" class="mimir-outline-label">${label}</button>
                    </div>`;
                if (hasChildren) {
                    html += `<div class="mimir-outline-children">`;
                    children.forEach(child => { html += renderRange(child, depth + 1); });
                    html += `</div>`;
                }
                html += `</div>`;
                return html;
            };
            outlineHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">${this.t('toc')}</p>
                <div class="mimir-outline">`;
            parsed.ranges.forEach(range => { outlineHtml += renderRange(range); });
            outlineHtml += `</div></div>`;
        }
        this.els.structureOutline.innerHTML = outlineHtml || `<div class="mimir-card"><p class="mimir-meta-title">${this.t('toc')}</p><p class="mimir-meta-value">${this.t('no_toc')}</p></div>`;

        let collectionHtml = '';
        if (parsed?.type === 'collection' && parsed?.items?.length) {
            collectionHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">${this.t('collection_items')}</p>
                <div class="mimir-list">`;
            parsed.items.forEach((item, idx) => {
                const label = item.label || `Item ${idx + 1}`;
                collectionHtml += `<button data-mimir-item="${idx}" class="mimir-list-btn">${label}</button>`;
            });
            collectionHtml += `</div></div>`;
        }
        if (parsed?.collectionLinks?.length) {
            const label = parsed.collectionLinks[0].label || this.t('collection');
            collectionHtml += `<div class="mimir-card"><p class="mimir-meta-title">${this.t('collection')}</p><p class="mimir-meta-value">${label}</p></div>`;
        }
        this.els.structureCollection.innerHTML = collectionHtml || `<div class="mimir-card"><p class="mimir-meta-title">${this.t('collection')}</p><p class="mimir-meta-value">${this.t('not_part_of_collection')}</p></div>`;

        this.els.structureBookmarks.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('bookmarks')}</p><p class="mimir-meta-value">${this.t('bookmarks_hint')}</p></div>`;

        this.bindSidebarActions(parsed, this.els.structureItems);
        this.bindSidebarActions(parsed, this.els.structureOutline);
        this.bindSidebarActions(parsed, this.els.structureCollection);
        this.highlightActiveCollectionMember();
    }

    async loadCollectionMembers(collectionId) {
        if (!collectionId || !this.els.structureCollection) return;
        if (this.collectionCache.has(collectionId)) {
            const cached = this.collectionCache.get(collectionId);
            const html = cached?.html || cached;
            this.els.structureCollection.innerHTML = html;
            this.bindCollectionLinks(this.els.structureCollection);
            this.highlightActiveCollectionMember();
            const cachedItems = this.collectionItemsCache.get(collectionId) || cached?.items;
            if (cachedItems?.length) this.fetchCollectionThumbs(cachedItems, collectionId);
            return;
        }
        this.els.structureCollection.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('collection')}</p><p class="mimir-meta-value">${this.t('loading_collection')}</p></div>`;
        try {
            const res = await fetch(collectionId);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const collection = await res.json();
            const items = Array.isArray(collection.items) ? collection.items : (Array.isArray(collection.members) ? collection.members : []);
            let html = `<div class="mimir-card">
                <p class="mimir-meta-title">${this.t('collection_members')}</p>
                <div class="mimir-list">`;
            items.forEach((item, idx) => {
                const id = item.id || item['@id'];
                const label = (item.label && (typeof item.label === 'string' ? item.label : Object.values(item.label)[0]?.[0])) || `Item ${idx + 1}`;
                const thumbUrl = this.resolveThumb(item.thumbnail);
                const thumbAttr = id ? `data-mimir-thumb-id="${encodeURIComponent(id)}"` : '';
                html += `<button data-mimir-collection-item="${idx}" data-mimir-item-id="${id || ''}" class="mimir-list-btn mimir-list-row">
                    ${thumbUrl ? `<img src="${thumbUrl}" alt="" class="mimir-thumb">` : `<span class="mimir-thumb mimir-thumb-placeholder" ${thumbAttr}></span>`}
                    <span class="mimir-list-label">${label}</span>
                </button>`;
            });
            html += `</div></div>`;
            this.collectionItemsCache.set(collectionId, items);
            this.collectionCache.set(collectionId, { html, items });
            this.els.structureCollection.innerHTML = html;
            this.bindCollectionLinks(this.els.structureCollection);
            this.highlightActiveCollectionMember();
            this.fetchCollectionThumbs(items, collectionId);
        } catch (err) {
            this.els.structureCollection.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">${this.t('collection')}</p><p class="mimir-meta-value">${this.t('failed_collection')}</p></div>`;
        }
    }

    async fetchCollectionThumbs(items, collectionId) {
        if (!items?.length || !this.els.structureCollection) return;
        for (const item of items) {
            const id = item.id || item['@id'];
            if (!id) continue;
            const selector = `.mimir-thumb-placeholder[data-mimir-thumb-id="${encodeURIComponent(id)}"]`;
            const node = this.els.structureCollection.querySelector(selector);
            if (!node) continue;
            try {
                const res = await fetch(id);
                if (!res.ok) continue;
                const manifest = await res.json();
                const thumbUrl = this.extractManifestThumbnail(manifest);
                if (thumbUrl) {
                    node.style.backgroundImage = `url("${thumbUrl}")`;
                    node.classList.remove('mimir-thumb-placeholder');
                }
            } catch {
                // ignore
            }
        }
        if (collectionId && this.collectionCache.has(collectionId)) {
            this.collectionCache.set(collectionId, {
                html: this.els.structureCollection.innerHTML,
                items: this.collectionItemsCache.get(collectionId) || items
            });
        }
    }

    bindCollectionLinks(container) {
        if (!container) return;
        container.querySelectorAll('[data-mimir-item-id]').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-mimir-item-id');
                if (id) this.loadManifest(id);
            };
        });
    }

    highlightActiveCollectionMember() {
        if (!this.els.structureCollection || !this.currentManifest) return;
        const currentId = this.currentManifest.id || this.currentManifest['@id'];
        if (!currentId) return;
        this.els.structureCollection.querySelectorAll('.mimir-list-btn').forEach(btn => {
            const id = btn.getAttribute('data-mimir-item-id');
            btn.classList.toggle('is-active', id === currentId);
        });
    }

    renderAV(manifest, parsed) {
        this.els.av.classList.remove('mimir-hidden'); this.showToolbar(true);
        if (this.els.fulltextLayer) this.els.fulltextLayer.classList.add('mimir-hidden');
        if (this.els.annotationsLayer) this.els.annotationsLayer.classList.add('mimir-hidden');
        this.avItems = parsed?.avItems || [];
        if (this.avItems.length === 0) { this.showMessage(this.t('no_av_items')); return; }
        const current = this.avItems[this.currentAvIndex] || this.avItems[0];
        const mediaUrl = current?.id || current?.url;
        const mediaType = current?.mediaType || 'video';
        if (mediaUrl) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mimir-av-wrapper';

            const el = document.createElement(mediaType);
            el.crossOrigin = 'anonymous';
            el.src = mediaUrl;
            el.className = 'mimir-av-media';
            el.autoplay = true;
            el.controls = false;
            el.muted = false;
            el.volume = 1;
            const zoomValue = Number(this.els.zoomSlider?.value || 1);
            el.style.transform = `scale(${zoomValue})`;

            el.onplay = () => { this.els.iconPlay.classList.add('mimir-hidden'); this.els.iconPause.classList.remove('mimir-hidden'); };
            el.onpause = () => { this.els.iconPlay.classList.remove('mimir-hidden'); this.els.iconPause.classList.add('mimir-hidden'); };
            el.ontimeupdate = () => {
                if (!this.els.avProgress) return;
                this.els.avProgress.value = el.currentTime;
                this.els.avCurrent.innerText = this.formatTime(el.currentTime);
            };
            el.onloadedmetadata = () => {
                this.els.avProgress.max = el.duration;
                this.els.avTotal.innerText = this.formatTime(el.duration);
            };
            wrapper.appendChild(el);

            if (mediaType === 'audio') {
                const eq = document.createElement('div');
                eq.className = 'mimir-eq';
                eq.innerHTML = `
                    <span class="mimir-eq-bar"></span>
                    <span class="mimir-eq-bar"></span>
                    <span class="mimir-eq-bar"></span>
                    <span class="mimir-eq-bar"></span>
                    <span class="mimir-eq-bar"></span>
                `;
                wrapper.appendChild(eq);
                el.addEventListener('play', () => wrapper.classList.add('mimir-eq-playing'));
                el.addEventListener('pause', () => wrapper.classList.remove('mimir-eq-playing'));
                el.addEventListener('ended', () => wrapper.classList.remove('mimir-eq-playing'));
            }

            const isVideo = mediaType === 'video';
            this.els.btns.avEnlarge.classList.toggle('mimir-hidden', !isVideo);
            this.els.btns.zoom.classList.toggle('mimir-hidden', !isVideo);
            this.els.btns.filterToggle.classList.toggle('mimir-hidden', !isVideo);
            if (!isVideo) this.setFilterOpen(false);
            if (!isVideo && this.els.zoomPop) this.els.zoomPop.classList.add('mimir-hidden');
            this.els.btns.avEnlarge.innerHTML = ICONS.diag;

            this.els.av.innerHTML = '';
            this.els.av.appendChild(wrapper);
            this.avPlayer = el;
            this.els.volumeSlider.value = String(this.avPlayer.volume ?? 1);
            this.els.iconVolume.classList.toggle('mimir-hidden', this.avPlayer.muted);
            this.els.iconVolumeOff.classList.toggle('mimir-hidden', !this.avPlayer.muted);
            this.applyFilters();
            this.applyTransforms();
        }
    }

    render3D(manifest, parsed) {
        this.els.threeD.classList.remove('mimir-hidden'); this.showToolbar(true);
        if (this.els.fulltextLayer) this.els.fulltextLayer.classList.add('mimir-hidden');
        if (this.els.annotationsLayer) this.els.annotationsLayer.classList.add('mimir-hidden');
        this.els.btns.zoom.classList.add('mimir-hidden'); this.els.btns.bookToggle.classList.add('mimir-hidden');
        this.els.btns.filterToggle.classList.add('mimir-hidden');
        this.setFilterOpen(false);
        this.destroyThree();
        this.modelItems = parsed?.modelItems || [];
        const cameraItems = parsed?.cameraItems || [];
        if (this.modelItems.length === 0 && cameraItems.length === 0) { this.showMessage("No 3D content found."); return; }
        const modelsToLoad = (this.currentModelIndex >= 0 && this.modelItems[this.currentModelIndex])
            ? [this.modelItems[this.currentModelIndex]]
            : this.modelItems;
        this.els.threeD.innerHTML = `<canvas class="mimir-three-canvas"></canvas>`;
        const canvas = this.els.threeD.querySelector('canvas');
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        const scene = new THREE.Scene();
        const camInfo = cameraItems[0] || null;
        const fov = Number(camInfo?.fieldOfView ?? camInfo?.fov ?? 50);
        const near = Number(camInfo?.near ?? 0.1);
        const far = Number(camInfo?.far ?? 2000);
        const camera = new THREE.PerspectiveCamera(fov, 1, near, far);
        camera.position.set(0, 0, 2.5);
        camera.lookAt(0, 0, 0);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.target.set(0, 0, 0);
        const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.75);
        const ambient = new THREE.AmbientLight(0xffffff, 0.35);
        const dir = new THREE.DirectionalLight(0xffffff, 0.85);
        dir.position.set(2, 4, 3);
        scene.add(hemi, ambient, dir);
        if (this.els.threeLightSlider) this.els.threeLightSlider.value = String(dir.intensity);
        if (this.els.threeAmbientSlider) this.els.threeAmbientSlider.value = String(ambient.intensity);
        if (this.els.threeExposureSlider) this.els.threeExposureSlider.value = String(renderer.toneMappingExposure);
        if (this.els.threeAzimuthSlider) this.els.threeAzimuthSlider.value = '45';
        if (this.els.threeElevationSlider) this.els.threeElevationSlider.value = '35';
        if (this.els.threeAutoRotate) this.els.threeAutoRotate.classList.remove('is-active');
        const loader = new GLTFLoader();
        let loadedCount = 0;
        const totalToLoad = modelsToLoad.length;
        const loadedScenes = [];
        const setBaseView = () => {
            const baseTarget = controls.target.clone();
            let baseDir = camera.position.clone().sub(baseTarget);
            if (baseDir.lengthSq() === 0) baseDir = new THREE.Vector3(0, 0, 1);
            baseDir.normalize();
            const baseDistance = camera.position.distanceTo(baseTarget) || 1;
            this.threeState.baseTarget = baseTarget;
            this.threeState.baseDir = baseDir;
            this.threeState.baseDistance = baseDistance;
        };
        const fitToModels = () => {
            if (!loadedScenes.length) return;
            const box = new THREE.Box3();
            loadedScenes.forEach(obj => box.expandByObject(obj));
            if (box.isEmpty()) return;
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            controls.target.copy(center);
            const maxDim = Math.max(size.x, size.y, size.z);
            const dist = maxDim === 0 ? 2.5 : maxDim * 1.4;
            camera.position.set(center.x, center.y, center.z + dist);
            camera.lookAt(center);
            camera.updateProjectionMatrix();
            setBaseView();
        };
        const updateLightDir = () => {
            const az = Number(this.els.threeAzimuthSlider?.value ?? 45) * (Math.PI / 180);
            const el = Number(this.els.threeElevationSlider?.value ?? 35) * (Math.PI / 180);
            const radius = 5;
            const x = radius * Math.cos(el) * Math.cos(az);
            const y = radius * Math.sin(el);
            const z = radius * Math.cos(el) * Math.sin(az);
            dir.position.set(x, y, z);
        };
        updateLightDir();

        if (modelsToLoad.length) {
            modelsToLoad.forEach((item) => {
                const modelUrl = item?.id || item?.url;
                if (!modelUrl) return;
                loader.load(modelUrl, (gltf) => {
                    if (item?.position) {
                        gltf.scene.position.set(
                            Number(item.position.x) || 0,
                            Number(item.position.y) || 0,
                            Number(item.position.z) || 0
                        );
                    }
                    scene.add(gltf.scene);
                    loadedScenes.push(gltf.scene);
                    loadedCount += 1;
                    if (loadedCount >= totalToLoad) fitToModels();
                }, undefined, (err) => {
                    console.error('Mimir: Failed to load 3D model', err);
                    loadedCount += 1;
                    if (loadedCount >= totalToLoad) fitToModels();
                });
            });
        } else {
            setBaseView();
        }
        const resize = () => {
            const rect = this.els.threeD.getBoundingClientRect();
            const width = Math.max(1, rect.width);
            const height = Math.max(1, rect.height);
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(this.els.threeD);
        resize();
        const animate = () => {
            this.threeState.rafId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        this.threeState = { renderer, scene, camera, controls, resizeObserver: ro, rafId: 0, baseTarget: null, baseDir: null, baseDistance: 1, lights: { dir, ambient, hemi } };
        if (camInfo) {
            controls.target.set(0, 0, 0);
            camera.lookAt(controls.target);
            setBaseView();
        }
        animate();
    }

    renderCollection(manifest, parsed) {
        this.showToolbar(false);
        if (!parsed?.items?.length) {
            this.showMessage(this.t('empty_collection'));
            return;
        }
        this.showMessage(this.t('select_collection_item'));
    }

    bindSidebarActions(parsed, container) {
        if (!container) return;
        container.querySelectorAll('[data-mimir-item]').forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.getAttribute('data-mimir-item'));
                const item = parsed?.items?.[idx];
                if (item?.id) this.loadManifest(item.id);
            };
        });
        container.querySelectorAll('[data-mimir-canvas]').forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.getAttribute('data-mimir-canvas'));
                if (this.osdExplorer) this.osdExplorer.goToPage(idx);
                this.highlightActiveCanvas(idx, true);
            };
        });
        container.querySelectorAll('[data-mimir-av]').forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.getAttribute('data-mimir-av'));
                this.currentAvIndex = idx;
                this.renderAV(this.currentManifest, this.currentParsed);
            };
        });
        container.querySelectorAll('[data-mimir-model]').forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.getAttribute('data-mimir-model'));
                this.currentModelIndex = Number.isInteger(idx) ? idx : 0;
                this.render3D(this.currentManifest, this.currentParsed);
            };
        });
        container.querySelectorAll('[data-mimir-range]').forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.getAttribute('data-mimir-range'));
                const range = parsed?.rangesFlat?.[idx] || parsed?.ranges?.[idx];
                const firstCanvasId = range?.items?.[0];
                const canvasIdx = firstCanvasId && parsed?.canvasIndexById?.[firstCanvasId];
                if (this.osdExplorer && Number.isInteger(canvasIdx)) {
                    this.osdExplorer.goToPage(canvasIdx);
                }
            };
        });
        container.querySelectorAll('[data-mimir-outline-toggle]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const node = btn.closest('[data-mimir-outline-node]');
                if (!node) return;
                const expanded = node.classList.toggle('mimir-outline-open');
                btn.textContent = expanded ? '−' : '+';
            };
        });
    }

    t(key) {
        const dict = {
            en: {
                language: 'Language',
                viewer_language: 'Viewer Language',
                manifest_language: 'Manifest Language',
                auto_browser: 'Auto (Browser)',
                auto: 'Auto',
                none: 'None',
                untitled: 'Untitled Manifest',
                ready: 'Ready to Explore',
                load_manifest: 'Load a IIIF manifest to get started.',
                loading_manifest: 'Loading manifest...',
                structure: 'Structure',
                info: 'Info',
                items: 'Items',
                outline: 'Outline',
                collection: 'Collection',
                bookmarks: 'Bookmarks',
                metadata: 'Metadata',
                fulltext: 'Fulltext',
                annotations: 'Annotations',
                close_sidebar: 'Close Sidebar',
                close_info: 'Close Info',
                open_structure: 'Open Structure',
                open_info: 'Open Info',
                download_image: 'Download Image',
                toggle_dark: 'Toggle Dark Mode',
                toggle_fullscreen: 'Toggle Fullscreen',
                provider: 'Provider',
                attribution: 'Attribution',
                rights: 'Rights',
                title: 'Title',
                summary: 'Summary',
                back_to_start: 'Back to Start',
                add_bookmark: 'Add Bookmark',
                zoom: 'Zoom',
                filters: 'Filters',
                three_d_controls: '3D Controls',
                play_pause: 'Play/Pause',
                back_30: 'Back 30s',
                forward_30: 'Forward 30s',
                prev_page: 'Previous Page',
                next_page: 'Next Page',
                toggle_continuous: 'Toggle Continuous Mode',
                toggle_book: 'Toggle Book Mode',
                volume: 'Volume',
                mute: 'Mute',
                enlarge_video: 'Enlarge Video',
                rotate_ccw: 'Rotate 90 CCW',
                rotate_cw: 'Rotate 90 CW',
                flip_h: 'Flip Horizontally',
                flip_v: 'Flip Vertically',
                greyscale: 'Greyscale',
                brightness: 'Brightness',
                contrast: 'Contrast',
                red_channel: 'Red Channel',
                green_channel: 'Green Channel',
                blue_channel: 'Blue Channel',
                auto_rotate: 'Auto rotate',
                light_intensity: 'Light Intensity',
                ambient_light: 'Ambient Light',
                exposure: 'Exposure',
                light_azimuth: 'Light Azimuth',
                light_elevation: 'Light Elevation',
                show_all: 'Show all',
                show_selected: 'Show selected',
                flow: 'Flow',
                lines: 'Lines',
                no_metadata: 'No metadata available.',
                no_fulltext: 'No fulltext available.',
                no_fulltext_left: 'No fulltext for left page.',
                no_fulltext_right: 'No fulltext for right page.',
                no_annotations: 'No annotations available.',
                no_text: 'No text',
                no_items: 'No items available.',
                toc: 'Table of Content',
                no_toc: 'No table of content available.',
                collection_items: 'Collection Items',
                collection_members: 'Collection Members',
                not_part_of_collection: 'Not part of a collection.',
                bookmarks_hint: 'Bookmarks will appear here.',
                no_bookmarks: 'No bookmarks saved.',
                no_image_services: 'No image services found.',
                no_av_items: 'No audio/video items found.',
                segments: 'Segments',
                models: 'Models',
                all_models: 'All models',
                loading_collection: 'Loading collection…',
                failed_collection: 'Failed to load collection.',
                loading_fulltext: 'Loading fulltext…',
                unsupported: 'Unsupported content type.',
                empty_collection: 'Collection is empty or has no items.',
                select_collection_item: 'Select an item from the sidebar to explore.'
            },
            de: {
                language: 'Sprache',
                viewer_language: 'Viewer-Sprache',
                manifest_language: 'Manifest-Sprache',
                auto_browser: 'Auto (Browser)',
                auto: 'Auto',
                none: 'Ohne',
                untitled: 'Unbenanntes Manifest',
                ready: 'Bereit zum Erkunden',
                load_manifest: 'Lade ein IIIF-Manifest, um zu starten.',
                loading_manifest: 'Manifest wird geladen...',
                structure: 'Struktur',
                info: 'Info',
                items: 'Seiten',
                outline: 'Inhalt',
                collection: 'Sammlung',
                bookmarks: 'Lesezeichen',
                metadata: 'Metadaten',
                fulltext: 'Volltext',
                annotations: 'Annotationen',
                close_sidebar: 'Seitenleiste schließen',
                close_info: 'Info schließen',
                open_structure: 'Struktur öffnen',
                open_info: 'Info öffnen',
                download_image: 'Bild herunterladen',
                toggle_dark: 'Dark Mode umschalten',
                toggle_fullscreen: 'Vollbild umschalten',
                provider: 'Anbieter',
                attribution: 'Attribution',
                rights: 'Rechte',
                title: 'Titel',
                summary: 'Zusammenfassung',
                back_to_start: 'Zum Anfang',
                add_bookmark: 'Lesezeichen hinzufügen',
                zoom: 'Zoom',
                filters: 'Filter',
                three_d_controls: '3D-Steuerung',
                play_pause: 'Abspielen/Pause',
                back_30: '30s zurück',
                forward_30: '30s vor',
                prev_page: 'Vorherige Seite',
                next_page: 'Nächste Seite',
                toggle_continuous: 'Fortlaufend umschalten',
                toggle_book: 'Buchmodus umschalten',
                volume: 'Lautstärke',
                mute: 'Stumm',
                enlarge_video: 'Video vergrößern',
                rotate_ccw: '90° links drehen',
                rotate_cw: '90° rechts drehen',
                flip_h: 'Horizontal spiegeln',
                flip_v: 'Vertikal spiegeln',
                greyscale: 'Graustufen',
                brightness: 'Helligkeit',
                contrast: 'Kontrast',
                red_channel: 'Rot-Kanal',
                green_channel: 'Grün-Kanal',
                blue_channel: 'Blau-Kanal',
                auto_rotate: 'Auto drehen',
                light_intensity: 'Lichtstärke',
                ambient_light: 'Umgebungslicht',
                exposure: 'Belichtung',
                light_azimuth: 'Licht-Azimut',
                light_elevation: 'Licht-Höhe',
                show_all: 'Alle zeigen',
                show_selected: 'Auswahl zeigen',
                flow: 'Fließtext',
                lines: 'Zeilen',
                no_metadata: 'Keine Metadaten verfügbar.',
                no_fulltext: 'Kein Volltext verfügbar.',
                no_fulltext_left: 'Kein Volltext für linke Seite.',
                no_fulltext_right: 'Kein Volltext für rechte Seite.',
                no_annotations: 'Keine Annotationen verfügbar.',
                no_text: 'Kein Text',
                no_items: 'Keine Seiten verfügbar.',
                toc: 'Inhaltsverzeichnis',
                no_toc: 'Kein Inhaltsverzeichnis verfügbar.',
                collection_items: 'Sammlungsobjekte',
                collection_members: 'Sammlungsmitglieder',
                not_part_of_collection: 'Nicht Teil einer Sammlung.',
                bookmarks_hint: 'Lesezeichen erscheinen hier.',
                no_bookmarks: 'Keine Lesezeichen gespeichert.',
                no_image_services: 'Keine Bilddienste gefunden.',
                no_av_items: 'Keine Audio/Video-Elemente gefunden.',
                segments: 'Segmente',
                models: 'Modelle',
                all_models: 'Alle Modelle',
                loading_collection: 'Sammlung wird geladen…',
                failed_collection: 'Sammlung konnte nicht geladen werden.',
                loading_fulltext: 'Volltext wird geladen…',
                unsupported: 'Inhaltstyp nicht unterstützt.',
                empty_collection: 'Sammlung ist leer oder hat keine Elemente.',
                select_collection_item: 'Wähle ein Objekt aus der Seitenleiste.'
            },
            fr: {
                language: 'Langue',
                viewer_language: 'Langue du viewer',
                manifest_language: 'Langue du manifeste',
                auto_browser: 'Auto (navigateur)',
                auto: 'Auto',
                none: 'Aucune',
                untitled: 'Manifest sans titre',
                ready: 'Prêt à explorer',
                load_manifest: 'Chargez un manifeste IIIF pour commencer.',
                loading_manifest: 'Chargement du manifeste...',
                structure: 'Structure',
                info: 'Info',
                items: 'Pages',
                outline: 'Plan',
                collection: 'Collection',
                bookmarks: 'Signets',
                metadata: 'Métadonnées',
                fulltext: 'Texte intégral',
                annotations: 'Annotations',
                close_sidebar: 'Fermer la barre latérale',
                close_info: 'Fermer les infos',
                open_structure: 'Ouvrir la structure',
                open_info: 'Ouvrir les infos',
                download_image: 'Télécharger l’image',
                toggle_dark: 'Basculer en mode sombre',
                toggle_fullscreen: 'Basculer en plein écran',
                provider: 'Fournisseur',
                attribution: 'Attribution',
                rights: 'Droits',
                title: 'Titre',
                summary: 'Résumé',
                back_to_start: 'Retour au début',
                add_bookmark: 'Ajouter un signet',
                zoom: 'Zoom',
                filters: 'Filtres',
                three_d_controls: 'Contrôles 3D',
                play_pause: 'Lecture/Pause',
                back_30: 'Retour 30 s',
                forward_30: 'Avance 30 s',
                prev_page: 'Page précédente',
                next_page: 'Page suivante',
                toggle_continuous: 'Basculer en continu',
                toggle_book: 'Basculer mode livre',
                volume: 'Volume',
                mute: 'Muet',
                enlarge_video: 'Agrandir la vidéo',
                rotate_ccw: 'Tourner 90° à gauche',
                rotate_cw: 'Tourner 90° à droite',
                flip_h: 'Retourner horizontalement',
                flip_v: 'Retourner verticalement',
                greyscale: 'Niveaux de gris',
                brightness: 'Luminosité',
                contrast: 'Contraste',
                red_channel: 'Canal rouge',
                green_channel: 'Canal vert',
                blue_channel: 'Canal bleu',
                auto_rotate: 'Rotation auto',
                light_intensity: 'Intensité lumineuse',
                ambient_light: 'Lumière ambiante',
                exposure: 'Exposition',
                light_azimuth: 'Azimut de la lumière',
                light_elevation: 'Élévation de la lumière',
                show_all: 'Tout afficher',
                show_selected: 'Afficher la sélection',
                flow: 'Texte continu',
                lines: 'Lignes',
                no_metadata: 'Aucune métadonnée disponible.',
                no_fulltext: 'Aucun texte intégral disponible.',
                no_fulltext_left: 'Pas de texte pour la page gauche.',
                no_fulltext_right: 'Pas de texte pour la page droite.',
                no_annotations: 'Aucune annotation disponible.',
                no_text: 'Aucun texte',
                no_items: 'Aucune page disponible.',
                toc: 'Table des matières',
                no_toc: 'Aucune table des matières disponible.',
                collection_items: 'Objets de la collection',
                collection_members: 'Membres de la collection',
                not_part_of_collection: 'Pas dans une collection.',
                bookmarks_hint: 'Les signets apparaîtront ici.',
                no_bookmarks: 'Aucun signet enregistré.',
                no_image_services: 'Aucun service d’images trouvé.',
                no_av_items: 'Aucun élément audio/vidéo trouvé.',
                segments: 'Segments',
                models: 'Modèles',
                all_models: 'Tous les modèles',
                loading_collection: 'Chargement de la collection…',
                failed_collection: 'Échec du chargement de la collection.',
                loading_fulltext: 'Chargement du texte intégral…',
                unsupported: 'Type de contenu non pris en charge.',
                empty_collection: 'La collection est vide ou sans éléments.',
                select_collection_item: 'Sélectionnez un élément dans la barre latérale.'
            },
            it: {
                language: 'Lingua',
                viewer_language: 'Lingua del viewer',
                manifest_language: 'Lingua del manifesto',
                auto_browser: 'Auto (browser)',
                auto: 'Auto',
                none: 'Nessuna',
                untitled: 'Manifest senza titolo',
                ready: 'Pronto per esplorare',
                load_manifest: 'Carica un manifesto IIIF per iniziare.',
                loading_manifest: 'Caricamento manifesto...',
                structure: 'Struttura',
                info: 'Info',
                items: 'Pagine',
                outline: 'Indice',
                collection: 'Collezione',
                bookmarks: 'Segnalibri',
                metadata: 'Metadati',
                fulltext: 'Testo completo',
                annotations: 'Annotazioni',
                close_sidebar: 'Chiudi barra laterale',
                close_info: 'Chiudi info',
                open_structure: 'Apri struttura',
                open_info: 'Apri info',
                download_image: 'Scarica immagine',
                toggle_dark: 'Attiva/disattiva tema scuro',
                toggle_fullscreen: 'Attiva/disattiva schermo intero',
                provider: 'Fornitore',
                attribution: 'Attribuzione',
                rights: 'Diritti',
                title: 'Titolo',
                summary: 'Sommario',
                back_to_start: 'Torna all’inizio',
                add_bookmark: 'Aggiungi segnalibro',
                zoom: 'Zoom',
                filters: 'Filtri',
                three_d_controls: 'Controlli 3D',
                play_pause: 'Play/Pausa',
                back_30: 'Indietro 30 s',
                forward_30: 'Avanti 30 s',
                prev_page: 'Pagina precedente',
                next_page: 'Pagina successiva',
                toggle_continuous: 'Attiva/disattiva continuo',
                toggle_book: 'Attiva/disattiva modalità libro',
                volume: 'Volume',
                mute: 'Muto',
                enlarge_video: 'Ingrandisci video',
                rotate_ccw: 'Ruota 90° a sinistra',
                rotate_cw: 'Ruota 90° a destra',
                flip_h: 'Ribalta orizzontalmente',
                flip_v: 'Ribalta verticalmente',
                greyscale: 'Scala di grigi',
                brightness: 'Luminosità',
                contrast: 'Contrasto',
                red_channel: 'Canale rosso',
                green_channel: 'Canale verde',
                blue_channel: 'Canale blu',
                auto_rotate: 'Rotazione automatica',
                light_intensity: 'Intensità luce',
                ambient_light: 'Luce ambientale',
                exposure: 'Esposizione',
                light_azimuth: 'Azimut luce',
                light_elevation: 'Elevazione luce',
                show_all: 'Mostra tutto',
                show_selected: 'Mostra selezionati',
                flow: 'Testo continuo',
                lines: 'Righe',
                no_metadata: 'Nessun metadato disponibile.',
                no_fulltext: 'Nessun testo completo disponibile.',
                no_fulltext_left: 'Nessun testo per la pagina sinistra.',
                no_fulltext_right: 'Nessun testo per la pagina destra.',
                no_annotations: 'Nessuna annotazione disponibile.',
                no_text: 'Nessun testo',
                no_items: 'Nessuna pagina disponibile.',
                toc: 'Indice',
                no_toc: 'Nessun indice disponibile.',
                collection_items: 'Elementi della collezione',
                collection_members: 'Membri della collezione',
                not_part_of_collection: 'Non parte di una collezione.',
                bookmarks_hint: 'I segnalibri appariranno qui.',
                no_bookmarks: 'Nessun segnalibro salvato.',
                no_image_services: 'Nessun servizio immagini trovato.',
                no_av_items: 'Nessun elemento audio/video trovato.',
                segments: 'Segmenti',
                models: 'Modelli',
                all_models: 'Tutti i modelli',
                loading_collection: 'Caricamento collezione…',
                failed_collection: 'Caricamento collezione non riuscito.',
                loading_fulltext: 'Caricamento testo completo…',
                unsupported: 'Tipo di contenuto non supportato.',
                empty_collection: 'La collezione è vuota o senza elementi.',
                select_collection_item: 'Seleziona un elemento dalla barra laterale.'
            },
            es: {
                language: 'Idioma',
                viewer_language: 'Idioma del visor',
                manifest_language: 'Idioma del manifiesto',
                auto_browser: 'Auto (navegador)',
                auto: 'Auto',
                none: 'Ninguno',
                untitled: 'Manifiesto sin título',
                ready: 'Listo para explorar',
                load_manifest: 'Carga un manifiesto IIIF para comenzar.',
                loading_manifest: 'Cargando manifiesto...',
                structure: 'Estructura',
                info: 'Info',
                items: 'Páginas',
                outline: 'Índice',
                collection: 'Colección',
                bookmarks: 'Marcadores',
                metadata: 'Metadatos',
                fulltext: 'Texto completo',
                annotations: 'Anotaciones',
                close_sidebar: 'Cerrar barra lateral',
                close_info: 'Cerrar info',
                open_structure: 'Abrir estructura',
                open_info: 'Abrir info',
                download_image: 'Descargar imagen',
                toggle_dark: 'Cambiar modo oscuro',
                toggle_fullscreen: 'Cambiar pantalla completa',
                provider: 'Proveedor',
                attribution: 'Atribución',
                rights: 'Derechos',
                title: 'Título',
                summary: 'Resumen',
                back_to_start: 'Volver al inicio',
                add_bookmark: 'Añadir marcador',
                zoom: 'Zoom',
                filters: 'Filtros',
                three_d_controls: 'Controles 3D',
                play_pause: 'Reproducir/Pausa',
                back_30: 'Atrás 30 s',
                forward_30: 'Adelante 30 s',
                prev_page: 'Página anterior',
                next_page: 'Página siguiente',
                toggle_continuous: 'Alternar continuo',
                toggle_book: 'Alternar modo libro',
                volume: 'Volumen',
                mute: 'Silencio',
                enlarge_video: 'Agrandar vídeo',
                rotate_ccw: 'Girar 90° a la izquierda',
                rotate_cw: 'Girar 90° a la derecha',
                flip_h: 'Voltear horizontalmente',
                flip_v: 'Voltear verticalmente',
                greyscale: 'Escala de grises',
                brightness: 'Brillo',
                contrast: 'Contraste',
                red_channel: 'Canal rojo',
                green_channel: 'Canal verde',
                blue_channel: 'Canal azul',
                auto_rotate: 'Rotación automática',
                light_intensity: 'Intensidad de luz',
                ambient_light: 'Luz ambiental',
                exposure: 'Exposición',
                light_azimuth: 'Azimut de la luz',
                light_elevation: 'Elevación de la luz',
                show_all: 'Mostrar todo',
                show_selected: 'Mostrar selección',
                flow: 'Texto continuo',
                lines: 'Líneas',
                no_metadata: 'No hay metadatos disponibles.',
                no_fulltext: 'No hay texto completo disponible.',
                no_fulltext_left: 'Sin texto para la página izquierda.',
                no_fulltext_right: 'Sin texto para la página derecha.',
                no_annotations: 'No hay anotaciones disponibles.',
                no_text: 'Sin texto',
                no_items: 'No hay páginas disponibles.',
                toc: 'Tabla de contenidos',
                no_toc: 'No hay tabla de contenidos disponible.',
                collection_items: 'Elementos de la colección',
                collection_members: 'Miembros de la colección',
                not_part_of_collection: 'No forma parte de una colección.',
                bookmarks_hint: 'Los marcadores aparecerán aquí.',
                no_bookmarks: 'No hay marcadores guardados.',
                no_image_services: 'No se encontraron servicios de imagen.',
                no_av_items: 'No se encontraron elementos de audio/vídeo.',
                segments: 'Segmentos',
                models: 'Modelos',
                all_models: 'Todos los modelos',
                loading_collection: 'Cargando colección…',
                failed_collection: 'No se pudo cargar la colección.',
                loading_fulltext: 'Cargando texto completo…',
                unsupported: 'Tipo de contenido no compatible.',
                empty_collection: 'La colección está vacía o sin elementos.',
                select_collection_item: 'Selecciona un elemento en la barra lateral.'
            },
            nl: {
                language: 'Taal',
                viewer_language: 'Viewer-taal',
                manifest_language: 'Manifest-taal',
                auto_browser: 'Auto (browser)',
                auto: 'Auto',
                none: 'Geen',
                untitled: 'Manifest zonder titel',
                ready: 'Klaar om te verkennen',
                load_manifest: 'Laad een IIIF-manifest om te beginnen.',
                loading_manifest: 'Manifest laden...',
                structure: 'Structuur',
                info: 'Info',
                items: 'Pagina’s',
                outline: 'Inhoud',
                collection: 'Collectie',
                bookmarks: 'Bladwijzers',
                metadata: 'Metadata',
                fulltext: 'Volledige tekst',
                annotations: 'Annotaties',
                close_sidebar: 'Zijbalk sluiten',
                close_info: 'Info sluiten',
                open_structure: 'Structuur openen',
                open_info: 'Info openen',
                download_image: 'Afbeelding downloaden',
                toggle_dark: 'Donkere modus wisselen',
                toggle_fullscreen: 'Volledig scherm wisselen',
                provider: 'Provider',
                attribution: 'Attributie',
                rights: 'Rechten',
                title: 'Titel',
                summary: 'Samenvatting',
                back_to_start: 'Terug naar start',
                add_bookmark: 'Bladwijzer toevoegen',
                zoom: 'Zoom',
                filters: 'Filters',
                three_d_controls: '3D-bediening',
                play_pause: 'Afspelen/Pauze',
                back_30: '30 s terug',
                forward_30: '30 s vooruit',
                prev_page: 'Vorige pagina',
                next_page: 'Volgende pagina',
                toggle_continuous: 'Doorlopend wisselen',
                toggle_book: 'Boekmodus wisselen',
                volume: 'Volume',
                mute: 'Dempen',
                enlarge_video: 'Video vergroten',
                rotate_ccw: '90° links draaien',
                rotate_cw: '90° rechts draaien',
                flip_h: 'Horizontaal spiegelen',
                flip_v: 'Verticaal spiegelen',
                greyscale: 'Grijstinten',
                brightness: 'Helderheid',
                contrast: 'Contrast',
                red_channel: 'Rood kanaal',
                green_channel: 'Groen kanaal',
                blue_channel: 'Blauw kanaal',
                auto_rotate: 'Automatisch draaien',
                light_intensity: 'Lichtintensiteit',
                ambient_light: 'Omgevingslicht',
                exposure: 'Belichting',
                light_azimuth: 'Licht-azimut',
                light_elevation: 'Licht-elevatie',
                show_all: 'Alles tonen',
                show_selected: 'Selectie tonen',
                flow: 'Doorlopende tekst',
                lines: 'Regels',
                no_metadata: 'Geen metadata beschikbaar.',
                no_fulltext: 'Geen volledige tekst beschikbaar.',
                no_fulltext_left: 'Geen tekst voor de linkerpagina.',
                no_fulltext_right: 'Geen tekst voor de rechterpagina.',
                no_annotations: 'Geen annotaties beschikbaar.',
                no_text: 'Geen tekst',
                no_items: 'Geen pagina’s beschikbaar.',
                toc: 'Inhoudsopgave',
                no_toc: 'Geen inhoudsopgave beschikbaar.',
                collection_items: 'Collectie-items',
                collection_members: 'Collectieleden',
                not_part_of_collection: 'Geen onderdeel van een collectie.',
                bookmarks_hint: 'Bladwijzers verschijnen hier.',
                no_bookmarks: 'Geen bladwijzers opgeslagen.',
                no_image_services: 'Geen afbeeldingsdiensten gevonden.',
                no_av_items: 'Geen audio-/video-items gevonden.',
                segments: 'Segmenten',
                models: 'Modellen',
                all_models: 'Alle modellen',
                loading_collection: 'Collectie laden…',
                failed_collection: 'Collectie laden mislukt.',
                loading_fulltext: 'Volledige tekst laden…',
                unsupported: 'Inhoudstype niet ondersteund.',
                empty_collection: 'Collectie is leeg of heeft geen items.',
                select_collection_item: 'Selecteer een item in de zijbalk.'
            }
        };
        const lang = this.viewerLanguage && dict[this.viewerLanguage] ? this.viewerLanguage : 'en';
        return dict[lang]?.[key] || dict.en[key] || key;
    }

    getBrowserLanguage() {
        if (typeof navigator === 'undefined') return 'en';
        const lang = navigator.language || (Array.isArray(navigator.languages) ? navigator.languages[0] : 'en');
        return this.normalizeLang(lang);
    }

    normalizeLang(lang) {
        if (!lang) return '';
        return String(lang).toLowerCase().split('-')[0];
    }

    resolveViewerLanguage() {
        const saved = this.getCookie('mimir_viewer_lang');
        if (saved) {
            this.viewerLanguageMode = 'manual';
            return this.normalizeLang(saved);
        }
        this.viewerLanguageMode = 'auto';
        const browser = this.normalizeLang(this.browserLanguage);
        if (this.supportedViewerLanguages.includes(browser)) return browser;
        if (this.supportedViewerLanguages.includes('en')) return 'en';
        return this.supportedViewerLanguages[0] || 'en';
    }

    collectManifestLanguages(obj) {
        const langs = new Set();
        const isLangMap = (val) => {
            if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
            const keys = Object.keys(val);
            if (!keys.length) return false;
            const blocked = new Set(['id', 'type', '@id', '@type', '@context']);
            let match = 0;
            let total = 0;
            keys.forEach(k => {
                const v = val[k];
                const looksLike = !blocked.has(k) && (k === 'none' || /^[a-z]{2,3}(-[a-z0-9]+)?$/i.test(k));
                const hasValue = Array.isArray(v) || typeof v === 'string';
                if (looksLike && hasValue) match += 1;
                total += 1;
            });
            return match > 0 && match === total;
        };
        const walk = (node) => {
            if (!node) return;
            if (Array.isArray(node)) {
                node.forEach(walk);
                return;
            }
            if (typeof node === 'object') {
                if (isLangMap(node)) {
                    Object.keys(node).forEach(k => langs.add(this.normalizeLang(k) || k));
                    return;
                }
                Object.values(node).forEach(walk);
            }
        };
        walk(obj);
        return Array.from(langs).filter(Boolean);
    }

    pickManifestLanguage(langs) {
        const available = langs.map(l => this.normalizeLang(l) || l);
        if (!available.length) return '';
        const desired = this.manifestLanguage && this.manifestLanguage !== 'auto'
            ? this.normalizeLang(this.manifestLanguage)
            : '';
        if (desired && available.includes(desired)) return desired;
        const viewer = this.normalizeLang(this.viewerLanguage);
        if (viewer && available.includes(viewer)) return viewer;
        const browser = this.normalizeLang(this.browserLanguage);
        if (browser && available.includes(browser)) return browser;
        if (available.includes('none')) return 'none';
        if (available.includes('en')) return 'en';
        return available[0];
    }

    resolveLangValue(value, fallback = '') {
        if (value == null) return fallback;
        if (typeof value === 'string') return value;
        if (Array.isArray(value)) {
            return this.resolveLangValue(value[0], fallback);
        }
        if (typeof value === 'object') {
            const keys = Object.keys(value);
            const isLangMap = keys.some(k => k === 'none' || /^[a-z]{2,3}(-[a-z0-9]+)?$/i.test(k));
            if (isLangMap) {
                const pref = [
                    this.activeManifestLanguage,
                    this.normalizeLang(this.viewerLanguage),
                    this.normalizeLang(this.browserLanguage),
                    'none',
                    'en'
                ].filter(Boolean);
                const keys = Object.keys(value);
                const pick = (lang) => value[lang] ?? value[keys.find(k => this.normalizeLang(k) === lang)];
                for (const lang of pref) {
                    const v = pick(lang);
                    if (v != null) return this.resolveLangValue(v, fallback);
                }
                const first = value[keys[0]];
                return this.resolveLangValue(first, fallback);
            }
            const firstVal = value[keys[0]];
            return this.resolveLangValue(firstVal, fallback);
        }
        return fallback;
    }

    getLanguageDisplayName(code) {
        if (!code) return '';
        if (code === 'none') return this.t('none');
        try {
            const dn = new Intl.DisplayNames([this.viewerLanguage || 'en'], { type: 'language' });
            return dn.of(code) || code;
        } catch {
            return code;
        }
    }

    updateLanguageMenu() {
        if (!this.els.viewerLangSelect || !this.els.manifestLangSelect) return;
        const manifestLangs = this.currentParsed?.manifestLanguages || [];
        const viewerLangs = Array.from(new Set(this.supportedViewerLanguages));
        if (this.viewerLanguage && !viewerLangs.includes(this.viewerLanguage)) viewerLangs.push(this.viewerLanguage);
        const browser = this.normalizeLang(this.browserLanguage);
        const viewerVal = this.viewerLanguageMode === 'manual' ? this.viewerLanguage : 'auto';
        const manifestVal = this.manifestLanguage || 'auto';
        const viewerOptions = [
            `<option value="auto">${this.t('auto_browser')}${browser ? `: ${this.getLanguageDisplayName(browser)}` : ''}</option>`,
            ...viewerLangs.map(l => `<option value="${l}">${this.getLanguageDisplayName(l)} (${l})</option>`)
        ].join('');
        const manifestOptions = [
            `<option value="auto">${this.t('auto')}</option>`,
            ...manifestLangs.map(l => `<option value="${l}">${this.getLanguageDisplayName(l)} (${l})</option>`)
        ].join('');
        this.els.viewerLangSelect.innerHTML = viewerOptions;
        this.els.manifestLangSelect.innerHTML = manifestOptions;
        this.els.viewerLangSelect.value = viewerVal;
        this.els.manifestLangSelect.value = manifestVal;
    }

    updateStaticLabels() {
        if (this.els.sidebar) {
            const header = this.els.sidebar.querySelector('.mimir-sidebar-header .mimir-eyebrow');
            if (header) header.textContent = this.t('structure');
            const tabItems = this.els.sidebar.querySelector('[data-tab="items"]');
            const tabOutline = this.els.sidebar.querySelector('[data-tab="outline"]');
            const tabCollection = this.els.sidebar.querySelector('[data-tab="collection"]');
            const tabBookmarks = this.els.sidebar.querySelector('[data-tab="bookmarks"]');
            if (tabItems) tabItems.setAttribute('data-tooltip', this.t('items'));
            if (tabOutline) tabOutline.setAttribute('data-tooltip', this.t('outline'));
            if (tabCollection) tabCollection.setAttribute('data-tooltip', this.t('collection'));
            if (tabBookmarks) tabBookmarks.setAttribute('data-tooltip', this.t('bookmarks'));
            if (this.els.sidebarClose) this.els.sidebarClose.title = this.t('close_sidebar');
        }
        if (this.els.info) {
            const header = this.els.info.querySelector('.mimir-sidebar-header .mimir-eyebrow');
            if (header) header.textContent = this.t('info');
            const tabMeta = this.els.info.querySelector('[data-tab="metadata"]');
            const tabFulltext = this.els.info.querySelector('[data-tab="fulltext"]');
            const tabAnno = this.els.info.querySelector('[data-tab="annotations"]');
            if (tabMeta) tabMeta.setAttribute('data-tooltip', this.t('metadata'));
            if (tabFulltext) tabFulltext.setAttribute('data-tooltip', this.t('fulltext'));
            if (tabAnno) tabAnno.setAttribute('data-tooltip', this.t('annotations'));
            if (this.els.infoClose) this.els.infoClose.title = this.t('close_info');
        }
        if (this.els.fulltextToggle) {
            this.els.fulltextToggle.textContent = this.fulltextMode === 'lines' ? this.t('flow') : this.t('lines');
        }
        if (this.els.annotationsToggle) {
            const isAll = this.annotationMode === 'all';
            this.els.annotationsToggle.textContent = isAll ? this.t('show_selected') : this.t('show_all');
        }
        if (this.els.threeAutoRotate) {
            this.els.threeAutoRotate.textContent = this.t('auto_rotate');
        }
        if (this.els.btns.sidebarToggle) this.els.btns.sidebarToggle.title = this.t('open_structure');
        if (this.els.btns.infoToggle) this.els.btns.infoToggle.title = this.t('open_info');
        if (this.els.btns.home) this.els.btns.home.title = this.t('back_to_start');
        if (this.els.btns.bookmarkAdd) this.els.btns.bookmarkAdd.title = this.t('add_bookmark');
        if (this.els.btns.zoom) this.els.btns.zoom.title = this.t('zoom');
        if (this.els.btns.threeToggle) this.els.btns.threeToggle.title = this.t('three_d_controls');
        if (this.els.btns.filterToggle) this.els.btns.filterToggle.title = this.t('filters');
        if (this.els.btns.rotateCcw) this.els.btns.rotateCcw.title = this.t('rotate_ccw');
        if (this.els.btns.rotateCw) this.els.btns.rotateCw.title = this.t('rotate_cw');
        if (this.els.btns.flipH) this.els.btns.flipH.title = this.t('flip_h');
        if (this.els.btns.flipV) this.els.btns.flipV.title = this.t('flip_v');
        if (this.els.btns.filterGreyscale) this.els.btns.filterGreyscale.title = this.t('greyscale');
        if (this.els.btns.filterBrightness) this.els.btns.filterBrightness.title = this.t('brightness');
        if (this.els.btns.filterContrast) this.els.btns.filterContrast.title = this.t('contrast');
        if (this.els.btns.filterRed) this.els.btns.filterRed.title = this.t('red_channel');
        if (this.els.btns.filterGreen) this.els.btns.filterGreen.title = this.t('green_channel');
        if (this.els.btns.filterBlue) this.els.btns.filterBlue.title = this.t('blue_channel');
        const threeLight = this.container.querySelector('#mimir-3d-light');
        const threeAmbient = this.container.querySelector('#mimir-3d-ambient');
        const threeExposure = this.container.querySelector('#mimir-3d-exposure');
        const threeAz = this.container.querySelector('#mimir-3d-azimuth');
        const threeEl = this.container.querySelector('#mimir-3d-elevation');
        if (threeLight) threeLight.title = this.t('light_intensity');
        if (threeAmbient) threeAmbient.title = this.t('ambient_light');
        if (threeExposure) threeExposure.title = this.t('exposure');
        if (threeAz) threeAz.title = this.t('light_azimuth');
        if (threeEl) threeEl.title = this.t('light_elevation');
        if (this.els.btns.prev) this.els.btns.prev.title = this.t('prev_page');
        if (this.els.btns.next) this.els.btns.next.title = this.t('next_page');
        if (this.els.btns.continuousToggle) this.els.btns.continuousToggle.title = this.t('toggle_continuous');
        if (this.els.btns.bookToggle) this.els.btns.bookToggle.title = this.t('toggle_book');
        if (this.els.btns.download) this.els.btns.download.title = this.t('download_image');
        if (this.els.btns.topDarkToggle) this.els.btns.topDarkToggle.title = this.t('toggle_dark');
        if (this.els.btns.topFullscreen) this.els.btns.topFullscreen.title = this.t('toggle_fullscreen');
        if (this.els.btns.fullscreen) this.els.btns.fullscreen.title = this.t('toggle_fullscreen');
        if (this.els.btns.darkToggle) this.els.btns.darkToggle.title = this.t('toggle_dark');
        if (this.els.btns.volumeToggle) this.els.btns.volumeToggle.title = this.t('volume');
        if (this.els.btns.muteToggle) this.els.btns.muteToggle.title = this.t('mute');
        if (this.els.btns.avEnlarge) this.els.btns.avEnlarge.title = this.t('enlarge_video');
        if (this.els.btns.playToggle) this.els.btns.playToggle.title = this.t('play_pause');
        if (this.els.btns.back30) this.els.btns.back30.title = this.t('back_30');
        if (this.els.btns.forward30) this.els.btns.forward30.title = this.t('forward_30');
        if (this.els.langToggle) this.els.langToggle.title = this.t('language');
        if (this.els.langPop) {
            const titles = this.els.langPop.querySelectorAll('.mimir-lang-section .mimir-meta-title');
            if (titles[0]) titles[0].textContent = this.t('viewer_language');
            if (titles[1]) titles[1].textContent = this.t('manifest_language');
        }
        if (this.els.messageText) this.els.messageText.textContent = this.t('ready');
        const emptySub = this.els.message?.querySelector('.mimir-empty-sub');
        if (emptySub) emptySub.textContent = this.t('load_manifest');
        const loaderText = this.els.loader?.querySelector('.mimir-loader-text');
        if (loaderText) loaderText.textContent = this.t('loading_manifest');
    }

    refreshLanguageUI() {
        if (!this.currentManifest) return;
        const cachedAnnotations = this.annotationsByCanvasId || {};
        const cachedFulltext = this.fulltextByCanvasId || {};
        this.currentParsed = this.parseManifest(this.currentManifest);
        if (this.currentParsed) {
            Object.entries(cachedAnnotations).forEach(([k, list]) => {
                if (!this.currentParsed.annotationsByCanvasId[k]) this.currentParsed.annotationsByCanvasId[k] = [];
                this.currentParsed.annotationsByCanvasId[k].push(...list);
            });
            this.fulltextByCanvasId = cachedFulltext;
            this.fulltextSourcesByCanvasId = this.currentParsed.fulltextSourcesByCanvasId || this.fulltextSourcesByCanvasId;
        }
        this.updateTopBar(this.currentParsed?.type, this.currentManifest, this.currentParsed);
        this.updateStructure(this.currentParsed);
        this.updateMetadata(this.currentManifest, this.currentParsed);
        this.updateLanguageMenu();
        this.updateStaticLabels();
        const page = this.isBookMode ? this.bookPageIndex : (this.osdExplorer?.currentPage?.() || 0);
        this.updateAnnotationsPanel(page);
        this.updateFulltextPanel(page);
    }

    getCookie(name) {
        if (typeof document === 'undefined') return '';
        const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[1]) : '';
    }

    setCookie(name, value, maxAge = 31536000) {
        if (typeof document === 'undefined') return;
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
    }

    clearCookie(name) {
        if (typeof document === 'undefined') return;
        document.cookie = `${name}=; path=/; max-age=0`;
    }

    parseManifest(manifest) {
        const asArray = (val) => (Array.isArray(val) ? val : (val ? [val] : []));
        const getId = (obj) => (obj && (obj.id || obj['@id'])) || null;
        const getType = (obj) => (obj && (obj.type || obj['@type'])) || '';
        const manifestLanguages = this.collectManifestLanguages(manifest);
        this.activeManifestLanguage = this.pickManifestLanguage(manifestLanguages);
        const getLabel = (label, fallback = '') => this.resolveLangValue(label, fallback);
        const getSummary = (summary) => getLabel(summary);
        const escapeHtml = (text) => String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
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
            asArray(seeAlso).forEach((s) => {
                if (!s) return;
                const id = getId(s) || (typeof s === 'string' ? s : '');
                if (!id) return;
                const format = (s.format || '').toLowerCase();
                const profile = (s.profile || '').toLowerCase();
                const label = getLabel(s.label).toLowerCase();
                const isAlto = format.includes('alto') || profile.includes('alto') || label.includes('alto') || id.toLowerCase().includes('alto');
                const isXml = format.includes('xml') || id.toLowerCase().endsWith('.xml');
                if (isAlto || isXml) sources.push(id);
            });
            return sources;
        };
        const extractXYWH = (val) => {
            if (!val || typeof val !== 'string') return null;
            const match = val.match(/xywh=([^&]+)/);
            if (!match) return null;
            const raw = match[1].replace(/^pixel:/, '').replace(/^pct:/, '').trim();
            const nums = raw.split(',').map(Number);
            if (nums.length !== 4 || nums.some(n => !Number.isFinite(n))) return null;
            return nums;
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
            selectors.forEach(sel => {
                if (xywh) return;
                const value = sel?.value || sel?.['@value'] || '';
                xywh = extractXYWH(value);
                if (!xywh && String(sel?.type || sel?.['@type']).includes('Svg')) {
                    xywh = extractSvgXYWH(value);
                }
            });
            return { canvasId: source || fallbackCanvasId, xywh };
        };
        const extractTextBodies = (body) => {
            const bodies = asArray(body);
            const results = [];
            bodies.forEach(b => {
                if (!b) return;
                const type = getType(b);
                const format = b.format || '';
                if (type === 'SpecificResource' && b.source) {
                    results.push(...extractTextBodies(b.source));
                    return;
                }
                const value = b.value || b.chars || b.text || b['@value'] || (typeof b === 'string' ? b : '');
                if (!value) return;
                const isText = type === 'TextualBody' || format.startsWith('text/');
                if (!isText && typeof b !== 'string') return;
                const isHtml = format.includes('html');
                const html = isHtml ? value : `<p>${escapeHtml(value).replace(/\\n/g, '<br>')}</p>`;
                const label = getLabel(b.label);
                results.push({ html, label });
            });
            return results;
        };
        const parseAnnotationPages = (pages, canvasId, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId) => {
            const annotations = [];
            asArray(pages).forEach(page => {
                const pageStylesheets = [];
                const pageSheet = page?.stylesheet || page?.styleSheet;
                if (pageSheet) {
                    if (typeof pageSheet === 'string') pageStylesheets.push(pageSheet);
                    else if (Array.isArray(pageSheet)) {
                        pageSheet.forEach(s => pageStylesheets.push(s.id || s['@id'] || s));
                    } else pageStylesheets.push(pageSheet.id || pageSheet['@id']);
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
                const fulltextSources = this.extractAltoSourcesFromItems(items);
                if (fulltextSources.length) {
                    if (!fulltextSourcesByCanvasId[canvasId]) fulltextSourcesByCanvasId[canvasId] = [];
                    fulltextSources.forEach(src => {
                        if (!fulltextSourcesByCanvasId[canvasId].includes(src)) {
                            fulltextSourcesByCanvasId[canvasId].push(src);
                        }
                    });
                }
                items.forEach((anno) => {
                    if (!anno) return;
                    const motivation = anno.motivation || '';
                    const textBodies = extractTextBodies(anno.body || anno.resource);
                    if (!textBodies.length) return;
                    if (String(motivation).includes('painting')) return;
                    const targetInfo = parseTarget(anno.target || anno.on, canvasId);
                    const html = textBodies.map(b => b.html).join('');
                    const label = getLabel(anno.label) || textBodies[0]?.label || '';
                    const id = getId(anno) || `${canvasId || 'canvas'}-anno-${annotations.length + 1}`;
                    const stylesheets = [...pageStylesheets];
                    const stylesheet = anno.stylesheet || anno.styleSheet;
                    if (stylesheet) {
                        if (typeof stylesheet === 'string') stylesheets.push(stylesheet);
                        else if (Array.isArray(stylesheet)) {
                            stylesheet.forEach(s => stylesheets.push(s.id || s['@id'] || s));
                        } else stylesheets.push(stylesheet.id || stylesheet['@id']);
                    }
                    const styleClass = anno.styleClass || anno.class || anno.body?.styleClass || anno.target?.styleClass || '';
                    annotations.push({
                        id,
                        label,
                        html,
                        canvasId: targetInfo.canvasId || canvasId,
                        xywh: targetInfo.xywh,
                        styleClass,
                        stylesheets: stylesheets.filter(Boolean)
                    });
                });
            });
            return annotations;
        };
        const parseBody = (body) => {
            const bodies = asArray(body);
            const imageSources = [];
            const avItems = [];
            const modelItems = [];
            const cameraItems = [];
            bodies.forEach(b => {
                if (!b) return;
                const type = getType(b);
                const id = getId(b);
                const format = b.format || '';
                if (type === 'SpecificResource' && b.source) {
                    const nested = parseBody(b.source);
                    imageSources.push(...nested.imageSources);
                    avItems.push(...nested.avItems);
                    modelItems.push(...nested.modelItems);
                    cameraItems.push(...nested.cameraItems);
                }
                const serviceId = extractImageServiceId(b.service || b.services);
                if (serviceId) imageSources.push(serviceId);
                else if (format.startsWith('image/') && id) imageSources.push({ type: 'image', url: id });
                if ((type === 'Video' || format.startsWith('video/')) && id) {
                    avItems.push({ id, mediaType: 'video', label: getLabel(b.label) });
                }
                if ((type === 'Sound' || format.startsWith('audio/')) && id) {
                    avItems.push({ id, mediaType: 'audio', label: getLabel(b.label) });
                }
                if ((type === 'Model' || format.includes('gltf') || (typeof id === 'string' && (id.endsWith('.glb') || id.endsWith('.gltf')))) && id) {
                    modelItems.push({ id, label: getLabel(b.label) });
                }
                if (type === 'PerspectiveCamera' && id) {
                    cameraItems.push({
                        id,
                        label: getLabel(b.label),
                        fieldOfView: b.fieldOfView ?? b.fov,
                        near: b.near,
                        far: b.far
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
            const collectAnnos = (container) => {
                const list = [];
                asArray(container).forEach(entry => {
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
            annos.forEach(anno => {
                if (!anno) return;
                const motivation = anno.motivation || '';
                const motivations = Array.isArray(motivation) ? motivation.map(m => String(m).toLowerCase()) : [String(motivation).toLowerCase()];
                if (!motivation || motivations.some(m => m.includes('painting'))) {
                    const parsed = parseBody(anno.body || anno.resource);
                    const point = this.extractPointSelector(anno.target || anno.on);
                    imageSources.push(...parsed.imageSources);
                    avItems.push(...parsed.avItems);
                    const models = point ? parsed.modelItems.map(m => ({ ...m, position: point })) : parsed.modelItems;
                    modelItems.push(...models);
                    cameraItems.push(...parsed.cameraItems);
                }
            });
            const images = asArray(canvas.images);
            images.forEach(img => {
                const res = img.resource || img.body;
                const parsed = parseBody(res);
                imageSources.push(...parsed.imageSources);
            });
            const pickThumb = (val) => {
                if (!val) return null;
                if (typeof val === 'string') return val;
                if (Array.isArray(val)) return pickThumb(val[0]);
                return val.id || val['@id'] || (val.service && getId(val.service)) || null;
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
                    seeAlsoSources.forEach(src => {
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
                annotations
            };
        };
        const manifestType = getType(manifest).toLowerCase();
        const behavior = asArray(manifest.behavior).map(b => (typeof b === 'string' ? b.toLowerCase() : '')).filter(Boolean);
        const isCollection = manifestType.includes('collection');
        const label = getLabel(manifest.label);
        const summary = getSummary(manifest.summary || manifest.description);
        const metadata = asArray(manifest.metadata);
        const context = manifest['@context'];
        const contextStr = Array.isArray(context) ? context.join(' ') : (context || '');
        const presentationVersion = contextStr.includes('presentation/2') ? 'v2' : (contextStr.includes('presentation/3') ? 'v3' : '');
        const prettyType = (() => {
            const kind = (manifest.type || manifest['@type'] || 'Manifest').toString().replace('sc:', '').replace('oa:', '');
            return `IIIF Presentation ${presentationVersion ? presentationVersion + ' ' : ''}${kind}`.trim();
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
            v3Canvases.forEach(c => {
                const parsed = parseCanvas(c, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId);
                const idx = canvases.length;
                canvases.push({ id: parsed.id, label: parsed.label, thumbnail: parsed.thumbnail, imageSources: parsed.imageSources });
                if (parsed.id) canvasIndexById[parsed.id] = idx;
                imageSources.push(...parsed.imageSources);
                avItems.push(...parsed.avItems);
                modelItems.push(...parsed.modelItems);
                cameraItems.push(...parsed.cameraItems);
                parsed.annotations?.forEach((anno) => {
                    const key = anno.canvasId || parsed.id;
                    if (!key) return;
                    if (!annotationsByCanvasId[key]) annotationsByCanvasId[key] = [];
                    annotationsByCanvasId[key].push(anno);
                });
            });
        }
        const v2Seq = asArray(manifest.sequences)[0];
        const v2Canvases = v2Seq ? asArray(v2Seq.canvases) : [];
        if (v2Canvases.length) {
            v2Canvases.forEach(c => {
                const parsed = parseCanvas(c, annotationPageRefs, fulltextPageRefs, fulltextSourcesByCanvasId);
                const idx = canvases.length;
                canvases.push({ id: parsed.id, label: parsed.label, thumbnail: parsed.thumbnail, imageSources: parsed.imageSources });
                if (parsed.id) canvasIndexById[parsed.id] = idx;
                imageSources.push(...parsed.imageSources);
                avItems.push(...parsed.avItems);
                modelItems.push(...parsed.modelItems);
                cameraItems.push(...parsed.cameraItems);
                parsed.annotations?.forEach((anno) => {
                    const key = anno.canvasId || parsed.id;
                    if (!key) return;
                    if (!annotationsByCanvasId[key]) annotationsByCanvasId[key] = [];
                    annotationsByCanvasId[key].push(anno);
                });
            });
        }

        const manifestSeeAlso = extractFulltextSourcesFromSeeAlso(manifest.seeAlso);
        if (manifestSeeAlso.length && canvases.length === 1) {
            const key = canvases[0].id;
            if (key) {
                if (!fulltextSourcesByCanvasId[key]) fulltextSourcesByCanvasId[key] = [];
                manifestSeeAlso.forEach(src => {
                    if (!fulltextSourcesByCanvasId[key].includes(src)) fulltextSourcesByCanvasId[key].push(src);
                });
            }
        }

        const parseRanges = (ranges) => {
            return asArray(ranges).map(r => {
                const range = {
                    id: getId(r),
                    label: getLabel(r.label),
                    items: asArray(r.items || r.canvases || r.members).map(getId).filter(Boolean)
                };
                const children = asArray(r.items || r.ranges || r.members)
                    .filter(item => typeof item === 'object' && (getType(item).toLowerCase().includes('range') || item.items || item.ranges));
                range.children = parseRanges(children);
                const childIds = range.children.flatMap(c => c.canvasIds || []);
                range.canvasIds = Array.from(new Set([...range.items, ...childIds]));
                return range;
            });
        };
        const ranges = parseRanges(manifest.structures || manifest.ranges);
        const assignRangeIdx = (list) => {
            list.forEach((r) => {
                r._idx = rangesFlat.length;
                rangesFlat.push(r);
                if (r.children?.length) assignRangeIdx(r.children);
            });
        };
        const rangesFlat = [];
        assignRangeIdx(ranges);

        const items = asArray(manifest.items || manifest.members).map(item => ({
            id: getId(item),
            label: getLabel(item.label),
            type: getType(item)
        })).filter(i => i.id);

        const collectionLinks = [];
        const pushCollection = (p) => {
            if (!p) return;
            const id = getId(p);
            const lbl = getLabel(p?.label || p);
            if (id || lbl) collectionLinks.push({ id, label: lbl || id });
        };
        asArray(manifest.partOf).forEach(pushCollection);
        asArray(manifest.within).forEach(pushCollection);

        const fulltext = '';

        const dedupe = (arr) => {
            const seen = new Set();
            return arr.filter(item => {
                const key = typeof item === 'string' ? item : JSON.stringify(item);
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        };

        const parsed = {
            type: isCollection ? 'collection' : this.detectType(manifest, { imageSources, avItems, modelItems }),
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
            fulltext,
            annotationsByCanvasId,
            annotationPageRefs,
            fulltextPageRefs,
            fulltextSourcesByCanvasId,
            behavior,
            manifestLanguages
        };

        return parsed;
    }

    resetExplorers() {
        this.els.osd.classList.add('mimir-hidden'); this.els.av.classList.add('mimir-hidden'); this.els.threeD.classList.add('mimir-hidden'); this.els.message.classList.add('mimir-hidden'); this.els.topBar.style.opacity = '0'; this.showToolbar(false);
        this.els.av.innerHTML = ''; this.els.threeD.innerHTML = ''; this.avPlayer = null;
        this.destroyThree();
        if (this.osdExplorer) { this.osdExplorer.destroy(); this.osdExplorer = null; }
        this.avItems = []; this.modelItems = []; this.currentAvIndex = 0; this.currentModelIndex = 0;
        this.currentParsed = null;
        this.currentAnnotations = [];
        this.selectedAnnotationId = null;
        this.annotationsByCanvasId = {};
        this.currentFulltextLines = [];
        this.fulltextByCanvasId = {};
        this.fulltextSourcesByCanvasId = {};
        this.fulltextPageRefs = [];
        if (this.els.fulltextLayer) this.els.fulltextLayer.innerHTML = '';
        if (this.els.annotationsLayer) this.els.annotationsLayer.innerHTML = '';
        this.els.root.classList.remove('mimir-ready');
        this.els.btns.sidebarToggle.classList.add('mimir-hidden');
        this.els.btns.infoToggle.classList.add('mimir-hidden');
        this.els.sidebar.classList.add('mimir-hidden');
        this.els.info.classList.add('mimir-hidden');
        if (this.els.zoomPop) this.els.zoomPop.classList.add('mimir-hidden');
        if (this.els.zoomSlider) this.els.zoomSlider.value = 1;
        if (this.els.filterBar) this.els.filterBar.classList.add('mimir-hidden');
        if (this.els.threeFilterBar) this.els.threeFilterBar.classList.add('mimir-hidden');
        if (this.els.btns.filterToggle) this.els.btns.filterToggle.classList.remove('mimir-filter-active');
        this.filterOpen = false;
        this.threeFilterOpen = false;
        this.resetFilters();
        this.setLeftOpen(false);
        this.setRightOpen(false);
    }

    destroyThree() {
        if (!this.threeState) return;
        if (this.threeState.rafId) cancelAnimationFrame(this.threeState.rafId);
        if (this.threeState.controls) this.threeState.controls.dispose();
        if (this.threeState.renderer) {
            this.threeState.renderer.dispose();
            if (this.threeState.renderer.forceContextLoss) this.threeState.renderer.forceContextLoss();
        }
        if (this.threeState.resizeObserver) this.threeState.resizeObserver.disconnect();
        this.threeState = null;
    }

    showToolbar(show) {
        this.els.bottomBar.classList.toggle('mimir-toolbar-hidden', !show);
        if (this.els.filterBar) this.els.filterBar.classList.toggle('mimir-hidden', !show || !this.filterOpen);
    }
    showMessage(text) {
        if (this.els.messageText) this.els.messageText.innerText = text;
        this.els.message.classList.remove('mimir-hidden', 'hidden');
    }
    hideMessage() { this.els.message.classList.add('mimir-hidden', 'hidden'); }
    showLoader(show) {
        this.els.loader.classList.toggle('mimir-hidden', !show);
        this.els.loader.classList.toggle('hidden', !show);
    }

}

// Browser-global fallback for direct download usage
if (typeof window !== 'undefined') {
    window.MimirExplorer = MimirExplorer;
}

export default MimirExplorer;
