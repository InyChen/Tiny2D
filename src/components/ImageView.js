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
}