export { std };
var std;
(function (std) {
    class Vec {
        constructor(...args) {
            this.p = new Array(...args);
        }
        get(i) {
            return this.p[i];
        }
        set(i, v) {
            let r = this.p[i];
            this.p[i] = v;
            return r;
        }
        get len() {
            return this.p.length;
        }
    }
    std.Vec = Vec;
})(std || (std = {}));
export var ps;
(function (ps) {
    var reg = $('body');
    function on(evn, f) {
        reg.on(evn, f);
    }
    ps.on = on;
    function trigger(evn) {
        reg.trigger(evn);
    }
    ps.trigger = trigger;
})(ps || (ps = {}));
//# sourceMappingURL=libstd.js.map