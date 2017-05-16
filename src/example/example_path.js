import Stage from "../components/Stage";
import Rect from "../components/Rect";
import ImageView from "../components/ImageView";
import Tween from "../components/Tween";

let canvas = document.getElementById("myCanvas");

let stage = new Stage({
    canvas: canvas
});

let mapArray = [];
for (let x = 0; x < 20; x++) {
    let row = [];
    for (let y = 0; y < 20; y++) {
        let rect = new Rect({
            x: x * 20,
            y: y * 20,
            width: 20,
            height: 20,
            background: `rgba(${x*10%256},${y*10%256},255,1)`
        });
        row.push(rect);

        rect.on("click", function(e) {
            this.lock = true;
            this.background = "rgba(255,255,255,0.5)";
            findPath();
            return false;
        });
        stage.addObject(rect);
    }
    mapArray.push(row);
}

//起点终点
let startPoint = { x: 3, y: 6 },
    endPoint = { x: 15, y: 15 };
mapArray[startPoint.x][startPoint.y].background = "rgba(0,0,0,1)";
mapArray[endPoint.x][endPoint.y].background = "rgba(0,0,0,1)";

function findPath() {

}

function getFGH() {

}

stage.start();