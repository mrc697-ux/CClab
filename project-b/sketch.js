let img;
let img2;
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
let landscape; 

let bpm = 0.5;

let anatomies = [];


let headSentences = [
  "I see into your thoughts...",
  "bones tell stories that flesh forgets...",
  "the heart beats even when unseen...",
  "isten closely to what whispers beneath...",
  "here's a brand new sentence!", 
]
let curSentence = 0
let showSentence = ""



function preload() {
  landscape = loadImage('desertqueen.jpg');
  anatomies.push(
    new Anatomy(
      loadImage("skullqueen.headlessandarmless .avif"),
      null,
      500 / 2,
      300 / 2,
      50
    )
  );

  anatomies.push(
    new Anatomy(
      loadImage("skullqueenhead.png"),
      loadSound("lionroar.m4a"),
      500 / 2,
      300 / 2,
      200
    )
  );

  // anatomies.push(
  //   new Anatomy(
  //     loadImage("heartcrop" + i + ".png"),
  //     loadSound("incendiooo2.m4a"),
  //     500/2,
  //     300/2,
  //     200
  //   )
  //   );

  anatomies.push(
    new Anatomy(
      loadImage("skeletonhandcrop.png"),
      loadSound("incendiooo2.m4a"),
      870 / 2,
      406 / 2,
      100
    )
  );

  img = loadImage("sknohead.png");
  img2 = loadImage("skullqueenhead.png");
  sound1 = loadSound("incendiooo2.m4a");
  sound2 = loadSound("loudheart.m4a");
  for (let i = 1; i <= 10; i++) {
    scanned.push(loadImage("heartcrop" + i + ".png"));
  }
}
function setup() {
  createCanvas(800, 600);
  eraseBg(scanned, 10);
  eyes = crop(scanned, 100, 10, 500, 500);
}

function draw() {
  background(landscape)
  textSize(15);
  stroke(0);
  strokeWeight(1);
  text("pretend the chaos belongs to me…I am your kin, your mystery...", 40, 350);
  textSize(12);
  stroke(0);
  strokeWeight(1);
  text("Look at how everyone has gathered...", 500, 35);
  text("the ecosystem continues on...", 620, 300);
  text("I may be gone but I still matter...", 620, 530);

  //image(img, 400,0,350,350);
  //fill("red");
  //rect(200, 200, 400, 300);

  
  
  
  if (mouseX > 300 && mouseX < 600 && mouseY > 100 && mouseY < 300) {
    if (sound1.isPlaying() == false) {
      sound1.loop();
    }
    console.log("play sound");
    //textdropping
    
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



  for (let i = 0; i < anatomies.length; i++) {
    anatomies[i].display();
    anatomies[i].update();
  }

  // examples: eye
  push();
  translate(100, 100);
  rotate(radians(0));
  image(eyes[curEye], 0, 0, eyes[0].width * 0.5, eyes[0].height * 0.5);
  pop();

  curEye = floor((frameCount / (1 / bpm)) % eyes.length);

  // curEye is the index of the frame we're displaying
  // if curEye is zero, this means we're looking at the
  // first frame of the animation; when this is the
  // case: we start playing a short heartbeat sample
  // but only if we are not already playing it

  /*
  if (curEye == 0 && heartbeat.isPlaying() == false) {
    heartbeat.play();
  }
  */

  // reduce pulse rate slowly
  if (bpm > 0.25) {
    bpm -= 0.001;
  }
  //console.log(bpm);

  noCursor();
  push();
  translate(mouseX, mouseY);
  rotate(radians(map(sin(frameCount / 20), -1, 1, -30, 30)));
  textSize(96);
  textAlign(CENTER, CENTER);
  text("🫴🏼", 50, 0);
  pop();
}

function mousePressed() {
  bpm += 0.25;
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

// class textF{
//   constructor(){
//     this.x = x;
//     ...
//   }
//     //update for movement and display for it to appear

// }

class Anatomy {
  constructor(img, sound, x, y, r) {
    this.img = img;
    this.sound = sound;
    this.x = x;
    this.y = y;
    this.r = r;
  }

  display() {
    push();
    translate(this.x, this.y);
    if (this.isOver()) {
      rotate(radians(random(-10, 10)));
    }
    imageMode(CENTER);
    image(this.img, 0, 0, this.img.width / 2, this.img.height / 2);
    pop();
  }

  update() {
    if (this.isOver() == true) {
      if (this.sound != null && this.sound.isPlaying() == false) {
        this.sound.loop();
        bpm += 0.25;
        console.log("Playing sound, current bpm is " + bpm);
      }
    } else {
      if (this.sound != null && this.sound.isPlaying() == true) {
        this.sound.pause();
        console.log("Stopping sound");
      }
    }
  }

  isOver() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }
}
