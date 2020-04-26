var drawing = [];
var currentPath = [];
var brushColor;
var canvas;
// var isDrawing = true;
function setup() {
    noCanvas();
    canvas = createCanvas(600, 600);
    canvas.mousePressed(startPath);

    brushColor = createColorPicker('#ed225d');
    brushColor.position(1, height + 5);

    var save = select('#submit');
    save.mousePressed(saveDrawing);
    var clean = createButton("Clean");
    clean.mousePressed(clearCanvas);
}

function startPath() {
    // isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

var saveDrawing = async () => {
    const name = document.getElementById('enter').value;
    cons data = {
        drawing: drawing,
        color : brushColor.color(),
        name: name
    };
    const options = {
        method: 'POST',// telling the kind of fetech we are using
        header: { 'Content-type': 'application.json' },
        body: JSON.stringify(data) //Converts a JavaScript value to a JavaScript Object Notation (JSON) string
    };
    var response = await fetch('/api', options);
    const ResData = await response.json();
  //  console.log(options);

}
function clearCanvas() {
    drawing = [];
    currentPath = [];
}

function draw() {
    background(0);
    if (mouseIsPressed) {
        var point = {
            x: mouseX,
            y: mouseY
        };
        if (point.x < 600 && point.y < 600 && point.x > 0 && point.y > 0) {
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
