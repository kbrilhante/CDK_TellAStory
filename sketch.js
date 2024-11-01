const IMAGESNUMBER = 78;

let images = [];
let next;
let participants = [];

let imgInfo = {
    background: 0,
    img: "",
    milli: 0,
}

function preload() {
    next = loadImage("./ibagens/next.png");
    for (let i = 1; i <= IMAGESNUMBER; i++) {
        images.push(loadImage("./ibagens/" + i + ".png"));
    }
    setListeners();
}

function setup() {
    let scrSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    scrSize *= 0.9;
    const canvas = createCanvas(scrSize, scrSize);
    canvas.parent("game");

    frameRate(60);

    imageMode(CENTER);

    nextPlayer();
    noLoop();
}

function draw() {
    background(imgInfo.background);
    image(imgInfo.img, width / 2, height / 2, width, height);
    if (imgInfo.milli <= millis()) changeImg();
}

function changeBG() {
    push();
    colorMode(HSL, 100);
    imgInfo.background = color(random(100), 50, 60);
    pop();
}

function changeImg() {
    changeBG();

    imgInfo.img = random(images);
    
    const rndTime = random(5000, 10000);
    imgInfo.milli = millis() + rndTime
}

function nextPlayer() {
    changeBG();

    imgInfo.img = next;
    imgInfo.milli = millis() + 20000;
}

function setListeners() {
    document.getElementById("btnBegin").onclick = begin;
}

function begin() {
    
}