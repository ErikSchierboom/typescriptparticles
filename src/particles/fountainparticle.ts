/// <reference path="../../libs/raphael.d.ts" />

import Color = module('helpers/color');
import Vector = module('helpers/vector');
import Random = module('helpers/random');
import Drawing = module('helpers/drawing');
import Particle = module('particles/particle');

/**
 * This class extends the Particle class to creating an fountain particle.
 */
export class FountainParticle extends Particle.Particle {
    
    constructor(public paper: RaphaelPaper) {
        super(paper);
    }

    /**
     * Indicates if the particle is dead.
     */
    public isDead() {

        // Fountain particles die when they fall off the bottom of the paper
        return this.location.y >= this.paper.height - this.radius;
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
        return new Vector.Vector2d(this.paper.width / 2, this.paper.height / 4);
    }

    /**
     * Get the initial velocity of the particle.
     */
    public getInitialVelocity() {
        return new Vector.Vector2d(Random.Random.inRange(-1, 1), Random.Random.inRange(-2, 0));
    }

    /**
     * Get the initial color of the particle.
     */
    public getInitialColor() {
        return new Color.Color(20);
    }

    /**
     * Get the opacity.
     */
    public getOpacity() {
        return 1.0 - Math.max(0, this.age / 100);
    }
}