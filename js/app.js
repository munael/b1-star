var chrome_model = new AppChromeModel();
class W2AppChrome {
    init() {
        this.config = chrome_model.config;
        this.appc = this.config.app;
        this.w2app = w2ui['layout'];
        $('#app').w2layout(this.appc);
        this.w2app.content('right', $().w2tabs(this.config.mpane));
    }
}
var w2chrome = new W2AppChrome();
$(() => w2chrome.init());
//# sourceMappingURL=app.js.map