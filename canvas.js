let canvas;
let toothpicks;
let newPicks;
let minY, maxY;
let firstItteration = true;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight, P2D);
    const mainNodeDOM = canvas.parent();
    canvas.parent("canvas-container");
    mainNodeDOM.remove();

    minY = (height / 2) * -1;
    maxY = height / 2;
    toothpicks = [new Toothpick(0, 0, 1, 101)];

    stroke(20);
    strokeWeight(2);
    // noLoop();
}

// function mousePressed() {
//     redraw();
// }

function draw() {
    if (keyIsDown(DOWN_ARROW) || firstItteration) {
        newPicks = [];

        const factor = (height - 100) / (maxY - minY);

        background(230);
        translate(width / 2, height / 2);
        scale(factor);
        for (let t of toothpicks) {
            drawToothpick(t);
            if (t.newPick) {
                minY = min(minY, t.center.y);
                maxY = max(maxY, t.center.y);
                newPicks = [...newPicks, ...t.createEdgePicks(toothpicks)];
                t.newPick = false;
            }
        }
        for (let newPick of newPicks)
            if (newPick) toothpicks.push(newPick);
    }
    firstItteration = false;
}

function drawToothpick(toothpick) {
    stroke(toothpick.newPick ? color(0, 0, 255) : 0)
    line(toothpick.v1.x, toothpick.v1.y, toothpick.v2.x, toothpick.v2.y);
}