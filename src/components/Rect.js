import Item from "./Item";

export default class Rect extends Item {
    constructor({ x, y, height, width, background, border } = {}) {
        super({ x, y });
        this.width = width;
        this.height = height;
        this.background = background;
        this.border = border;
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

    drawTo(ctx) {
        ctx.fillStyle = this.background;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}