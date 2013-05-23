/// <reference path="../../libs/raphael.d.ts" />

import Color = module('helpers/color');
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
    color: Color.Color;
    radius: number;
    age: number = 0;
    
    constructor(public paper: RaphaelPaper) {
        super(paper);

        this.reset();
    }

    /**
     * Draw the particle to the canvas.
     */
    public draw() {
        var particleAsCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
        particleAsCircle.attr('fill', this.color.toRaphaelString());
        particleAsCircle.attr('fill-opacity', this.getOpacity());
    }

    /**
     * Reset the particle.
     */
    public reset() {
        this.radius = this.getInitialRadius();
        this.location = this.getInitialLocation();
        this.acceleration = this.getInitialAcceleration();
        this.velocity = this.getInitialVelocity();
        this.color = this.getInitialColor();
        this.age = 0;
    }

    /**
     * Update the particle's vectors and age.
     */
    public update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.age += 1;
    }

    /**
     * Get the opacity.
     */
    public getOpacity() {
        return 1.0;
    }

    /**
     * Indicates if the particle is dead.
     */
    public isDead() {
        throw 'You should override this method in the descendant class.';
    }

    /**
     * Get the initial radius of the particle.
     */
    public getInitialRadius(): number {
        throw 'You should override this method in the descendant class.';
    }

    /**
     * Get the initial acceleration of the particle.
     */
    public getInitialAcceleration(): Vector.Vector2d {
        throw 'You should override this method in the descendant class.';
    }

    /**
     * Get the initial location of the particle.
     */
    public getInitialLocation(): Vector.Vector2d {
        throw 'You should override this method in the descendant class.';
    }

    /**
     * Get the initial velocity of the particle.
     */
    public getInitialVelocity(): Vector.Vector2d {
        throw 'You should override this method in the descendant class.';
    }

    /**
     * Get the initial color of the particle.
     */
    public getInitialColor(): Color.Color {
        throw 'You should override this method in the descendant class.';
    }
}