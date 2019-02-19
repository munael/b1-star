import { ref } from "./libstd.js";
import { Bob } from './model.js';
var store;
function snapshot_schematic() {
    store.hist.push(JSON.stringify(store.bobs.map(Bob.dict)));
}
function upload_schematic(file) {
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = function (e) {
        // Render thumbnail
        store.hist = JSON.parse(e.target.result).map(b => JSON.stringify(b));
        store.bobs = JSON.parse(store.hist[store.hist.length - 1]);
    };
    // Read in the image file as a data URL.
    reader.readAsText(file);
}
/////////////////////
function $begin() {
    $('#bob-add').click(function () {
        store.bobs.push(Bob.make());
        store.cbob = ref(store.bobs[store.bobs.length - 1]);
    });
    $('#bobs').change(function () {
        let k = $('#bobs > option:selected').text();
        let x = store.bobs.filter((b) => b.id == k);
        if (x.length)
            store.cbob = ref(x[0]);
    });
    // Nav-bar buttons
    store.callbacks.on('snapshot-btn-click', snapshot_schematic);
    store.callbacks.on('download-btn-click', save);
    store.callbacks.on('upload-btn-click', () => $('#file-uploader').click());
    // Hidden upload-file element
    $('#file-uploader').change(function () {
        upload_schematic(this.files[0]);
    });
    console.log('$begin');
    store.ed = new p5(p5_init);
}
function p5_init(s) {
    s.setup = () => {
        let p = $('#ed').parent();
        let w = p.innerWidth();
        let h = p.innerHeight();
        console.log(`Canvas: ${w}x${h}`);
        let canv = s.createCanvas(w, h);
        canv.parent('ed');
        canv.elt.oncontextmenu = () => false;
        s.rectMode(s.CENTER);
        s.angleMode(s.DEGREES);
        s.frameRate(15);
    };
    s.draw = () => {
        let p = $('#ed');
        let w = p.width() / 2;
        let h = p.height() / 2;
        s.background(60, 90, 190);
        s.fill(255, 50);
        for (let c of store.bobs) {
            let x = w + c.posx / 100 * w;
            let y = h + c.posy / 100 * h;
            s.push();
            s.translate(x, y);
            s.rotate(c.rota);
            s.stroke(200);
            s.strokeWeight(3);
            s.rect(0, 0, c.dimx, c.dimy);
            s.pop();
            s.push();
            s.translate(x, y);
            s.text(c.id, 0, 0);
            s.pop();
        }
    };
    s.windowResized = () => {
        let p = $('#ed').parent();
        let w = p.innerWidth();
        let h = p.innerHeight();
        s.resizeCanvas(w, h);
    };
}
export function init(model) {
    console.log('ed.init!');
    store = model;
    $(document).ready($begin);
}
////////////////////////////////////////////////////////////////////////////////////////////////
function save() {
    download(JSON.stringify(store.hist), 'architecture-schematic.json', 'text/plain');
}
// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
//# sourceMappingURL=ed.js.map