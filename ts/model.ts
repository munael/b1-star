import { std } from "./libstd.js";
import { AppChromeModel } from "./chrom.js"

type Color = string

export class Model {
    version: string
    
    tree: DTree

    ui: AppChromeModel
    ed: p5

    constructor(ver: string) {
        this.version = ver;
        this.tree = new DTree();
    }

    get bobs() {
        return this.tree.active;
    }

    hist_json() {
        return JSON.stringify(this.tree.root);
    }

    from_json(json: _Node) {
        this.tree = new DTree();
        this.tree.root = json;
    }
}

type _Node = {
    self: Bob[];
    ahead: _Node[];
    // behind: _Node | null;
}

export class DTree {
    root: _Node;
    path: number[];
    current: _Node;

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
            // behind: null,
        }
        this.path = []
        this.current = this.root;
    }

    walk(path: number[]) {
        let root_ = this.root;
        for(let i of path) {
            if(0 <= i && i < root_.ahead.length)
                root_ = root_.ahead[i];
            else
                throw `Bad path: ${path.join('.')}`;
        };
        return root_.self;
    }

    private add(snap: Bob[]) {
        this.root.ahead.push({
            self: snap,
            ahead: [],
            // behind: null,
        })
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

type BobData = {
    id: string;
    posx: number;
    posy: number;
    dimx: number;
    dimy: number;
    rota: number;
    color: Color;
};

export class BobImpl {
    _data: BobData;

    private constructor (data: BobData) {
        this._data = data;
    }
    
    dict(): {[s: string]: string} {
        return std.kvmap(this._data,
            (k, v) => [k, v.toString()]
        );
    }

    static new(data: BobData) {
        let bf = new BobImpl(data);
        let bob = std.delegate(bf, '_data');
        return bob;
    }
}

export const newBob = BobImpl.new;

export type Bob = ReturnType<typeof BobImpl.new>;