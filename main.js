const folder = '/ibagens/';
let ibagens = [];
let bgColor;

function preload() {
    ibagens = loadPictures("." + folder);
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background("yellow");
    if (ibagens.length) {
        image(ibagens[0], 0, 0, width, height);
    }
}

function loadPictures(folderPath) {
    let imgs = [];
    httpGet(folderPath, 'text', true, (response) => {
        let lstIbagens = [];
        const div = document.createElement("div");
        div.innerHTML = response;
        const files = div.querySelector("#files");
        const arrayLinks = files.querySelectorAll("a");
        for (let i = 0; i < arrayLinks.length; i++) {
            const a = arrayLinks[i];
            if (a.href.includes(folder)) {
                lstIbagens.push(a.href);
            }
        }
        for (let i = 0; i < lstIbagens.length; i++) {
            const file = lstIbagens[i];
            const ibagem = loadImage(file);
            imgs.push(ibagem)
        }
    });
    return imgs;
}
