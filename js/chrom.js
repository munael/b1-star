class AppChromeModel {
    init() {
        let pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
        let app = {
            name: 'layout',
            padding: 4,
            panels: [
                // { type: 'top', size: 50, resizable: true, style: pstyle, content: 'top' },
                // { type: 'left', size: 200, resizable: true, style: pstyle, content: 'left' },
                { type: 'main', content: $('#ed') },
                { type: 'right', size: 200, resizable: true }
            ]
        };
        let mpane = {
            name: 'mpane_tabs',
            active: 'tab0',
            tabs: [
                { id: 'tab0', caption: 'Initial Tab', close: true },
                { id: 'tab1', caption: 'Initial Tab' },
                { id: 'tab2', caption: 'Initial Tab' },
            ],
            onClick: function (event) {
                w2ui['layout'].html('main', 'Active tab: ' + event.target);
            },
            onClose: function (event) {
                this.click('tab0');
            }
        };
        this.config = {
            app: app,
            mpane: mpane
        };
    }
    constructor() { this.init(); }
}
//# sourceMappingURL=chrom.js.map