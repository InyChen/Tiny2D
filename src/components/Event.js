export default class Event {
    constructor({ eventName, originEvent, x, y }) {
        this.eventName = eventName;
        this.originEvent = originEvent;
        this.x = x;
        this.y = y;
        this.isStop = false; //是否继续冒泡
    }

    stop() {
        this.isStop = true;
    }
}