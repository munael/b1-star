import { std } from "./libstd.js";
export class Model {
    constructor(ver) {
        this.version = ver;
        this.tree = new DTree();
    }
    get bobs() {
        return this.tree.active;
    }
    hist_json() {
        return JSON.stringify(this.tree.root);
    }
    from_json(json) {
        this.tree = new DTree();
        this.tree.root = json;
    }
}
export class DTree {
    constructor() {
        this.root = {
            self: [
                newBob({
                    dimx: 200,
                    dimy: 200,
                    posx: 0,
                    posy: 0,
                    rota: 90,
                    id: 'Foo',
                    color: 'red'
                })
            ],
            ahead: [],
        };
        this.path = [];
        this.current = this.root;
    }
    walk(path) {
        let root_ = this.root;
        for (let i of path) {
            if (0 <= i && i < root_.ahead.length)
                root_ = root_.ahead[i];
            else
                throw `Bad path: ${path.join('.')}`;
        }
        ;
        return root_.self;
    }
    add(snap) {
        this.root.ahead.push({
            self: snap,
            ahead: [],
        });
    }
    fork() {
        let bobs = $.extend(true, {}, { self: this.current.self });
        let next = { self: bobs.self, ahead: [] };
        this.path.push(this.current.ahead.length);
        this.current.ahead.push(next);
        this.current = next;
    }
    get active() {
        return this.walk(this.path);
    }
}
export class BobImpl {
    constructor(data) {
        this._data = data;
    }
    dict() {
        return std.kvmap(this._data, (k, v) => [k, v.toString()]);
    }
    static new(data) {
        let bf = new BobImpl(data);
        let bob = std.delegate(bf, '_data');
        return bob;
    }
}
export const newBob = BobImpl.new;
//# sourceMappingURL=model.js.map