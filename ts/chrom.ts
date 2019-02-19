import { Model } from "./model.js";

export class AppChromeModel {
    config: {
        app: any,
        mpane: any,
        nav: any,
    }

    init() {
        let app = {
            name: 'layout',
            padding: 4,
            panels: [
                { type: 'top', size: 30, resizable: false, content: 'top' },
                {
                    type: 'right',
                    size: 250,
                    minSize: 250,
                    resizable: true
                },
                {
                    type: 'main',
                    content: $('#ed')
                }
            ]
        };
        
        let mpane = {
            name: 'mpane',
            active: 'objects',
            tabs: [
                { id: 'objects', caption: 'OP', tooltip: 'Objects and Properties' },
                { id: 'classes', caption: 'C',  tooltip: 'Classes' },
                
            ],
            onClick: function (event) {
                console.log('Target: '+ event.target, event);
            },
        };

        let nav = {
            name: 'nav-bar',
            items: [
                { type: 'button', id: 'upload-btn', icon: 'fas fa-file-import', caption: 'Upload', hint: 'Open Schematic from Local Drive' },
                { type: 'button', id: 'download-btn', icon: 'fas fa-file-download', caption: 'Download', hint: 'Save Schematic to Local Drive' },
                { type: 'break' },
                { type: 'check', id: 'dgraph-btn', icon: 'fas fa-share-alt', caption: 'Graph', hint: 'Toggle between Editor View and Graph View' },
                { type: 'button', id: 'snapshot-btn', icon: 'fas fa-camera', caption: 'Snapshot', hint: 'Commit current changes to snapshot and create new leaf node in the Timeline Graph' },
            ],
            onClick: (event) => {
                this.store.callbacks.gets(`${event.target}-click`)(event);
            }
        };
        
        this.config = {
            app: app,
            mpane: mpane,
            nav: nav
        };
    }

    constructor(model: Model) {
        this.store = model;
        this.init();
    }

    store: Model
}

