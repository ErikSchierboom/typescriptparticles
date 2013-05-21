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
    
    hue: number;

    constructor(public paper: RaphaelPaper) {
        super(paper);
        
        // Set the accelation of the particle. This will allow us to simulate gravity
        this.acceleration = new Vector.Vector2d(0, 0.05);

        // Generate a random radius
        this.radius = Math.random() + 5;
        
        // Position the particle in the middle-top of the canvas
        this.location = new Vector.Vector2d(this.paper.width / 2, this.paper.height / 2);

        // Give the explosion particle a random velocity
        this.velocity = new Vector.Vector2d((Math.random() * 8 - 4), Math.random() * 8 - 4);
        
        // Give the particle a random hue which is in the red color range
        this.hue = Math.floor(Math.random() * 60);

        this.color = new Color.Color(this.hue);
    }

    /**
     * Draw the explosion particle to the canvas.
     */
    public draw() {
        var explosionCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
        explosionCircle.attr('fill', this.color.toRaphaelString());
    }
}