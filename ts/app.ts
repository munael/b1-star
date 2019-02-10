var chrome_model = new AppChromeModel();

interface _W2LayoutAccess extends W2UI.W2UI {
    [s: string]: W2UI.W2Layout
}

class W2AppChrome {
    w2app: W2UI.W2Layout
    appc: any

    config: AppChromeModel['config']

    init() {
        this.config = chrome_model.config;

        this.appc = this.config.app;
        this.w2app = w2ui['layout'] as W2UI.W2Layout;

        $('#app').w2layout(this.appc);
        
        this.w2app.content('right', $().w2tabs(this.config.mpane));
    }
}

var w2chrome = new W2AppChrome();

$(() => w2chrome.init());