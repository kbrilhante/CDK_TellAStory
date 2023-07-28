const folder = '/ibagens/';
let lstIbagens = [];
let ibagens = [];

function preload() {
    listFilesInFolder("." + folder);
}


function setup() {
    noCanvas();
    console.log(ibagens)
}

async function listFilesInFolder(folderPath) {
    httpGet(folderPath, 'text', true, (response) => {
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
            ibagens.push(ibagem)
        }
    });
}