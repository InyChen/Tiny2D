# Tiny2D
a light-weight 2d engine

一个轻量级2d引擎,支持canvas渲染

you can work with canvas in an easier way.

## How to use
1. Add a canvas tag in to your page.
2. Create a new instance of Stage:  
`let stage = new Stage({  
    canvas: document.getElementById("myCanvas")   
});   
`
3. Add Objects into the stage:  
`
for (let i = 0; i < 20; i++) {
    let rect = new Rect({
        x: i * 20 + 100,
        y: i * 20 + 100,
        width: 100,
        height: 100,
        background: ```rgba(${i * 12},${i * 12},${i * 12},1)```
    });
    rect.on("mousemove", function(e) {
        stage.showOnTop(this);
        return false;
    });
    stage.addObject(rect);
}
`

4. Now start the stage.  
`stage.start();`