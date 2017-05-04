import Stage from "./components/Stage";
import Rect from "./components/Rect";
import ImageView from "./components/ImageView";
import Tween from "./components/Tween";

const girlImageUrl = require("./static/imgs/bg.jpg");
let img = new Image();
img.src = girlImageUrl;
let context;
img.onload = function() {
    let cvs = document.createElement("canvas");
    cvs.height = this.height;
    cvs.width = this.width;
    context = cvs.getContext("2d");
    context.drawImage(img, 0, 0, this.width, this.height);
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
canvas.addEventListener("click", function() {
    console.log(formated);
    if (!stage.objectList || stage.objectList.length == 0) {
        for (let i = 0; i < 100; i++) {
            let x = Math.floor(i % 10),
                y = Math.floor(Math.floor(i / 10));

            let spriteData = context.getImageData(x * 40, y * 40, 40, 40);
            let imageView = new ImageView({
                x: Math.floor((maxWidth - 10) * Math.random()),
                y: Math.floor((maxHeight - 10) * Math.random()),
                height: 40,
                width: 40,
                imgData: spriteData
            });

            stage.addObject(imageView);
        }
    }

    if (formated) {
        for (let i = 0; i < stage.objectList.length; i++) {
            stage.objectList[i].moveTo({
                    x: Math.floor((maxWidth - 10) * Math.random()),
                    y: Math.floor((maxHeight - 10) * Math.random())
                },
                3000,
                Tween.Cubic.easeInOut,
                function(r) {
                    console.log(r + " 已打乱.");
                }
            );
        }
        formated = false;
    } else {
        for (let i = 0; i < stage.objectList.length; i++) {
            let x = Math.floor(i % 10),
                y = Math.floor(Math.floor(i / 10));

            stage.objectList[i].moveTo({ x: x * 40 + 100, y: y * 40 + 100 },
                3000,
                Tween.Cubic.easeInOut,
                function(r) {
                    console.log(r + " 已整齐.");
                }
            );
        }
        formated = true;
    }

    stage.update();
});

let move = () => {
    stage.update();
    requestAnimationFrame(move);
};
move();

setInterval(() => {
    canvas.click();
}, 3500);