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

/**
 * Base class for drawables can also be animated.
 */
export class AnimatedDrawable extends Drawable implements IAnimatable {

    // The handle returned by the requestAnimationFrame method. We will
    // be using this handle to allow animation to be stopped.
    private animationHandle: number;

    // Indicates if animating is already happening
    private animating: bool;

    constructor(public ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public startAnimating() {

        // Request an animation frame for the current method. 
        // This will cause this method to be called to render
        // in around 60 FPS
        this.animationHandle = window.requestAnimationFrame(function () => {
            this.startAnimating()
        });

        // Draw to the screen
        this.draw();
    }

    public stopAnimating() {
        window.cancelAnimationFrame(this.animationHandle);
    }
}