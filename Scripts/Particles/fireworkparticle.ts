/// <reference path="../libs/typings/raphael.d.ts" />

import Vector = module('helpers/vector');
import Drawing = module('helpers/drawing');
import Particle = module('Particles/particle');

/**
 * This class extends the Particle class to creating a firework particle.
 */
export class FireworkParticle extends Particle.Particle {

    private isRocket: bool;
    private rocketColor: string = '#000000';
    private particles: FireworkParticle[] = [];

    // The begin coordinate. In rocket mode this is where the particle started.
    // In explosion mode this is where the rocket exploded.
    beginCoordinate: Vector.Vector2d;
    
    constructor(public paper: RaphaelPaper, coordinate?: Vector.Vector2d, isRocket?: bool = true) {
        super(paper);

        if (coordinate == undefined) {
            // Give the particle a coordinate on the bottom of the canvas
            this.coordinate = new Vector.Vector2d(this.paper.width / 2, this.paper.height);
        }
        else {
            this.coordinate = coordinate;
        }
                
        this.updateBeginCoordinate();
        this.isRocket = isRocket;

        // Create random x and y vectors that will determine where the
        // particle will be moving to
        this.movement = new Vector.Vector2d((Math.random() * 2 - 1) * 40, this.paper.height - (Math.random() * 2 - 1) * 40);
        
        // Give the particle a random color
        this.color = Raphael.hsl(Math.floor(Math.random() * 360), 100, 50);

        this.particles.push(this);
    }

    /**
     * Draw the firework particle to the canvas.
     */
    public draw() {
        for (var i = 0; i < this.particles.length; ++i) {
            var particle = this.particles[i];

            var path = this.paper.path('M ' + particle.beginCoordinate.toRaphaelCoordinate() + ' L ' + particle.coordinate.toRaphaelCoordinate());
            path.attr('stroke', this.isRocket ? this.rocketColor : particle.color);
        }
    }

    public update() {
        if (this.isRocket && this.iteration == Drawing.framesPerSecond * 2) {
            this.convertFromRocketToExplosion();
        }

        for (var i = 0; i < this.particles.length; ++i) {
            this.particles[i].update();
        }
    }

    private convertFromRocketToExplosion() {
        this.particles = [];

        for (var i = 0; i < 50; ++i) {
            this.particles.push(new FireworkParticle(this.paper, this.coordinate, false));
        }

        this.isRocket = false;
    }

    private updateBeginCoordinate() {
        this.beginCoordinate = this.coordinate;
    }
}