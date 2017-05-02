import Stage from "./components/Stage"
import Rect from "./components/Rect"
import Tween from "./components/Tween"

let maxWidth = document.body.offsetWidth;
let maxHeight = document.body.offsetHeight
let ratio = devicePixelRatio;
let canvas = document.getElementById("myCanvas");

let stage = new Stage({
    canvas: canvas,
    height: maxHeight,
    width: maxWidth
});

canvas.addEventListener("click", function() {
    for (let i = 0; i < 100; i++) {
        let red = Math.round(255 * Math.random()),
            green = Math.round(255 * Math.random()),
            blue = Math.round(255 * Math.random());
        let rect = new Rect({
            x: Math.round((maxWidth - 50) * Math.random()),
            y: Math.round((maxHeight - 50) * Math.random()),
            height: 50,
            width: 50,
            background: `rgba(${red},${green},${blue},1)`
        });
        rect.moveTo({ x: 0, y: 0 }, 3000, Tween.Cubic.easeInOut, function(r) {
            console.log(r + " animate finished.");
        });
        stage.addObject(rect);
    }
    stage.update();
});

let move = () => {
    stage.update();
    stage.objectList = stage.objectList.filter(function(item) {
        return item.currentAnimate;
    });
    requestAnimationFrame(move);
}
move();

setInterval(() => {
    canvas.click();
}, 1000)