export default class Stage {
    constructor({ canvas, height, width, background, debug }) {
        this.height = canvas.height = height;
        this.width = canvas.width = width;
        this.background = background || "transparent";
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, width, height);
        this.objectList = [];
        this.debug = debug || true;
    }

    addObject(...objs) {
        objs.forEach(obj => {
            obj.parent = this;
            this.objectList.push(obj);
        });
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