var drawing = [];
var currentPath = [];
var brushColor;
var canvas;
var name = "";
// var isDrawing = true;
function setup() {
    noCanvas();
    canvas = createCanvas(400, 500);
    canvas.mousePressed(startPath);

    brushColor = createColorPicker('#ed225d');
    brushColor.position(1, height + 5);

    // Event on buttons
    var save = select('#submit');
    save.mousePressed(saveDrawing);
    var clean = select('#clear');
    clean.mousePressed(clearCanvas);
    var nextP = select('#Start');
    nextP.mousePressed(name_str);
    var retry = select('#retry');
    retry.mousePressed(() => {
        $(".box1").show(600);
        $(".box3").hide(500);
        drawing = [];
        currentPath = [];
    });

    // stitching to class page2
    brushColor.class('box2');
    clean.class('box2');
    brushColor.id('color');
    canvas.class('box2');

    // hiding the next div
    $(".box2").hide();
    $(".box3").hide();
}

function startPath() {
    // isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}
function name_str() {
    name = document.getElementById('name_str').value;
    $(".box1").hide(500)
    // $(".page1").toggle(500);
    $(".box2").toggle(600);
}
function clearCanvas() {
    drawing = [];
    currentPath = [];
}
var saveDrawing = async () => {
    $(".box2").toggle(600);
    $(".box3").toggle(600);
    const data = {
        drawing: drawing,
        color: brushColor.color(),
        name: name
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    // console.log(options);


    const response = await fetch('/api', options);
    const json = await response.json();

}

function draw() {
    background(0);
    if (mouseIsPressed) {
        var point = {
            x: mouseX,
            y: mouseY
        };
        if (point.x < width && point.y < height && point.x > 0 && point.y > 0) {
            currentPath.push(point);
        }
    }
    stroke(brushColor.color());

    noFill();

    for (let i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (let j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
    }

}