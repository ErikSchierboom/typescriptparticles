/**
* Interface for objects that can draw themselves to the screen.
*/
export interface IDrawable {
    draw();
}

/**
* Interface for objects that can be animated.
*/
export interface IAnimatable extends IDrawable {
    startAnimating();
    stopAnimating();
}

/**
* Base class for classes that want to draw to a canvas.
*/
export class Drawable implements IDrawable {
    constructor(public ctx: CanvasRenderingContext2D) { }

    // We don't draw anything here, this should be implemented by child classes
    public draw() { }
}

