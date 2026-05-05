let img;
let sound1;
let scanned = [];
let eyes;
let rockets;
let doodles1;
let doodles2;
let sound2;
let curEye = 0;
let curRocket = 0;
let rocketY = 500;
let rocketSpeedY = 0;
let curDoodle1 = 0;
let curDoodle2 = 0;

function preload() {
  img = loadImage("tres bones betta.jpg");
  sound1 = loadSound("Xylophone Sound Effect Download.mp3");
  sound2 = loadSound('Heart Beat SOUND EFFECT.mp3');
  for (let i = 1; i <= 10; i++) {
    scanned.push(loadImage("heart" + i + ".jpg"));
  }

}
function setup() {
  createCanvas(800, 800);
  eraseBg(scanned, 10);
  eyes = crop(scanned, 100, 100, 600, 600);
}

function draw() {
  background(220);

  textSize(20);
  stroke(0);
  strokeWeight(1);
  text("HERE, below the surface it pulsates…rippling outward…", 100, 500);
  textSize(20);
  stroke(0);
  strokeWeight(1);
  text("sturdy and innate as our bones...", 100, 530);


  image(img, 400, 0, 350, 350);
  //fill("red");
  //rect(200, 200, 400, 300);
  if (mouseX > 300 && mouseX < 600 && mouseY > 100 && mouseY < 300) {
    if (sound1.isPlaying() == false) {
      sound1.loop();
    }
    console.log("play sound");
  } else {
    sound1.pause();
    console.log("stop sound");
  }
  if (mouseX > 100 && mouseX < 300 && mouseY > 400 && mouseY < 600) {
    if (!sound2.isPlaying()) {
      sound2.loop();
    }
  } else {
    sound2.pause();
  }

  // examples: eye

  push();
  translate(100, 100);
  rotate(radians(0));
  image(
    eyes[curEye],
    0,
    0,
    eyes[0].width * 0.25,
    eyes[0].height * 0.25
  );
  pop();

  curEye = floor((frameCount / 20) % eyes.length);



}

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}




