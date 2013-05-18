/// <reference path="../libs/typings/raphael.d.ts" />

import Vector = module('helpers/vector');
import Drawing = module('helpers/drawing');

/**
 * This class forms the base of any particle implementation. It defines a set of properties
 * shared by all particles and some common methods and properties. It extends from the 
 * Drawable class to render the particle to the screen.
 */
export class Particle extends Drawing.Drawable {
    coordinate: Vector.Vector2d = new Vector.Vector2d();
    movement: Vector.Vector2d = new Vector.Vector2d();
    dt: number;
    color: string;
    iteration: number = 1;

    // The constructor receives the RaphaelPaper instance to which it can draw
    constructor(public paper: RaphaelPaper) {
        super(paper);

        this.dt = 1.0 / Drawing.framesPerSecond;
    }

    /**
     * Update the particle's coordinates.
     */
    public update() {
        this.coordinate = this.coordinate.add(this.movement.multiply(this.dt));
        this.iteration += 1;
    }
}