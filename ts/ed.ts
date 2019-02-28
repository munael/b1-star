import { std, ref } from "./libstd.js";
import { Model, Bob } from './model.js';

var model: Model;

function snapshot_schematic() {
    model.tree.fork();
}

function upload_schematic(file) {
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = function(e: std.FileReaderEvent) {
        // Render thumbnail
        model.from_json(JSON.parse(e.target!.result));
    };

    // Read in the image file as a data URL.
    reader.readAsText(file);
}

/////////////////////

function $begin() {
    // Nav-bar buttons
    radio.sub('ui.snapshot_btn.click', snapshot_schematic);
    radio.sub('ui.download_btn.click', save);
    radio.sub('ui.upload_btn.click', () => $('#file-uploader').click() );

    // Hidden upload-file element
    $('#file-uploader').change(function() {
        upload_schematic(this.files[0]);
    });

    console.log('$begin');
    model.ed = new p5(p5_init);
}

function p5_init(s: p5) {
    s.setup = () => {
        let p = $('#ed').parent();
        let w = p.innerWidth()!;
        let h = p.innerHeight()!;

        console.log(`Canvas: ${w}x${h}`);

        let canv = s.createCanvas(w, h);

        canv.parent('ed');
        canv.elt.oncontextmenu = () => false;
        s.rectMode(s.CENTER);
        s.angleMode(s.DEGREES);
        s.frameRate(15);
    }

    s.draw = () => {
        let p = $('#ed');
        let w = p.width()! / 2;
        let h = p.height()! / 2;
        s.background(60, 90, 190);
        s.fill(255, 50);
        
        for(let c of model.bobs) {
            let x = w+c.posx/100*w;
            let y = h+c.posy/100*h;
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
    }

    // s.windowResized = () => {
    //     let p = $('#ed').parent();
    //     let w = p.innerWidth()!;
    //     let h = p.innerHeight()!;
    //     s.resizeCanvas(w, h);
    // }
}

export function init(model_: Model) {
    console.log('ed.init!')
    model = model_;
    $(document).ready($begin);
}

////////////////////////////////////////////////////////////////////////////////////////////////

function save() {
    download(model.hist_json(), 'architecture-schematic.json', 'text/plain');
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}
