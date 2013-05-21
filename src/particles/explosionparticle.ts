/// <reference path="../../libs/raphael.d.ts" />

import Vector = module('helpers/vector');
import Drawing = module('helpers/drawing');
import Particle = module('particles/particle');

/**
 * This class extends the Particle class to creating an explosion particle.
 */
export class ExplosionParticle extends Particle.Particle {

    // The radius of the explosion particle
    radius: number;

    hue: number;

    static saturation: number = 100;
    static lightness: number = 50;

    constructor(public paper: RaphaelPaper) {
        super(paper);
        
        // Set the accelation of the particle. This will allow us to simulate gravity
        this.acceleration = new Vector.Vector2d(0, 0.05);

        // Generate a random radius
        this.radius = Math.random() + 5;
        
        // Position the particle in the middle-top of the canvas
        this.location = new Vector.Vector2d(this.paper.width / 2, this.paper.height / 4);

        // Give the explosion particle a random velocity
        this.velocity = new Vector.Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 2);
        
        // Give the particle a random hue which is in the red color range
        this.hue = Math.floor(Math.random() * 60);

        this.color = Raphael.hsl(this.hue, ExplosionParticle.saturation, ExplosionParticle.lightness);
    }

    /**
     * Draw the explosion particle to the canvas.
     */
    public draw() {

        this.color = Raphael.hsl(this.hue, ExplosionParticle.saturation, ExplosionParticle.lightness);

        var explosionCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
        explosionCircle.attr('fill', this.color);
    }
}