import Stage from "../components/Stage";
import Rect from "../components/Rect";
import ImageView from "../components/ImageView";
import Tween from "../components/Tween";

const girlImageUrl = require("../static/imgs/bg.jpg");
let img = new Image();
img.src = girlImageUrl;
let context;
img.onload = function() {
    let cvs = document.createElement("canvas");
    cvs.height = this.height;
    cvs.width = this.width;
    context = cvs.getContext("2d");
    context.drawImage(img, 0, 0, this.width, this.height);

    addTiles();
};

let maxWidth = document.body.offsetWidth;
let maxHeight = document.body.offsetHeight;
let ratio = devicePixelRatio;
let canvas = document.getElementById("myCanvas");

let stage = new Stage({
    canvas: canvas,
    height: maxHeight,
    width: maxWidth
});

let formated = false;
let imageWidth = 400;
let imageHeight = 400;
let tileWidth = 40;
let tileHeight = 40;
let rowSize = Math.floor(
    imageWidth % tileWidth == 0 ?
    imageWidth / tileWidth :
    imageWidth / tileWidth + 1
);
let colSize = Math.floor(
    imageHeight % tileHeight == 0 ?
    imageHeight / tileHeight :
    imageHeight / tileHeight + 1
);
let totalCount = imageHeight / tileWidth * (imageWidth / tileWidth);

function addTiles() {
    for (let i = 0; i < totalCount; i++) {
        let x = Math.floor(i % rowSize),
            y = Math.floor(Math.floor(i / colSize));

        let spriteData = context.getImageData(
            x * tileWidth,
            y * tileHeight,
            tileWidth,
            tileHeight
        );
        let imageView = new ImageView({
            x: x * 40 + 100,
            y: y * 40 + 100,
            height: tileHeight,
            width: tileWidth,
            imgData: spriteData
        });

        stage.addObject(imageView);
    }
    formated = true;
    setInterval(() => {
        canvas.click();
    }, 4500);
}
canvas.addEventListener("click", function() {
    for (let i = 0; i < stage.objectList.length; i++) {
        if (formated) {
            stage.objectList[i].moveTo({
                    x: Math.floor((maxWidth - 10) * Math.random()),
                    y: Math.floor((maxHeight - 10) * Math.random())
                },
                3000,
                Tween.Cubic.easeInOut
            );
        } else {
            let x = Math.floor(i % 10),
                y = Math.floor(Math.floor(i / 10));

            stage.objectList[i].moveTo({ x: x * 40 + 100, y: y * 40 + 100 },
                3000,
                Tween.Cubic.easeInOut
            );
        }
    }
    formated = !formated;
});

let move = () => {
    stage.update();
    requestAnimationFrame(move);
};
move();