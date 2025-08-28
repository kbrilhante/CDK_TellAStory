let images = {
    imgs: [],
    next: "",
    theEnd: "",
    ready: "",
};

let gameInfo = {
    participantsTitles: [],
    participantsActions: [],
    participants: [],
    imgs: [],
    titles: [],
    background: 0,
    img: "",
    imgIndex: 0,
    milli: 0,
    player: "",
    action: "",
    status: 0, // 0 = ready, 1 = next, 2 = random image, 3 = the end
}

function preload() {
    gameInfo.participantsTitles = loadStrings(PARTICIPANTS_TITLES_URL);
    gameInfo.participantsActions = loadStrings(PARTICIPANTS_ACTIONS_URL);
    images.next = loadImage(IMAGE_NEXT);
    images.ready = loadImage(IMAGE_READY);
    images.theEnd = loadImage(IMAGE_THE_END);
    for (let i = 1; i <= IMAGES_NUMBER; i++) {
        images.imgs.push(loadImage(IMAGES_FOLDER + i + ".png"));
    }
    gameInfo.titles = loadStrings(STORY_TITLES_URL);
    document.getElementById("btnBegin").onclick = begin;
}

function setup() {
    document.getElementById("lblParticipants").innerText = random(gameInfo.participantsTitles) + ":";
    document.getElementById("divSetup").hidden = false;

    let scrSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    scrSize *= 0.7;
    const canvas = createCanvas(scrSize, scrSize);
    canvas.parent("game");

    frameRate(60);

    imageMode(CENTER);

    gameInfo.img = images.ready;
    gameInfo.titles = shuffle(gameInfo.titles)
    noLoop();
}

function draw() {
    background(gameInfo.background);
    image(gameInfo.img, width / 2, height / 2, width * 0.8, height * 0.8);
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
    textWrap(WORD);
    text(txt, x, y, width - 2 * x);
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
    gameInfo.img = gameInfo.imgs.shift();
    gameInfo.milli = setTimer(random(20000, 30000));
}

function nextPlayer() {
    changeBG();
    gameInfo.player = gameInfo.participants.shift();
    gameInfo.player ? next() : theEnd();
}

function next() {
    gameInfo.status = 1;
    gameInfo.action = "is " + random(gameInfo.participantsActions);
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

function begin() {
    gameInfo.participants = getParticipants();
    gameInfo.imgs = shuffle(images.imgs);
    if (gameInfo.participants.length) {
        ready();
        document.getElementById("title").innerText = gameInfo.titles.shift();
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
    document.getElementById("divGame").hidden = true;
    document.getElementById("divSetup").hidden = false;
    noLoop();
}