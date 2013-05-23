/// <reference path="../../libs/raphael.d.ts" />

import Color = module('helpers/color');
import Vector = module('helpers/vector');
import Random = module('helpers/random');
import Drawing = module('helpers/drawing');
import Particle = module('particles/particle');

/**
 * This class extends the Particle class to creating an explosion particle.
 */
export class ExplosionParticle extends Particle.Particle {
    
    static MaximumAge: number = 200;

    constructor(public paper: RaphaelPaper) {
        super(paper);
    }
    
    /**
     * Indicates if the particle is dead.
     */
    public isDead() {
        return this.age >= ExplosionParticle.MaximumAge;
    }

    /**
     * Get the initial radius of the particle.
     */
    public getInitialRadius() {
        return Random.Random.inRange(5, 6);
    }

    /**
     * Get the initial acceleration of the particle.
     */
    public getInitialAcceleration() {
        return new Vector.Vector2d(0, 0.05);
    }

    /**
     * Get the initial location of the particle.
     */
    public getInitialLocation() {
        return new Vector.Vector2d(this.paper.width / 2, this.paper.height / 2);
    }

    /**
     * Get the initial velocity of the particle.
     */
    public getInitialVelocity() {
        return new Vector.Vector2d(Random.Random.inRange(-4, 4), Random.Random.inRange(-4, 4));
    }

    /**
     * Get the initial color of the particle.
     */
    public getInitialColor() {
        return new Color.Color(Math.floor(Random.Random.inRange(0, 60)));
    }
}