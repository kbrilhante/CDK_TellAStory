const IMAGESNUMBER = 78;

let images = {
    imgs: [],
    next: "",
    theEnd: "",
};

let participants = [];

let titles = [];

let imgInfo = {
    background: 0,
    img: "",
    milli: 0,
    player: "Squeaky",
}

function preload() {
    images.next = loadImage("./ibagens/next.png");
    images.theEnd = loadImage("./ibagens/theEnd.png");
    for (let i = 1; i <= IMAGESNUMBER; i++) {
        images.imgs.push(loadImage("./ibagens/" + i + ".png"));
    }
    titles = loadStrings("./story_titles.txt");
    setListeners();
}

function setup() {
    let scrSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    scrSize *= 0.8;
    const canvas = createCanvas(scrSize, scrSize);
    canvas.parent("game");

    frameRate(60);

    imageMode(CENTER);

    imgInfo.img = images.theEnd;
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
    imgInfo.player = participants.shift();
    console.log(imgInfo)
    console.log(participants)
    imgInfo.img = images.next;
    imgInfo.milli = millis() + 20000;
}

function setListeners() {
    document.getElementById("btnBegin").onclick = begin;
}

function begin() {
    participants = getParticipants();
    nextPlayer();
    document.getElementById("title").innerText = random(titles);
    document.getElementById("divGame").hidden = false;
    document.getElementById("divSetup").hidden = true;
    loop();
}

function getParticipants() {
    const part = document.getElementById("txtParticipants").value.split("\n");
    for (let i = 0; i < part.length; i++) {
        part[i] = part[i].trim();
    }
    return shuffle(part);
}