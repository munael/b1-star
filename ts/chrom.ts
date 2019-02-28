import { Model } from "./model.js";

export class AppChromeModel {
    config: {
        app: any,
        mpane: any,
        nav: any,
    }

    init() {
        this.config = {
            app: app,
            mpane: mpane,
            nav: nav
        };
    }

    constructor(model: Model) {
        this.model = model;
        this.init();
    }

    model: Model
}

let app = {
    name: 'layout',
    padding: 4,
    panels: [
        { type: 'top', size: 30, resizable: false, content: '<<NAVBAR-PLACEHOLDER>>' },
        {
            type: 'main',
            content: $('#ed')
        },
        {
            type: 'right',
            size: 300,
            minSize: 300,
            resizable: true,
            content: '<<MPANE-PLACEHOLDER>>'
        },
    ]
};

let mpane = {
    name: 'mpane',
    active: 'objects',
    tabs: [
        { id: 'objects', caption: 'PROPS', tooltip: 'Objects and Properties' },
        { id: 'classes', caption: 'CLASSES',  tooltip: 'Classes' },
        { id: 'layers',  caption: 'LAYERS',  tooltip: 'Lavels/Layers' },
        
    ],
    onClick: function (event) {
        console.log('Target: '+ event.target, event);
    },
};

let nav = {
    name: 'nav-bar',
    items: [
        {
            type: 'button', id: 'upload-btn',
            icon: 'fas fa-file-import', caption: 'Upload',
            hint: 'Open Schematic from Local Drive',
            onClick: () => radio.pub('ui.upload_btn.click')
        },
        {
            type: 'button', id: 'download-btn',
            icon: 'fas fa-file-download', caption: 'Download',
            hint: 'Save Schematic to Local Drive',
            onClick: () => radio.pub('ui.download_btn.click')
        },
        { type: 'break' },
        { type: 'check',  id: 'dgraph-btn', icon: 'fas fa-share-alt', caption: 'Graph', hint: 'Toggle between Editor View and Graph View' },
        {
            type: 'button', id: 'snapshot-btn',
            icon: 'fas fa-camera', caption: 'Snapshot',
            hint: 'Commit current changes to snapshot and create new leaf node in the Timeline Graph',
            onClick: () => radio.pub('ui.snapshot_btn.click')
        },
        { type: 'break' },
    ],
    onClick: (event) => {
        radio.pub(`ui.${event.target}.click`, event);
    }
};

