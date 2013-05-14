/// <reference path="libs/typings/kinetic.d.ts" />

/**
* Interface for objects that can draw themselves to the screen.
*/
export interface IDrawable {
    draw(layer: Kinetic.Layer);
}

/**
* Interface for objects that can be animated.
*/
export interface IAnimatable extends IDrawable {
    startAnimating(layer: Kinetic.Layer);
    stopAnimating();
}

/**
* Base class for classes that want to draw to a canvas.
*/
export class Drawable implements IDrawable {
    constructor(public stage: Kinetic.Stage) { }

    // We don't draw anything here, this should be implemented by child classes
    public draw(layer: Kinetic.Layer) { }
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

    constructor(public stage: Kinetic.Stage) {
        super(stage);
    }

    public startAnimating(layer: Kinetic.Layer) {
        // Draw to the screen
        this.draw(layer);
    }

    public stopAnimating() {
       // TODO: 
    }
}

/**
 * A simple point class.
 */
export class Point {
    constructor(public x: number = 0, public y: number = 0) { }
}