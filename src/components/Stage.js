export default class Stage {
    constructor({ canvas, height, width, background }) {
        this.height = canvas.height = height;
        this.width = canvas.width = width;
        this.background = background || "transparent";
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, width, height);
        this.objectList = [];
    }


    addObject(...objs) {
        objs.forEach((obj) => {
            obj.parent = this;
            this.objectList.push(obj);
        });
    }

    update() {
        let time = new Date().getTime();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.objectList.forEach((element) => {
            //计算最新位置
            element.update(time);

            this.ctx.fillStyle = element.background;
            this.ctx.fillRect(element.x, element.y, element.width, element.height);
        });
        time = new Date().getTime() - time;
        // console.log(`${this.objectList.length} objects rendered,update finished in ${time}ms`);
    }

}