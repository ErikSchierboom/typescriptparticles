/// <reference path="../../libs/raphael.d.ts" />

import Vector = module('helpers/vector');
import Drawing = module('helpers/drawing');

/**
 * This class forms the base of any particle implementation. It defines a set of properties
 * shared by all particles and some common methods and properties. It extends from the 
 * Drawable class to render the particle to the screen.
 */
export class Particle extends Drawing.Drawable {
    location: Vector.Vector2d = new Vector.Vector2d();
    velocity: Vector.Vector2d = new Vector.Vector2d();
    acceleration: Vector.Vector2d = new Vector.Vector2d();
    lifetime: number = 255;
    color: string;
    
    constructor(public paper: RaphaelPaper) {
        super(paper);
    }

    /**
     * Update the particle's vectors and age.
     */
    public update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.lifetime -= 1;
    }

    /**
     * Indicates if the particle is dead.
     */
    public isDead() {
        return this.lifetime <= 0;
    }
}