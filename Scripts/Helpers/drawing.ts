/// <reference path="../libs/typings/raphael.d.ts" />

/**
 * Base class for classes that can be drawn.
 */
export class Drawable {

    // The constructor receives the RaphaelPaper instance to which it can draw
    constructor(public paper: RaphaelPaper) { }

    // We don't draw anything here, this should be implemented by child classes
    public draw() { }
}

/**
 * Base class for a collection of drawables.
 */
export class CompositeDrawable extends Drawable {

    // The constructor receives the RaphaelPaper instance to which it can draw
    constructor(public paper: RaphaelPaper) {
        super(paper);
    }

    // The collection of drawables
    public Drawables: Drawable[] = [];
    
    // We draw all the drawables in the composite
    public draw() {
        for (var i = 0; i < this.Drawables.length; ++i) {
            this.Drawables[i].draw();
        }
    }
}