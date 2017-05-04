/**
 * 所有对象的基类
 */
export default class Item {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = x;
        this.y = y;
        this.animateList = [];
        this.currentAnimate = null;
        this.eventListenerPool = {};
    }

    //判断点是否在元素区域内
    containsPoint(x, y) {
        return x == this.x && y == this.y;
    }

    //点击事件
    onClick(x, y) {
        let listeners = this.eventListenerPool["click"];
        let stop = false;
        listeners &&
            listeners.forEach(callback => {
                if (!stop) {
                    stop = callback.call(this, x, y);
                }
            });
        return stop;
    }

    //提供事件绑定
    on(eventName, callback) {
        if (this.eventListenerPool[eventName] == null) {
            this.eventListenerPool[eventName] = [];
        }
        this.eventListenerPool[eventName].push(callback);
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
                //如果已经超出过渡时间,直接变为目标状态
                if (
                    time - this.currentAnimate.startTime > this.currentAnimate.duration
                ) {
                    this[x] = this.currentAnimate.target[x];
                } else {
                    this[x] = Math.floor(
                        this.currentAnimate.func(
                            time - this.currentAnimate.startTime,
                            this.currentAnimate.startStatus[x],
                            this.currentAnimate.target[x] -
                            this.currentAnimate.startStatus[x],
                            this.currentAnimate.duration
                        )
                    );
                }

                if (this[x] != this.currentAnimate.target[x]) {
                    finish = false;
                }
            }
            if (finish) {
                this.currentAnimate.callback && this.currentAnimate.callback(this);
                this.currentAnimate = null;
            }
        }
    }
}