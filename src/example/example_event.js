import Stage from "../components/Stage";
import Rect from "../components/Rect";
import ImageView from "../components/ImageView";
import Tween from "../components/Tween";

let canvas = document.getElementById("myCanvas");

let stage = new Stage({
    canvas: canvas
});

(function() {
    for (let i = 0; i < 20; i++) {
        let rect = new Rect({
            x: i * 20 + 100,
            y: i * 20 + 100,
            width: 100,
            height: 100,
            background: `rgba(${i * 12},${i * 12},${i * 12},1)`
        });
        rect.on("mousemove", function(x, y) {
            stage.removeObject(this);
            stage.addObject(this);
            return false;
        });
        stage.addObject(rect);
    }
})();

stage.start();