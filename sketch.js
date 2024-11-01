const IMAGESNUMBER = 78;

let images = {
    imgs: [],
    next: "",
    theEnd: "",
};
let participants = [];

let imgInfo = {
    background: 0,
    img: "",
    milli: 0,
}

function preload() {
    images.next = loadImage("./ibagens/next.png");
    images.theEnd = loadImage("./ibagens/theEnd.png");
    for (let i = 1; i <= IMAGESNUMBER; i++) {
        images.imgs.push(loadImage("./ibagens/" + i + ".png"));
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

    imgInfo.img = random(images.imgs);
    
    const rndTime = random(10000, 20000);
    imgInfo.milli = millis() + rndTime
}

function nextPlayer() {
    changeBG();

    imgInfo.img = images.next;
    imgInfo.milli = millis() + 20000;
}

function setListeners() {
    document.getElementById("btnBegin").onclick = begin;
}

function begin() {
    document.getElementById("divGame").hidden = false;
    
}