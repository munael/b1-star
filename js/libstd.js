export { std };
export class Ref {
    constructor(val) {
        this.val = val;
    }
}
export function ref(val) {
    return new Ref(val);
}
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
    function kvmap(map, func) {
        let r = {};
        for (let key in map) {
            let [k, v] = func(key, map[key]);
            r[k] = v;
        }
        return r;
    }
    std.kvmap = kvmap;
    function apply(f, ...a) {
        return f(...a);
    }
    std.apply = apply;
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