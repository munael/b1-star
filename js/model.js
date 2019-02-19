import { std } from "./libstd.js";
export class Model {
    constructor(ver) {
        this.version = ver;
        this.bobs = [];
        this.hist = [];
        this.cbob = null;
        this.callbacks = new Radio();
        console.log('Model!');
    }
}
class Radio {
    constructor() {
        this.get = (name) => this.list[name];
        this.gets = (name) => {
            return name in this.list
                ? this.list[name]
                : () => {
                    console.log(`WARN - No callback for ${name} in this RadioStation.`);
                };
        };
        this.on = (name, cb) => {
            this.list[name] = cb;
        };
        this.list = {};
        console.log('Radio!');
    }
}
var BobOrient;
(function (BobOrient) {
    BobOrient[BobOrient["North"] = 0] = "North";
    BobOrient[BobOrient["South"] = 1] = "South";
    BobOrient[BobOrient["East"] = 2] = "East";
    BobOrient[BobOrient["West"] = 3] = "West";
})(BobOrient || (BobOrient = {}));
export class Bob {
    constructor(id, posx, posy, dimx, dimy, orient, color) {
        this.id = id;
        this.posx = posx;
        this.posy = posy;
        this.dimx = dimx;
        this.dimy = dimy;
        this.orient = orient;
        this.color = color;
    }
    get rota() {
        return this.orient == BobOrient.East
            ? 0
            : this.orient == BobOrient.North
                ? 90
                : this.orient == BobOrient.West
                    ? 180
                    : 270;
    }
}
(function (Bob) {
    function make() {
        return {
            id: '',
            posx: 0,
            posy: 0,
            dimx: 0,
            dimy: 0,
            rota: 0,
            color: new p5.Color()
        };
    }
    Bob.make = make;
    function dict(bob) {
        return std.kvmap(bob, (k, v) => [k, v.toString()]);
    }
    Bob.dict = dict;
})(Bob || (Bob = {}));
//# sourceMappingURL=model.js.map