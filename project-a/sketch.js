/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
let t = 0;
let x;
let y;
let circleState;
let angryStartTime;
let s = 20;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");

    drawing = createGraphics(width, height);
    colorMode(HSB);
    noStroke();
    x = width / 2;
    y = height / 2;
    circleState = "happy";
    ringColor = color(0, 255, 0); // initial color
    targetX = random(0, width);
    targetY = random(0, height);

    mouthX = 400;
    mouthY = 250;
}

function draw() {
    //   if (mouseX < width/2 + 100 && mouseX > width/2 -100 && mouseY<100){
    //     if (mouseIsPressed){
    //       text('hi you can hear me because we both have teeth', mouseX, mouseY);
    //     }
    //   }

    //   if (mouseIsPressed == true) {
    //     drawing.circle(mouseX, mouseY, 50);
    //   }
    image(drawing, 0, 0);

    background("#44DDF1");
    let mx = mouseX;
    let my = mouseY;
    let imx = width - mouseX;
    let imy = height - mouseY;

    for (let x = 0; x < width / 2; x++) {
        //calculate the distance of each vertical line to the mouse
        let d = dist(mouseX, 0, x, 0);

        // map to 0-1
        let t = map(d, 0, width / 2, 0, 1);

        //gradient color
        let c = lerp(270, 100, t);

        stroke(c, 50, 20);
        line(x, 0, x, height);
    }

    for (let x = width / 2; x < width; x++) {
        //calculate the distance of each vertical line to the mouse
        let d = dist(mouseX, 0, x, 0);

        // map to 0-1
        let t = map(d, 0, width, 0, 1);

        //gradient color
        let c = lerp(222, 120, t);

        stroke(c, 50, 70);
        line(x, 0, x, height);
    }

    // if (mouseX < 400) {
    //   rect(0, 0, 400, 500); // Left
    // } else {
    //   rect(400, 0, 400, 500); // Right
    // }

    // ellipse(mouseX, mouseY, 30);
    // line (mouseX, 0, mouseX, height);
    // line(0, mouseY, width, mouseY);

    for (let r = 0; r < my; r++) {
        let t2 = map(r, 0, my, 0, 1);

        //gradient color
        let c2 = lerp(70, 200, t2);

        stroke(c2, 194, 190);
        noFill();
        ellipse(mx, height / 2, r, r);
    }

    // fill("#C1DBED");
    // ellipse(mx, height / 2, my, my);

    for (let r = 0; r < imy; r++) {
        let t3 = map(r, 0, imy, 0, 1);

        //gradient color
        let c3 = lerp(100, 40, t3);

        stroke(c3, 255, 255);
        noFill();
        ellipse(imx, height / 2, r, r);
    }

    // fill("#F5CD6A");
    // ellipse(imx, height / 2, imy, imy);

    noFill(90);
    // noFill(90);
    // for (let x=0; x < width; x += s) {
    //   for (let y=0; y < height; y += s) {
    //     push();
    //     translate(x, y);
    //     let d = dist (x, y, mouseX, mouseY);
    //     let angle = map(d, 0, 400, 0, 180);
    //     rotate (radians (angle));
    //     let h = map (d, 0, 400, 0, 180, true);
    //     fill (h, 100, 100);
    //     let s2 = map (d, 0, 400, s, 0, true);
    //     rect (-s2/2, -s2/2, s2, s2);
    //     pop();
    //   }
    // }
    // }
    // drifting motion
    let mouthX = 400 + noise(t) * 200 - 90;
    let mouthY = 250 + noise(t + 100) * 150 - 75;

    let d = dist(mouseX, mouseY, mouthX, mouthY);
    if (mouseX > width / 2) {
        // right side
        mouthX -= map(d, 0, width / 2, width * 0.33, 0, true);
    } else {
        // left side
        mouthX += map(d, 0, width / 2, width * 0.33, 0, true);
    }

    // noFill(300);
    // stroke(150);
    // strokeWeight(1);

    noStroke();

    let fangRingDiameter = 150;
    let ringIndex = 0;

    // ripple rings
    for (let d = 200; d >= 25; d -= 25) {
        let ripple = sin(frameCount * 0.05 + ringIndex * 0.5) * 10;
        let currentD = d + ripple;

        // fill(0, d, 100);

        for (let r = 0; r < currentD; r++) {
            let t4 = map(r, 0, currentD, 0, 1);

            //gradient color
            let c4 = lerp(60, 0, t4);

            stroke(c4, 255, 255);
            noFill();
            circle(mouthX, mouthY, r);
        }

        // circle(mouthX, mouthY, currentD);
        if (ringIndex === 2) {
            fangRingDiameter = currentD;
        }

        if (circleState == "happy") {
            // rules for transitioning to
            // different states:
            let moveAbout = dist(mouseX, mouseY, x, y);
            if (moveAbout < 300) {
                // we touched the circle, change state
                circleState = "angry";
                // record the current time
                angryStartTime = millis();
            } else if (circleState == "angry") {
                x += random(-3, 3);
                // rules for transitioning to
                // different states:
                if (millis() - angryStartTime > 3000) {
                    // three seconds have elapsed, change state
                    circleState = "happy";
                }
                //circle(mouthX, mouthY, currentD);

                //if (ringIndex === 2) {
                //fangRingDiameter = currentD;
            }
        }
        ringIndex++;

        fill(0, 0, 100);
        // noStroke();

        let r = fangRingDiameter / 2;
        let fangY = mouthY - r * 0.2;
        let fangOffsetX = r * 0.4;

        drawFang(mouthX - fangOffsetX, fangY);
        drawFang(mouthX + fangOffsetX, fangY);
        // advance noise time
        t += 0.01;
    }
    noStroke();
    function drawFang(x, y) {
        beginShape();
        curveVertex(x - 10, y);
        curveVertex(x - 10, y);
        curveVertex(x, y + 70);
        curveVertex(x + 10, y);
        curveVertex(x + 10, y);
        endShape(CLOSE);
    }

    for (let x = 0; x < width; x += s) {
        for (let y = 0; y < height; y += s) {
            push();
            translate(x, y);
            let d = dist(x, y, mouseX, mouseY);
            let angle = map(d, 0, 400, 0, 180);
            rotate(radians(angle));
            let h = map(d, 0, 400, 0, 180, true);
            fill(h, 100, 100);
            let s2 = map(d, 0, 400, s, 0, true);
            rect(-s2 / 2, -s2 / 2, s2, s2);
            pop();

            push();
            if (
                mouseX < width / 2 + 200 &&
                mouseX > width / 2 - 200 &&
                mouseY < 100
            ) {
                if (mouseIsPressed) {
                    textSize(10);
                    stroke(0);
                    strokeWeight(2);
                    text("hi", mouseX, mouseY);
                }
            }
            // pop();

            push();
            if (
                mouseX < width / 2 + 200 &&
                mouseX > width / 2 - 200 &&
                mouseY < 250
            ) {
                if (mouseIsPressed) {
                    textSize(25);
                    stroke(0);
                    strokeWeight(1);
                    text("hi, you can hear me? how strange...", mouseX, mouseY);
                }
            }
            pop();
            push();
            if (
                mouseX < width / 2 + 200 &&
                mouseX > width / 2 - 200 &&
                mouseY < 250
            ) {
                if (mouseIsPressed) {
                    textSize(25);
                    stroke(0);
                    strokeWeight(1);
                    text("do you look down on me b/c i am younger?", 120, 400);
                }
            }
            pop();
            push();
            if (mouseX < width / 2 + 200 && mouseX > width / 2 - 200 && mouseY < 250) {
                if (mouseIsPressed) {
                    textSize(25);
                    stroke(0);
                    strokeWeight(1);
                    text("I am what you feel, not what you hear.", 330, 460);
                }
            }
            pop();
        }
        pop();
        //   }
        // push();
        //     if (mouseX < width/2 + 20 && mouseX > width/2 -40 && mouseY<250){
        //     if (mouseIsPressed){
        //       textSize(25);
        //       stroke(0);
        //       strokeWeight(1);
        //       text('I am what you feel, not what you hear.', mouseX, mouseY);
        //     }
        //   }
        //     pop();
        //   }
        pop();
        push();
        if (
            mouseX < width / 2 + 200 &&
            mouseX > width / 2 + 200 &&
            mouseY > 250
        ) {
            if (mouseIsPressed) {
                textSize(25);
                stroke(0);
                strokeWeight(1);
                text("You think that I dont understand?", 125, 80);
            }
        }
        pop();
    }
    console.log(mouseX, mouseY);

    function mousePressed() {
        stroke(255, 0, 0);
        circle(mouseX, mouseY, 100);
    }
}

