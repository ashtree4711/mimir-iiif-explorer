import OpenSeadragon from 'openseadragon';
import '@google/model-viewer';
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
import iconCube from '@tabler/icons/outline/cube.svg?raw';
import iconInfo from '@tabler/icons/outline/info-circle.svg?raw';
import iconDownload from '@tabler/icons/outline/download.svg?raw';
import iconFilter from '@tabler/icons/outline/filter.svg?raw';
import iconRotate from '@tabler/icons/outline/rotate.svg?raw';
import iconRotateCw from '@tabler/icons/outline/rotate-clockwise.svg?raw';
import iconFlipH from '@tabler/icons/outline/flip-horizontal.svg?raw';
import iconFlipV from '@tabler/icons/outline/flip-vertical.svg?raw';
import iconBrightness from '@tabler/icons/outline/brightness.svg?raw';
import iconContrast from '@tabler/icons/outline/contrast.svg?raw';
import iconColorFilter from '@tabler/icons/outline/color-filter.svg?raw';
import iconPaletteOff from '@tabler/icons/outline/palette-off.svg?raw';
import iconList from '@tabler/icons/outline/list.svg?raw';
import iconTree from '@tabler/icons/outline/list-tree.svg?raw';
import iconStack from '@tabler/icons/outline/stack.svg?raw';
import iconBookmark from '@tabler/icons/outline/bookmark.svg?raw';
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
    model: withIconClass(iconCube),
    info: withIconClass(iconInfo),
    down: withIconClass(iconDownload),
    filter: withIconClass(iconFilter),
    rotate: withIconClass(iconRotate),
    rotateCw: withIconClass(iconRotateCw),
    flipH: withIconClass(iconFlipH),
    flipV: withIconClass(iconFlipV),
    brightness: withIconClass(iconBrightness),
    contrast: withIconClass(iconContrast),
    colorFilter: withIconClass(iconColorFilter),
    paletteOff: withIconClass(iconPaletteOff),
    list: withIconClass(iconList),
    tree: withIconClass(iconTree),
    stack: withIconClass(iconStack),
    bookmark: withIconClass(iconBookmark),
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

        this.currentManifest = null;
        this.currentParsed = null;
        this.osdExplorer = null;
        this.avPlayer = null;
        this.isDark = false;
        this.isBookMode = false;
        this.tileSources = [];
        this.avItems = [];
        this.modelItems = [];
        this.currentAvIndex = 0;
        this.currentModelIndex = 0;
        this.collectionCache = new Map();

        // Apply theme color as CSS variable
        this.container.style.setProperty('--mimir-primary', this.options.primaryColor);
        
        // Create UI structure
        this.container.innerHTML = `
            <div id="mimir-root" class="mimir-app w-full h-full relative flex items-stretch overflow-hidden">
                <div class="mimir-bg"></div>

                <!-- INTERNAL SIDEBAR -->
                <aside id="mimir-sidebar" class="mimir-sidebar mimir-hidden">
                    <div class="mimir-sidebar-header">
                        <h2 class="mimir-eyebrow">Structure</h2>
                        <button id="mimir-sidebar-close" class="mimir-icon-btn" title="Close Sidebar">
                            ${ICONS.close}
                        </button>
                    </div>
                    <div class="mimir-tabs">
                        <button class="mimir-tab is-active" data-tab="items" data-tooltip="Items">${ICONS.list}</button>
                        <button class="mimir-tab" data-tab="outline" data-tooltip="Outline">${ICONS.tree}</button>
                        <button class="mimir-tab" data-tab="collection" data-tooltip="Collection">${ICONS.stack}</button>
                        <button class="mimir-tab" data-tab="bookmarks" data-tooltip="Bookmarks">${ICONS.bookmark}</button>
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
                                        <h2 id="mimir-title" class="mimir-title">Untitled Manifest</h2>
                                        <a id="mimir-collection-link" class="mimir-subtitle mimir-link mimir-hidden" href="#" target="_self" rel="noopener"> </a>
                                    </div>
                                </div>
                            </div>
                            <div class="mimir-topbar-actions">
                                <button id="mimir-book-toggle-top" class="mimir-icon-btn mimir-hidden" title="Toggle Book Mode">
                                    ${ICONS.book}
                                </button>
                                <button id="mimir-download" class="mimir-icon-btn mimir-hidden" title="Download Image">
                                    ${ICONS.down}
                                </button>
                                <button id="mimir-dark-toggle-top" class="mimir-icon-btn" title="Toggle Dark Mode">
                                    <span id="mimir-icon-sun-top" class="mimir-hidden">${ICONS.sun}</span>
                                    <span id="mimir-icon-moon-top">${ICONS.moon}</span>
                                </button>
                                <span class="mimir-divider"></span>
                                <button id="mimir-fullscreen-top" class="mimir-icon-btn" title="Toggle Fullscreen">
                                    ${ICONS.maximize}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="mimir-osd" class="absolute inset-0"></div>
                    <div id="mimir-av" class="absolute inset-0 flex items-center justify-center mimir-hidden text-white"></div>
                    <div id="mimir-3d" class="absolute inset-0 flex items-center justify-center mimir-hidden"></div>
                    
                    <div id="mimir-message" class="mimir-empty mimir-hidden">
                        <div class="mimir-empty-card">
                            <img id="mimir-message-logo" src="${this.options.logoUrl}" class="mimir-empty-logo">
                            <div class="mimir-empty-text">
                                <p id="mimir-message-text" class="mimir-empty-title">Ready to Explore</p>
                                <p class="mimir-empty-sub">Load a IIIF manifest to get started.</p>
                            </div>
                        </div>
                    </div>

                    <div id="mimir-loader" class="mimir-loader mimir-hidden">
                        <div class="mimir-spinner"></div>
                        <p class="mimir-loader-text">Loading manifest...</p>
                    </div>

                    <!-- EDGE PANEL TOGGLES -->
                    <button id="mimir-sidebar-toggle" class="mimir-edge-toggle mimir-edge-left mimir-hidden" title="Open Structure">
                        ${ICONS.menu}
                    </button>
                    <button id="mimir-info-toggle" class="mimir-edge-toggle mimir-edge-right mimir-hidden" title="Open Info">
                        ${ICONS.info}
                    </button>
                    
                    <!-- Watermark -->
                    <div class="mimir-watermark">
                        <img id="mimir-watermark" src="${this.options.logoUrl || ''}" alt="" class="w-10 h-auto">
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
                            <button id="mimir-rotate-ccw" class="mimir-icon-btn" title="Rotate 90 CCW">${ICONS.rotate}</button>
                            <button id="mimir-rotate-cw" class="mimir-icon-btn" title="Rotate 90 CW">${ICONS.rotateCw}</button>
                            <button id="mimir-flip-h" class="mimir-icon-btn" title="Flip Horizontally">${ICONS.flipH}</button>
                            <button id="mimir-flip-v" class="mimir-icon-btn" title="Flip Vertically">${ICONS.flipV}</button>
                            <button id="mimir-filter-greyscale" class="mimir-icon-btn" title="Greyscale">${ICONS.paletteOff}</button>
                        </div>
                        <div class="mimir-filter-column">
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-brightness" class="mimir-icon-btn" title="Brightness">${ICONS.brightness}</button>
                                <input type="range" id="mimir-filter-brightness-slider" min="0.2" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-contrast" class="mimir-icon-btn" title="Contrast">${ICONS.contrast}</button>
                                <input type="range" id="mimir-filter-contrast-slider" min="0.2" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-greyscale" class="mimir-icon-btn" title="Greyscale">${ICONS.paletteOff}</button>
                                <input type="range" id="mimir-filter-greyscale-slider" min="0" max="1" step="0.01" value="0" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-red" class="mimir-icon-btn mimir-filter-icon-red" title="Red Channel">${ICONS.colorFilter}</button>
                                <input type="range" id="mimir-filter-red-slider" min="0" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-green" class="mimir-icon-btn mimir-filter-icon-green" title="Green Channel">${ICONS.colorFilter}</button>
                                <input type="range" id="mimir-filter-green-slider" min="0" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                            <div class="mimir-filter-group">
                                <button id="mimir-filter-blue" class="mimir-icon-btn mimir-filter-icon-blue" title="Blue Channel">${ICONS.colorFilter}</button>
                                <input type="range" id="mimir-filter-blue-slider" min="0" max="2" step="0.01" value="1" class="mimir-filter-slider">
                            </div>
                        </div>
                    </div>

                    <!-- BOTTOM BAR (Unified) -->
                    <div id="mimir-bottom-bar" class="mimir-bottom-bar mimir-toolbar-hidden">
                        <div class="mimir-bottom-group">
                            <button id="mimir-home" class="mimir-icon-btn" title="Back to Start">
                                ${ICONS.home}
                            </button>
                            <span class="mimir-divider"></span>
                            <div class="mimir-zoom">
                                <button id="mimir-zoom" class="mimir-icon-btn" title="Zoom">
                                    ${ICONS.zoomIn}
                                </button>
                                <div id="mimir-zoom-pop" class="mimir-zoom-pop mimir-hidden">
                                    <input type="range" id="mimir-zoom-slider" min="0.5" max="4" step="0.01" value="1">
                                </div>
                            </div>
                            <button id="mimir-filter-toggle" class="mimir-icon-btn" title="Filters">
                                ${ICONS.filter}
                            </button>
                        </div>
                        <div class="mimir-bottom-group mimir-bottom-center">
                            <button id="mimir-play-toggle" class="mimir-icon-btn mimir-hidden" title="Play/Pause">
                                <span id="mimir-icon-play">${ICONS.play}</span>
                                <span id="mimir-icon-pause" class="mimir-hidden">${ICONS.pause}</span>
                            </button>
                            <div id="mimir-av-controls" class="flex items-center gap-3 mimir-hidden">
                                <button id="mimir-back-30" class="mimir-icon-btn" title="Back 30s">
                                    ${ICONS.rewindBack30}
                                </button>
                                <div class="flex flex-col gap-1 min-w-[12rem]">
                                    <input type="range" id="mimir-av-progress" min="0" value="0" step="0.1" class="mimir-range w-full">
                                    <div class="flex justify-between text-[10px] font-semibold uppercase tracking-wide mimir-text-muted">
                                        <span id="mimir-av-current">0:00</span>
                                        <span id="mimir-av-total">0:00</span>
                                    </div>
                                </div>
                                <button id="mimir-forward-30" class="mimir-icon-btn" title="Forward 30s">
                                    ${ICONS.rewindForward30}
                                </button>
                            </div>
                            <div id="mimir-image-controls" class="flex items-center gap-2">
                                <button id="mimir-prev" class="mimir-icon-btn" title="Previous Page">
                                    ${ICONS.chevronLeft}
                                </button>
                                <div class="mimir-page-control">
                                <div class="mimir-page-row">
                                    <input id="mimir-page-input" class="mimir-page-input" type="number" min="1" value="1">
                                    <span id="mimir-page-total" class="mimir-page-total">/ 1</span>
                                </div>
                            </div>
                                <button id="mimir-next" class="mimir-icon-btn" title="Next Page">
                                    ${ICONS.chevronRight}
                                </button>
                            </div>
                        </div>
                        <div class="mimir-bottom-group">
                            <div id="mimir-av-audio" class="flex items-center gap-2 mimir-hidden">
                                <div class="mimir-volume">
                                    <button id="mimir-volume-toggle" class="mimir-icon-btn" title="Volume">
                                        <span id="mimir-icon-volume">${ICONS.volume}</span>
                                        <span id="mimir-icon-volume-off" class="mimir-hidden">${ICONS.mute}</span>
                                    </button>
                                    <div id="mimir-volume-pop" class="mimir-volume-pop mimir-hidden">
                                        <input type="range" id="mimir-volume-slider" min="0" max="1" step="0.01" value="1">
                                    </div>
                                </div>
                                <button id="mimir-mute-toggle" class="mimir-icon-btn" title="Mute">
                                    <span id="mimir-icon-mute">${ICONS.muteOff}</span>
                                </button>
                                <button id="mimir-av-enlarge" class="mimir-icon-btn mimir-hidden" title="Enlarge Video">
                                    ${ICONS.diag}
                                </button>
                            </div>
                            <button id="mimir-dark-toggle" class="mimir-icon-btn mimir-hidden" title="Toggle Dark Mode">
                                <span id="mimir-icon-sun" class="mimir-hidden">${ICONS.sun}</span>
                                <span id="mimir-icon-moon">${ICONS.moon}</span>
                            </button>
                            <button id="mimir-fullscreen" class="mimir-icon-btn mimir-hidden" title="Toggle Fullscreen">
                                ${ICONS.maximize}
                            </button>
                        </div>
                    </div>
                </div>

                <aside id="mimir-info" class="mimir-sidebar mimir-sidebar-right mimir-hidden">
                    <div class="mimir-sidebar-header">
                        <h2 class="mimir-eyebrow">Info</h2>
                        <button id="mimir-info-close" class="mimir-icon-btn" title="Close Info">
                            ${ICONS.close}
                        </button>
                    </div>
                    <div class="mimir-tabs">
                        <button class="mimir-tab is-active" data-tab="metadata" data-tooltip="Metadata">${ICONS.info}</button>
                        <button class="mimir-tab" data-tab="fulltext" data-tooltip="Fulltext">${ICONS.fileText}</button>
                        <button class="mimir-tab" data-tab="annotations" data-tooltip="Annotations">${ICONS.highlight}</button>
                    </div>
                    <div class="mimir-sidebar-body">
                        <div id="mimir-metadata" class="mimir-tab-panel" data-panel="metadata"></div>
                        <div id="mimir-fulltext" class="mimir-tab-panel mimir-hidden" data-panel="fulltext"></div>
                        <div id="mimir-annotations" class="mimir-tab-panel mimir-hidden" data-panel="annotations"></div>
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
            av: this.container.querySelector('#mimir-av'),
            threeD: this.container.querySelector('#mimir-3d'),
            message: this.container.querySelector('#mimir-message'),
            messageText: this.container.querySelector('#mimir-message-text'),
            messageLogo: this.container.querySelector('#mimir-message-logo'),
            loader: this.container.querySelector('#mimir-loader'),
            bottomBar: this.container.querySelector('#mimir-bottom-bar'),
            filterBar: this.container.querySelector('#mimir-filter-bar'),
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
            annotationsContainer: this.container.querySelector('#mimir-annotations'),
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
            btns: {
                sidebarToggle: this.container.querySelector('#mimir-sidebar-toggle'),
                infoToggle: this.container.querySelector('#mimir-info-toggle'),
                topFullscreen: this.container.querySelector('#mimir-fullscreen-top'),
                topDarkToggle: this.container.querySelector('#mimir-dark-toggle-top'),
                topBookToggle: this.container.querySelector('#mimir-book-toggle-top'),
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
        this.showMessage('Ready to Explore');
        this.updateBottomBarOffset();
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
                position: absolute; top: 1.5rem; left: 1.5rem;
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
            .mimir-title-row { display: flex; gap: 0.75rem; align-items: center; }
            .mimir-title { font-weight: 700; font-size: 0.95rem; color: #111111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
                grid-template-columns: 2.25rem 1fr;
                align-items: center;
                gap: 0.75rem;
            }
            .mimir-thumb {
                width: 2.25rem;
                height: 2.25rem;
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
            .mimir-list-label {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
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
                display: grid; gap: 0.15rem; min-width: 6.5rem;
            }
            .mimir-page-row {
                display: flex; align-items: center; gap: 0.35rem;
            }
            .mimir-page-input {
                width: 3.2rem;
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

            model-viewer { width: 100%; height: 100%; background-color: transparent; }
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
                padding: 0.5rem 0.6rem;
                border-radius: 0.75rem;
                background: rgba(17,17,17,0.9);
                border: 1px solid rgba(255,255,255,0.15);
                display: grid; place-items: center;
                backdrop-filter: blur(10px);
                z-index: 10;
            }
            .mimir-zoom-pop input[type="range"] {
                width: 6px; height: 120px;
                writing-mode: bt-lr;
                -webkit-appearance: slider-vertical;
                background: transparent;
            }
            .mimir-zoom-pop input[type="range"]::-webkit-slider-runnable-track {
                background: rgba(255,255,255,0.2); width: 6px; border-radius: 999px;
            }
            .mimir-zoom-pop input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
                margin-left: -4px;
            }
            .mimir-zoom-pop input[type="range"]::-moz-range-track {
                background: rgba(255,255,255,0.2); width: 6px; border-radius: 999px;
            }
            .mimir-zoom-pop input[type="range"]::-moz-range-thumb {
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
            }
            .mimir-volume { position: relative; }
            .mimir-volume-pop {
                position: absolute;
                bottom: 120%;
                left: 50%;
                transform: translateX(-50%);
                padding: 0.5rem 0.6rem;
                border-radius: 0.75rem;
                background: rgba(17,17,17,0.9);
                border: 1px solid rgba(255,255,255,0.15);
                display: grid; place-items: center;
                backdrop-filter: blur(10px);
            }
            .mimir-volume-pop input[type="range"] {
                width: 6px; height: 120px;
                writing-mode: bt-lr;
                -webkit-appearance: slider-vertical;
                background: transparent;
            }
            .mimir-volume-pop input[type="range"]::-webkit-slider-runnable-track {
                background: rgba(255,255,255,0.2); width: 6px; border-radius: 999px;
            }
            .mimir-volume-pop input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
                margin-left: -4px;
            }
            .mimir-volume-pop input[type="range"]::-moz-range-track {
                background: rgba(255,255,255,0.2); width: 6px; border-radius: 999px;
            }
            .mimir-volume-pop input[type="range"]::-moz-range-thumb {
                background: #f8fafc; height: 14px; width: 14px; border-radius: 50%;
                border: 2px solid rgba(17,17,17,0.5);
            }
            #mimir-root.mimir-dark .mimir-volume-pop {
                background: rgba(17,17,17,0.95);
                border-color: rgba(148,163,184,0.3);
            }
            #mimir-root.mimir-dark .mimir-zoom-pop {
                background: rgba(17,17,17,0.95);
                border-color: rgba(148,163,184,0.3);
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
            if (this.osdExplorer && !this.els.osd.classList.contains('mimir-hidden')) {
                const viewport = this.osdExplorer.viewport;
                const homeZoom = viewport.getHomeZoom ? viewport.getHomeZoom() : 1;
                viewport.zoomTo(homeZoom * value);
            }
            this.applyTransforms();
        };
        this.els.btns.home.onclick = () => {
            this.resetFilters();
            this.resetTransforms();
            this.zoomValue = 1;
            if (this.els.zoomSlider) this.els.zoomSlider.value = 1;
            if (this.osdExplorer) this.osdExplorer.viewport.goHome();
            if (this.avPlayer) this.avPlayer.currentTime = 0;
        };
        this.els.btns.prev.onclick = () => this.osdExplorer?.goToPage(this.osdExplorer.currentPage() - 1);
        this.els.btns.next.onclick = () => this.osdExplorer?.goToPage(this.osdExplorer.currentPage() + 1);
        if (this.els.pageInput) {
            const goToInputPage = () => {
                if (!this.osdExplorer) return;
                const total = this.tileSources?.length || 0;
                let target = Number(this.els.pageInput.value || 1);
                if (!Number.isFinite(target)) target = 1;
                target = Math.max(1, Math.min(total || 1, target));
                let pageIndex = target - 1;
                if (this.isBookMode) {
                    pageIndex = target <= 1 ? 0 : Math.floor(target / 2);
                }
                this.osdExplorer.goToPage(pageIndex);
            };
            this.els.pageInput.addEventListener('change', goToInputPage);
            this.els.pageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') goToInputPage();
            });
        }
        this.els.btns.topBookToggle.onclick = () => {
            this.isBookMode = !this.isBookMode;
            this.els.btns.topBookToggle.style.color = this.isBookMode ? 'var(--mimir-primary)' : '';
            this.renderImage(this.currentManifest);
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
        this.els.btns.topDarkToggle.onclick = this.els.btns.darkToggle.onclick;
        this.els.btns.fullscreen.onclick = () => {
            if (!document.fullscreenElement) this.container.requestFullscreen();
            else document.exitFullscreen();
        };
        this.els.btns.topFullscreen.onclick = this.els.btns.fullscreen.onclick;
        this.els.btns.download.onclick = () => this.downloadCurrentImage();
        document.addEventListener('fullscreenchange', () => {
            const isFull = !!document.fullscreenElement;
            this.els.btns.fullscreen.innerHTML = isFull ? ICONS.minimize : ICONS.maximize;
            this.els.btns.topFullscreen.innerHTML = isFull ? ICONS.minimize : ICONS.maximize;
        });
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
        this.updateBottomBarOffset();
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
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const manifest = await response.json();
            this.currentManifest = manifest;
            this.currentAvIndex = 0;
            this.currentModelIndex = 0;
            this.currentParsed = this.parseManifest(manifest);
            this.render(this.currentParsed.type, manifest, this.currentParsed);
        } catch (error) {
            console.error('Mimir: Error loading manifest', error);
            this.showMessage(`Error: ${error.message}`);
        } finally { this.showLoader(false); }
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
        
        this.els.btns.zoom.classList.toggle('mimir-hidden', type !== 'image' && type !== 'av');
        this.els.btns.filterToggle.classList.toggle('mimir-hidden', type !== 'image' && type !== 'av');
        if (type !== 'image' && type !== 'av') this.setFilterOpen(false);
        this.els.btns.topBookToggle.classList.toggle('mimir-hidden', type !== 'image');
        this.els.btns.download.classList.toggle('mimir-hidden', type !== 'image');
        this.els.btns.topDarkToggle.classList.remove('mimir-hidden');
        this.els.btns.topFullscreen.classList.remove('mimir-hidden');
        this.els.btns.darkToggle.classList.add('mimir-hidden');
        this.els.btns.fullscreen.classList.add('mimir-hidden');

        switch (type) {
            case 'collection': this.renderCollection(manifest, parsed); break;
            case 'image': this.renderImage(manifest, parsed); break;
            case 'av': this.renderAV(manifest, parsed); break;
            case '3d': this.render3D(manifest, parsed); break;
            default: this.showMessage('Unsupported content type.');
        }
    }

    renderImage(manifest, parsed) {
        this.els.osd.classList.remove('mimir-hidden'); this.showToolbar(true);
        this.tileSources = parsed?.imageSources?.length ? parsed.imageSources : [];
        if (this.osdExplorer) this.osdExplorer.destroy();
        if (this.tileSources.length === 0) { this.showMessage("No image services found."); this.showToolbar(true); return; }
        let finalSources = this.tileSources;
        if (this.isBookMode && this.tileSources.length > 1) {
            finalSources = [this.tileSources[0]];
            for (let i = 1; i < this.tileSources.length; i += 2) {
                const spread = [{ tileSource: this.tileSources[i], x: 0, y: 0, width: 1 }];
                if (this.tileSources[i + 1]) spread.push({ tileSource: this.tileSources[i + 1], x: 1.05, y: 0, width: 1 });
                finalSources.push(spread);
            }
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
            element: this.els.osd, tileSources: finalSources, sequenceMode: true,
            showNavigationControl: false, showSequenceControl: false, prefixUrl: "",
            blendTime: 0.1, animationTime: 0.5, preserveViewport: true,
            visibilityRatio: 1, minZoomLevel: 0, defaultZoomLevel: 0, homeFillsExplorer: true,
            drawer: supportsWebGL ? ['webgl', 'canvas'] : ['canvas']
        });
        if (this.els.renderMode) this.els.renderMode.textContent = supportsWebGL ? 'WEBGL' : 'CANVAS';
        if (this.els.zoomSlider) this.els.zoomSlider.value = 1;
        this.zoomValue = 1;
        this.applyFilters();
        this.applyTransforms();
        this.osdExplorer.addHandler('page', (e) => this.updatePageNum(e.page));
        this.updatePageNum(0);
        this.highlightActiveCanvas(0, true);
    }

    downloadCurrentImage() {
        if (!this.tileSources?.length) return;
        const infoUrl = this.tileSources[Math.max(0, this.osdExplorer?.currentPage?.() || 0)] || this.tileSources[0];
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
        this.highlightActiveCanvas(osdPageIndex, true);
        this.highlightActiveOutline(osdPageIndex);
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
        const getLabel = (label) => {
            if (!label) return 'Untitled';
            if (typeof label === 'string') return label;
            if (Array.isArray(label)) return getLabel(label[0]);
            if (typeof label === 'object') {
                const values = Object.values(label); return values.length > 0 ? getLabel(values[0]) : 'Untitled';
            }
            return 'Untitled';
        };
        this.els.title.innerText = parsed?.label || getLabel(manifest.label);
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
        const getLabel = (label) => {
            if (!label) return '';
            if (typeof label === 'string') return label;
            if (Array.isArray(label)) return getLabel(label[0]);
            if (typeof label === 'object') {
                const values = Object.values(label); return values.length > 0 ? getLabel(values[0]) : '';
            }
            return '';
        };
        const attributionLabel = parsed?.attributionLabel || getLabel(manifest?.requiredStatement?.label) || 'Anbieter';
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
                    <div class="mimir-info-label">${attributionLabel || 'Attribution'}</div>
                    <div class="mimir-info-row">
                        <div class="mimir-info-value">${attributionValue || ''}</div>
                    </div>
                </div>
            </div>`;
        }

        if (licenseUrl || licenseIcons) {
            html += `<div class="mimir-card mimir-card-compact">
                <div class="mimir-info-section">
                    <div class="mimir-info-label">Rechte</div>
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
                    <div class="mimir-info-label">Provider</div>
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
        if (titleLabel) metaHtml += `<div class="mimir-meta-item"><p class="mimir-meta-title">Title</p><p class="mimir-meta-value">${titleLabel}</p></div>`;
        if (summary) metaHtml += `<div class="mimir-meta-item"><p class="mimir-meta-title">Summary</p><p class="mimir-meta-value">${summary}</p></div>`;
        meta.forEach(item => {
            metaHtml += `<div class="mimir-meta-item"><p class="mimir-meta-title">${getLabel(item.label)}</p><p class="mimir-meta-value">${getLabel(item.value)}</p></div>`;
        });
        html += `<div class="mimir-card mimir-card-compact">
            <p class="mimir-meta-title">Metadata</p>
            <div class="mimir-meta-grid">
                ${metaHtml || '<p class="mimir-meta-value">No metadata available.</p>'}
            </div>
        </div>`;
        if (this.els.metadataContainer) {
            this.els.metadataContainer.innerHTML = html;
            this.bindSidebarActions(parsed, this.els.metadataContainer);
        }
        if (this.els.fulltextContainer) {
            const text = parsed?.fulltext || '';
            this.els.fulltextContainer.innerHTML = text
                ? `<div class="mimir-card"><p class="mimir-meta-title">Fulltext</p><p class="mimir-meta-value">${text}</p></div>`
                : `<div class="mimir-card"><p class="mimir-meta-title">Fulltext</p><p class="mimir-meta-value">No fulltext available.</p></div>`;
        }
        if (this.els.annotationsContainer) {
            this.els.annotationsContainer.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">Annotations</p><p class="mimir-meta-value">Annotations will appear here.</p></div>`;
        }
    }

    updateStructure(parsed) {
        if (!this.els.structureItems || !this.els.structureOutline || !this.els.structureCollection || !this.els.structureBookmarks) return;

        let itemsHtml = '';
        if (parsed?.canvases?.length > 1) {
            itemsHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">Items</p>
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
                <p class="mimir-meta-title">Segments</p>
                <div class="mimir-list">`;
            parsed.avItems.forEach((item, idx) => {
                const label = item.label || `Track ${idx + 1}`;
                itemsHtml += `<button data-mimir-av="${idx}" class="mimir-list-btn">${label}</button>`;
            });
            itemsHtml += `</div></div>`;
        }
        if (parsed?.modelItems?.length > 1) {
            itemsHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">Models</p>
                <div class="mimir-list">`;
            parsed.modelItems.forEach((item, idx) => {
                const label = item.label || `Model ${idx + 1}`;
                itemsHtml += `<button data-mimir-model="${idx}" class="mimir-list-btn">${label}</button>`;
            });
            itemsHtml += `</div></div>`;
        }
        this.els.structureItems.innerHTML = itemsHtml || `<div class="mimir-card"><p class="mimir-meta-title">Items</p><p class="mimir-meta-value">No items available.</p></div>`;

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
                <p class="mimir-meta-title">Table of Content</p>
                <div class="mimir-outline">`;
            parsed.ranges.forEach(range => { outlineHtml += renderRange(range); });
            outlineHtml += `</div></div>`;
        }
        this.els.structureOutline.innerHTML = outlineHtml || `<div class="mimir-card"><p class="mimir-meta-title">Table of Content</p><p class="mimir-meta-value">No table of content available.</p></div>`;

        let collectionHtml = '';
        if (parsed?.type === 'collection' && parsed?.items?.length) {
            collectionHtml += `<div class="mimir-card">
                <p class="mimir-meta-title">Collection Items</p>
                <div class="mimir-list">`;
            parsed.items.forEach((item, idx) => {
                const label = item.label || `Item ${idx + 1}`;
                collectionHtml += `<button data-mimir-item="${idx}" class="mimir-list-btn">${label}</button>`;
            });
            collectionHtml += `</div></div>`;
        }
        if (parsed?.collectionLinks?.length) {
            const label = parsed.collectionLinks[0].label || 'Collection';
            collectionHtml += `<div class="mimir-card"><p class="mimir-meta-title">Collection</p><p class="mimir-meta-value">${label}</p></div>`;
        }
        this.els.structureCollection.innerHTML = collectionHtml || `<div class="mimir-card"><p class="mimir-meta-title">Collection</p><p class="mimir-meta-value">Not part of a collection.</p></div>`;

        this.els.structureBookmarks.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">Bookmarks</p><p class="mimir-meta-value">Bookmarks will appear here.</p></div>`;

        this.bindSidebarActions(parsed, this.els.structureItems);
        this.bindSidebarActions(parsed, this.els.structureOutline);
        this.bindSidebarActions(parsed, this.els.structureCollection);
        this.highlightActiveCollectionMember();
    }

    async loadCollectionMembers(collectionId) {
        if (!collectionId || !this.els.structureCollection) return;
        if (this.collectionCache.has(collectionId)) {
            this.els.structureCollection.innerHTML = this.collectionCache.get(collectionId);
            this.bindCollectionLinks(this.els.structureCollection);
            this.highlightActiveCollectionMember();
            return;
        }
        this.els.structureCollection.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">Collection</p><p class="mimir-meta-value">Loading collection…</p></div>`;
        try {
            const res = await fetch(collectionId);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const collection = await res.json();
            const items = Array.isArray(collection.items) ? collection.items : (Array.isArray(collection.members) ? collection.members : []);
            let html = `<div class="mimir-card">
                <p class="mimir-meta-title">Collection Members</p>
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
            this.collectionCache.set(collectionId, html);
            this.els.structureCollection.innerHTML = html;
            this.bindCollectionLinks(this.els.structureCollection);
            this.highlightActiveCollectionMember();
            this.fetchCollectionThumbs(items);
        } catch (err) {
            this.els.structureCollection.innerHTML = `<div class="mimir-card"><p class="mimir-meta-title">Collection</p><p class="mimir-meta-value">Failed to load collection.</p></div>`;
        }
    }

    async fetchCollectionThumbs(items) {
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
        this.avItems = parsed?.avItems || [];
        if (this.avItems.length === 0) { this.showMessage("No audio/video items found."); return; }
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
        this.els.btns.zoom.classList.add('mimir-hidden'); this.els.btns.topBookToggle.classList.add('mimir-hidden');
        this.els.btns.filterToggle.classList.add('mimir-hidden');
        this.setFilterOpen(false);
        this.modelItems = parsed?.modelItems || [];
        if (this.modelItems.length === 0) { this.showMessage("No 3D models found."); return; }
        const current = this.modelItems[this.currentModelIndex] || this.modelItems[0];
        const modelUrl = current?.id || current?.url;
        if (modelUrl) { this.els.threeD.innerHTML = `<model-viewer src="${modelUrl}" camera-controls auto-rotate class="w-full h-full"></model-viewer>`; }
    }

    renderCollection(manifest, parsed) {
        this.showToolbar(false);
        if (!parsed?.items?.length) {
            this.showMessage('Collection is empty or has no items.');
            return;
        }
        this.showMessage('Select an item from the sidebar to explore.');
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
                this.currentModelIndex = idx;
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

    parseManifest(manifest) {
        const asArray = (val) => (Array.isArray(val) ? val : (val ? [val] : []));
        const getId = (obj) => (obj && (obj.id || obj['@id'])) || null;
        const getType = (obj) => (obj && (obj.type || obj['@type'])) || '';
        const getLabel = (label) => {
            if (!label) return '';
            if (typeof label === 'string') return label;
            if (Array.isArray(label)) return getLabel(label[0]);
            if (typeof label === 'object') {
                const values = Object.values(label);
                return values.length > 0 ? getLabel(values[0]) : '';
            }
            return '';
        };
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
        const parseBody = (body) => {
            const bodies = asArray(body);
            const imageSources = [];
            const avItems = [];
            const modelItems = [];
            bodies.forEach(b => {
                if (!b) return;
                const type = getType(b);
                const id = getId(b);
                const format = b.format || '';
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
            });
            return { imageSources, avItems, modelItems };
        };
        const parseCanvas = (canvas) => {
            const imageSources = [];
            const avItems = [];
            const modelItems = [];
            const items = asArray(canvas.items);
            items.forEach(page => {
                const annos = asArray(page.items);
                annos.forEach(anno => {
                    const motivation = anno.motivation || '';
                    if (!motivation || motivation === 'painting') {
                        const parsed = parseBody(anno.body || anno.resource);
                        imageSources.push(...parsed.imageSources);
                        avItems.push(...parsed.avItems);
                        modelItems.push(...parsed.modelItems);
                    }
                });
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
            return {
                id: getId(canvas),
                label: getLabel(canvas.label),
                imageSources,
                avItems,
                modelItems,
                thumbnail
            };
        };
        const manifestType = getType(manifest).toLowerCase();
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

        const v3Canvases = asArray(manifest.items);
        if (v3Canvases.length) {
            v3Canvases.forEach(c => {
                const parsed = parseCanvas(c);
                const idx = canvases.length;
                canvases.push({ id: parsed.id, label: parsed.label, thumbnail: parsed.thumbnail, imageSources: parsed.imageSources });
                if (parsed.id) canvasIndexById[parsed.id] = idx;
                imageSources.push(...parsed.imageSources);
                avItems.push(...parsed.avItems);
                modelItems.push(...parsed.modelItems);
            });
        }
        const v2Seq = asArray(manifest.sequences)[0];
        const v2Canvases = v2Seq ? asArray(v2Seq.canvases) : [];
        if (v2Canvases.length) {
            v2Canvases.forEach(c => {
                const parsed = parseCanvas(c);
                const idx = canvases.length;
                canvases.push({ id: parsed.id, label: parsed.label, thumbnail: parsed.thumbnail, imageSources: parsed.imageSources });
                if (parsed.id) canvasIndexById[parsed.id] = idx;
                imageSources.push(...parsed.imageSources);
                avItems.push(...parsed.avItems);
                modelItems.push(...parsed.modelItems);
            });
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
            ranges,
            rangesFlat,
            items,
            collectionLinks: dedupe(collectionLinks),
            fulltext
        };

        return parsed;
    }

    resetExplorers() {
        this.els.osd.classList.add('mimir-hidden'); this.els.av.classList.add('mimir-hidden'); this.els.threeD.classList.add('mimir-hidden'); this.els.message.classList.add('mimir-hidden'); this.els.topBar.style.opacity = '0'; this.showToolbar(false);
        this.els.av.innerHTML = ''; this.els.threeD.innerHTML = ''; this.avPlayer = null;
        if (this.osdExplorer) { this.osdExplorer.destroy(); this.osdExplorer = null; }
        this.avItems = []; this.modelItems = []; this.currentAvIndex = 0; this.currentModelIndex = 0;
        this.currentParsed = null;
        this.els.root.classList.remove('mimir-ready');
        this.els.btns.sidebarToggle.classList.add('mimir-hidden');
        this.els.btns.infoToggle.classList.add('mimir-hidden');
        this.els.sidebar.classList.add('mimir-hidden');
        this.els.info.classList.add('mimir-hidden');
        if (this.els.zoomPop) this.els.zoomPop.classList.add('mimir-hidden');
        if (this.els.zoomSlider) this.els.zoomSlider.value = 1;
        if (this.els.filterBar) this.els.filterBar.classList.add('mimir-hidden');
        if (this.els.btns.filterToggle) this.els.btns.filterToggle.classList.remove('mimir-filter-active');
        this.filterOpen = false;
        this.resetFilters();
        this.setLeftOpen(false);
        this.setRightOpen(false);
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
