export default class Stage {
    constructor({ canvas, height, width }) {
        this.width = canvas.height = height;
        this.height = canvas.width = width;
        this.background = "transparent";
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, width, height);

        this.objectList = [];
        this._lisenterList = {};
        this._updateIndex = null;

        this.on("update", () => {
            if (this._updateIndex) {
                cancelAnimationFrame(this._updateIndex);
                this._updateIndex = null;
            }
            this._updateIndex = requestAnimationFrame(this.update);
        });
    }


    addObject(...objs) {
        objs.forEach((obj) => {
            this.objectList.push(obj);
        });
    }


    _emit(eventName, payload) {
        if (!this._lisenterList[eventName]) {
            this._lisenterList[eventName].forEach((element) => {
                element(payload);
            });
        }
    }

    on(eventName, callback) {
        if (!this._lisenterList[eventName]) {
            this._lisenterList[eventName] = [];
        }
        this._lisenterList[eventName].push(callback);
    }


    update() {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.objectList.forEach((element) => {
            this.ctx.fillStyle = element.background;
            this.ctx.fillRect(element.x, element.y, element.width, element.height);
        });
    }

}