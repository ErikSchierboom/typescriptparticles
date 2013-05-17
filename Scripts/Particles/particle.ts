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
    vx: number;
    vy: number;
    dt: number;
    color: string;

    // The constructor receives the RaphaelPaper instance to which it can draw
    constructor(public paper: RaphaelPaper) {
        super(paper);
    }

    /**
     * Update the particle's coordinates.
     */
    public update() {
        this.coordinate.x += this.horizontalMovement;
        this.coordinate.y += this.verticalMovement;
    }

    // Properties for retrieving the horizontal and vertical movement
    get horizontalMovement(): number { return this.vx * this.dt; }
    get verticalMovement(): number { return this.vy * this.dt; }
}