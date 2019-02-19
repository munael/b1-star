import { std, Ref } from "./libstd.js";
import { AppChromeModel } from "./chrom.js"

type Color = p5.Color

export class Model {
    version: string
    bobs: Bob[]
    cbob: CBob | null
    hist: string[]

    tree: DGraph

    ui: AppChromeModel
    ed: p5

    callbacks: Radio

    constructor(ver: string) {
        this.version = ver;
        this.bobs = [];
        this.hist = [];
        this.cbob = null;

        this.callbacks = new Radio();

        console.log('Model!')
    }
}

export type DGraph = {
    state: Bob[]
    children: DGraph[] | null
}

class Radio {
    list: { [name: string]: Function }

    constructor() {
        this.list = {};
        console.log('Radio!');
    }

    get = (name: string): Function => this.list[name];

    gets = (name: string): Function => {
        return name in this.list
            ? this.list[name]
            : () => {
                console.log(`WARN - No callback for ${name} in this RadioStation.`)
            }
    }

    on = (name: string, cb: Function) => {
        this.list[name] = cb;
    }
}

enum BobOrient {
    North, South, East, West
}

export class Bob {
    constructor (
        public id: string,
        public posx: number,
        public posy: number,
        public dimx: number,
        public dimy: number,
        public orient: BobOrient,
        public color: Color,
    ) {
    }

    public get rota() {
        return this.orient == BobOrient.East
                ? 0
                : this.orient == BobOrient.North
                ? 90
                : this.orient == BobOrient.West
                ? 180
                : 270;
    }
}

type CBob = Ref<Bob>

export namespace Bob {
    export function make(): Bob {
        return <Bob> {
            id: '',
            posx: 0,
            posy: 0,
            dimx: 0,
            dimy: 0,
            rota: 0,
            color: new p5.Color()
        }
    }
    export function dict(bob: Bob): {[s: string]: string} {
        return std.kvmap(bob,
            (k, v) => [k, v.toString()]
        );
    }
}