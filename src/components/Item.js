/**
 * 所有对象的基类
 */
export default class Item {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = x;
        this.y = y;
    }

}