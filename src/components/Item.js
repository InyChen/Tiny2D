/**
 * 所有对象的基类
 */
export default class Item {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = x;
        this.y = y;
        this.animateList = [];
        this.currentAnimate = null;
    }

    moveTo(target, duration, func, callback) {
        this.animateList.push({
            target: target,
            duration: duration,
            func: func,
            callback: callback
        });
    }

    update(time = new Date().getTime()) {
        if (!this.currentAnimate && this.animateList.length > 0) {
            this.currentAnimate = this.animateList.shift();
            this.currentAnimate.startStatus = {};
            this.currentAnimate.startTime = time;
            for (let x in this.currentAnimate.target) {
                this.currentAnimate.startStatus[x] = this[x];
            }
        }
        if (this.currentAnimate) {
            let finish = true;
            for (let x in this.currentAnimate.target) {
                this[x] = Math.floor(
                    this.currentAnimate.func(
                        time - this.currentAnimate.startTime,
                        this.currentAnimate.startStatus[x],
                        this.currentAnimate.target[x] - this.currentAnimate.startStatus[x],
                        this.currentAnimate.duration
                    )
                );
                if (this[x] != this.currentAnimate.target[x]) {
                    finish = false;
                }
            }
            if (finish) {
                console.log("animate finish");
                this.currentAnimate = null;
            }
        }
    }
}