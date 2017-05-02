import Stage from "./components/Stage"
import Rect from "./components/Rect"

let maxWidth = document.body.offsetWidth;
let maxHeight = document.body.offsetHeight

let stage = new Stage({
    canvas: document.getElementById("myCanvas"),
    height: maxHeight,
    width: maxWidth
});

for (let i = 0; i < 1000; i++) {
    let red = Math.round(255 * Math.random()),
        green = Math.round(255 * Math.random()),
        blue = Math.round(255 * Math.random());
    let rect = new Rect({
        x: (maxWidth - 10) * Math.random(),
        y: (maxHeight - 10) * Math.random(),
        height: 10,
        width: 10,
        background: `rgba(${red},${green},${blue},1)`
    });
    stage.addObject(rect);
}


stage.update();