import Item from "./Item"

export default class Rect extends Item {
    constructor({ x, y, height, width, background, border } = {}) {
        super({ x, y });
        this.width = width;
        this.height = height;
        this.background = background;
        this.border = border;
    }
}