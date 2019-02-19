import { Model } from "./model.js";

import { AppChromeModel } from "./chrom.js";

import { init as edInit } from "./ed.js";

// // //

class W2AppChrome {
    w2app: W2UI.W2Layout
    w2mpane: W2UI.W2Tabs
    w2nav: W2UI.W2Toolbar

    config: AppChromeModel['config']
    
    init() {
        this.config = store.ui.config;
        
        $('#app').w2layout(this.config.app);
        $('#nav-bar').w2toolbar(this.config.nav);
        $('#mpane').w2tabs(this.config.mpane);

        this.w2app = w2ui['layout'] as W2UI.W2Layout;
        
        this.w2app.content('top', w2ui['nav-bar']);
        this.w2app.content('right', w2ui['mpane']);
        
        this.w2mpane = w2ui['nav-bar'] as W2UI.W2Tabs;
        this.w2nav   = w2ui['mpane']   as W2UI.W2Toolbar;
    }

    constructor(model: Model) {
        this.store = model;
    }

    store: Model;
}

console.log('In app.ts')

var store: Model = new Model('0.1');

store.ui = new AppChromeModel(store);

var w2chrome = new W2AppChrome(store);

$(() => w2chrome.init());

edInit(store);

console.log('Initing ed')

window['store'] = store;