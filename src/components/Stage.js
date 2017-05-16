import Event from "./Event";

export default class Stage {
    constructor({ canvas, height, width, background, debug }) {
        this.height = canvas.height = height || document.body.offsetHeight;
        this.width = canvas.width = width || document.body.offsetWidth;
        this.background = background || "transparent";
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, width, height);
        this.objectList = [];
        this.debug = debug || true;

        this.maxZ = 0;

        this.autoUpdate = false;

        this.mouseOverObject = null;

        canvas.addEventListener("click", e => {
            this.eventHandler.call(this, e);
        });
        canvas.addEventListener("mousemove", e => {
            this.eventHandler.call(this, e);
        });
    }

    eventHandler(e) {
        let event = new Event({
            eventName: e.type,
            x: e.offsetX,
            y: e.offsetY,
            originEvent: e
        });
        this.trigger.call(this, event);
    }

    trigger(e) {

        if (e.eventName == "mousemove") {
            if (this.mouseOverObject && this.mouseOverObject.containsPoint && !this.mouseOverObject.containsPoint(e.x, e.y)) {
                let event = new Event({
                    eventName: "mouseout",
                    x: e.x,
                    y: e.y,
                    originEvent: e.originEvent
                });
                this.mouseOverObject.trigger(event);
                this.mouseOverObject = null;
            }
        }

        for (let i = this.objectList.length - 1; i >= 0; i--) {
            let obj = this.objectList[i];
            if (obj.containsPoint && obj.containsPoint(e.x, e.y)) {
                if (e.eventName == "mousemove") {
                    if (this.mouseOverObject != null) {
                        let event = new Event({
                            eventName: "mouseout",
                            x: e.x,
                            y: e.y,
                            originEvent: e.originEvent
                        });
                        this.mouseOverObject.trigger(event);
                        this.mouseOverObject = null;
                    }
                    if (this.mouseOverObject != obj) {
                        e.eventName = "mouseover";
                        this.mouseOverObject = obj;
                    }
                }

                obj.trigger(e);
                break;
            }
        }
    }

    showOnTop(obj) {
        if (obj.z < this.maxZ - 1) {
            obj.z = this.maxZ;
            this.maxZ++;
            this.objectList.sort((a, b) => {
                return a.z - b.z;
            });
        }
    }

    addObject(...objs) {
        objs.forEach(obj => {
            obj.parent = this;
            if (obj._z == 0) {
                obj.z = this.maxZ;
                this.maxZ++;
            }
            this.objectList.push(obj);
        });
        this.objectList.sort((a, b) => {
            return a.z - b.z;
        });
    }
    removeObject(obj) {
        let index = this.objectList.indexOf(obj);
        if (!isNaN(index)) {
            return this.objectList.splice(index, 1);
        }
    }

    start() {
        this.autoUpdate = true;
        this._autoupdate();
    }

    stop() {
        this.autoUpdate = true;
    }

    pause() {
        this.autoUpdate = true;
    }

    _autoupdate() {
        this.update();
        if (this.autoUpdate) {
            requestAnimationFrame(() => {
                this._autoupdate();
            });
        }
    }

    update() {
        let time = new Date().getTime();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.objectList.forEach(element => {
            //计算最新位置
            element.update(time);
            element.drawTo(this.ctx);
        });

        time = new Date().getTime() - time;

        if (this.debug) {
            let fps = Math.round(time < 16.667 ? 60 : 1000 / time, 2);
            this.ctx.fillStyle = "rgba(255,255,255,0.5)";
            this.ctx.fillRect(0, 0, 200, 60);
            this.ctx.fillStyle = "#000000";
            this.ctx.font = "14px serif";
            this.ctx.fillText(`rendered:${this.objectList.length} objects`, 10, 20);
            this.ctx.fillText(`cost:${time} ms,${fps} fps`, 10, 40);
        }
    }
}