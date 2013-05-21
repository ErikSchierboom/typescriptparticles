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
    
    static Hue: number = 20;

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
     
        // Give the particle a color
        this.color = new Color.Color(FountainParticle.Hue);
    }

    /**
     * Draw the fountain particle to the canvas.
     */
    public draw() {
        var fountainCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
        fountainCircle.attr('fill', this.color.toRaphaelString());
    }

    /**
     * Indicates if the particle is dead.
     */
    public get isDead() {
        return this.overBottomBorder;
    }
}