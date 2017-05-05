# Tiny2D
a light-weight 2d engine  
support canvas render.

## How to use
1. Add a canvas tag into your page.
2. Create a new instance of Stage:  
```js
let stage = new Stage({  
    canvas: document.getElementById("myCanvas")   
});   
```
3. Add Objects into the stage:  
```js
for (let i = 0; i < 20; i++) {
    let rect = new Rect({
        x: i * 20 + 100,
        y: i * 20 + 100,
        width: 100,
        height: 100,
        background: `rgba(${i * 12},${i * 12},${i * 12},1)`
    });
    rect.on("mousemove", function(e) {
        stage.showOnTop(this);
        return false;
    });
    stage.addObject(rect);
}
```

4. Now start the stage.  
```js
stage.start();
```