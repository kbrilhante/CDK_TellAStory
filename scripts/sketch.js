let images = {
    imgs: [],
    next: "",
    theEnd: "",
    ready: "",
};

let participants = [];

let titles = [];

let gameInfo = {
    background: 0,
    img: "",
    milli: 0,
    player: "",
    action: "",
    status: 0, // 0 = ready, 1 = next, 2 = random image, 3 = the end
}

function preload() {
    document.getElementById("lblParticipants").innerText = random(PARTICIPANTSTITLES) + ":";
    document.getElementById("divSetup").hidden = false;
    images.next = loadImage("./ibagens/next.png");
    images.ready = loadImage("./ibagens/ready.png");
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

    gameInfo.img = images.ready;
    noLoop();
}

function draw() {
    background(gameInfo.background);
    image(gameInfo.img, width / 2, height / 2, width * 0.8, height * 0.8);
    // write player's name on screen
    write(gameInfo.player, 30, 10, 10);
    write(gameInfo.action, 26, 10, 44);
    if (gameInfo.milli <= millis() && gameInfo.milli != 0) handleChange();
}

function write(txt, size, x, y) {
    push();
    stroke(255);
    strokeWeight(2);
    strokeJoin(BEVEL);
    fill(0);
    textFont("Segoe UI");
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    textSize(size);
    text(txt, x, y);
    pop();
}

function handleChange() {
    switch (gameInfo.status) {
        case 0:
            nextPlayer();
            break;
        case 1:
            changeImg();
            break;
        case 2:
            nextPlayer();
            break;
        case 3:
            endGame();
        default:
            gameInfo.status = 0;
            break;
    }
}

function changeBG() {
    push();
    colorMode(HSL, 100);
    gameInfo.background = color(random(100), 50, 70);
    pop();
}

function changeImg() {
    changeBG();
    gameInfo.status = 2;
    gameInfo.img = random(images.imgs);
    gameInfo.milli = setTimer(random(20000, 30000));
}

function nextPlayer() {
    changeBG();
    gameInfo.status = 1;
    gameInfo.player = participants.shift();
    gameInfo.player ? next() : theEnd();
}

function next() {
    gameInfo.action = "is " + random(PARTICIPANTSACTIONS);
    gameInfo.img = images.next;
    gameInfo.milli = setTimer(random(20000, 30000));
}

function ready() {
    changeBG();
    gameInfo.status = 0;
    gameInfo.player = "";
    gameInfo.action = "";
    gameInfo.img = images.ready;
    gameInfo.milli = setTimer(5000);
}

function theEnd() {
    changeBG();
    gameInfo.status = 3;
    gameInfo.player = "";
    gameInfo.action = "";
    gameInfo.img = images.theEnd;
    gameInfo.milli = setTimer(10000);
}

function setTimer(time) {
    return millis() + time;
}

function setListeners() {
    document.getElementById("btnBegin").onclick = begin;
}

function begin() {
    participants = getParticipants();
    console.log(participants)
    if (participants.length) {
        ready();
        document.getElementById("title").innerText = random(titles);
        document.getElementById("divGame").hidden = false;
        document.getElementById("divSetup").hidden = true;
        loop();
    }
}

function getParticipants() {
    const part = document.getElementById("txtParticipants").value.split("\n");
    for (let i = 0; i < part.length; i++) {
        part[i] = part[i].trim();
        if (!part[i]) part.splice(i, 1);
    }
    return shuffle(part);
}

function endGame() {
    gameInfo.milli = 0;
    document.getElementById("title").innerText = random(titles);
    document.getElementById("divGame").hidden = true;
    document.getElementById("divSetup").hidden = false;
    noLoop();
}