import Stage from "../components/Stage";
import Rect from "../components/Rect";
import ImageView from "../components/ImageView";
import Tween from "../components/Tween";

let canvas = document.getElementById("myCanvas");

let stage = new Stage({
    canvas: canvas
});

let checkedRect = new Rect({
    x: 0,
    y: 350,
    width: 50,
    height: 50,
    background: `rgba(255,255,255,0)`
});
for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
        let rect = new Rect({
            x: x * 8,
            y: y * 8,
            width: 8,
            height: 8,
            background: `rgba(${x*5%256},${y*5%256},255,1)`
        });

        rect.on("mouseover", function(e) {
            this._background = this.background;
            this.background = "rgba(255,255,255,1)";
            checkedRect.background = this._background;
            return false;
        });
        rect.on("mouseout", function(e) {
            this.background = this._background;
            return false;
        });
        stage.addObject(rect);
    }
}
stage.addObject(checkedRect);
stage.start();