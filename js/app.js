import { Model } from "./model.js";
import { AppChromeModel } from "./chrom.js";
import { init as edInit } from "./ed.js";
// // //
class W2AppChrome {
    init() {
        this.config = model.ui.config;
        $('#app').w2layout(this.config.app);
        $('#nav-bar').w2toolbar(this.config.nav);
        $('#mpane').w2tabs(this.config.mpane);
        this.w2app = w2ui['layout'];
        this.w2app.content('top', w2ui['nav-bar']);
        this.w2app.content('right', w2ui['mpane']);
        this.w2mpane = w2ui['nav-bar'];
        this.w2nav = w2ui['mpane'];
    }
    constructor(model) {
        this.model = model;
    }
}
console.log('In app.ts');
var model = new Model('0.1');
model.ui = new AppChromeModel(model);
var w2chrome = new W2AppChrome(model);
$(() => w2chrome.init());
edInit(model);
console.log('Initing ed');
window['model'] = model;
//# sourceMappingURL=app.js.map