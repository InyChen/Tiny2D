import Item from "./Item";

export default class ImageView extends Item {
    constructor({ x, y, height, width, imgData } = {}) {
        super({ x, y });
        this.width = width;
        this.height = height;
        this.imgData = imgData;
    }

    drawTo(ctx) {
        ctx.putImageData(this.imgData, this.x, this.y);
    }

    //判断点是否在元素区域内
    containsPoint(x, y) {
        return (
            x >= this.x &&
            y >= this.y &&
            x <= this.x + this.width &&
            y <= this.y + this.height
        );
    }
}