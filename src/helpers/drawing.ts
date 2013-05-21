/// <reference path="../../libs/raphael.d.ts" />

/**
 * Base class for classes that can be drawn. The actual drawing is 
 * done on a RaphaelPaper instance.
 */
export class Drawable {

    constructor(public paper: RaphaelPaper) { }

    /**
     * Draw the instance to the paper.
     */
    public draw() {
        // We don't draw anything here; this should be implemented by child classes
    }
}

/**
 * Base class for a collection of drawables.
 */
export class CompositeDrawable extends Drawable {

    constructor(public paper: RaphaelPaper) {
        super(paper);
    }

    // The collection of drawables
    public Drawables: Drawable[] = [];
        
    /**
     * Drawing a composite is as simple as drawing all its drawables.
     * The composite itself does not draw anything.
     */
    public draw() {
        for (var i = 0; i < this.Drawables.length; ++i) {
            this.Drawables[i].draw();
        }
    }
}