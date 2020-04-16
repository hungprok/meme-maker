const fs = require('fs');
const path = require('path');
const pathToData = path.join(__dirname, '../images.json');
const pathToMeme = path.join(__dirname, '../meme.json');


function loadData() {
    const buffer = fs.readFileSync(pathToData);
    const data = buffer.toString();
    return JSON.parse(data)
}

function saveData(data) {
    // console.log(data)
    fs.writeFileSync(pathToData,JSON.stringify(data));
}

function loadMeme() {
    const buffer = fs.readFileSync(pathToMeme);
    const data = buffer.toString();
    return JSON.parse(data)
}

function saveMeme(data) {
    // console.log(data)
    fs.writeFileSync(pathToMeme,JSON.stringify(data));
}


module.exports = {loadData,saveData, loadMeme, saveMeme}