/// <reference path="../libs/typings/raphael.d.ts" />

import Vector = module('helpers/vector');
import Particle = module('Particles/particle');

/**
 * This class extends the Particle class to creating a firework particle.
 */
export class FireworkParticle extends Particle.Particle {

    // The last coordinate
    lastCoordinate: Vector.Vector2d;
    
    constructor(public paper: RaphaelPaper) {
        super(paper);

        // Give the particle a random coordinate that fits on the canvas
        this.coordinate.x = this.paper.width / 2;
        this.coordinate.y = this.paper.height / 2;

        // Create random x and y vectors that will determine where the
        // particle will be moving to
        this.vx = (Math.random() * 2 - 1) * 40;
        this.vy = (Math.random() * 2 - 1) * 40;

        //this.dt = 1.0 / framesPerSecond;

        // Give the particle a random color
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
    }

    /**
     * Draw the firework particle to the canvas.
     */
    public draw() {
        //this.ctx.beginPath();
        //this.ctx.moveTo(this.lastCoordinate.x, this.lastCoordinate.y);
        //this.ctx.lineTo(this.coordinate.x, this.coordinate.y);
        //this.ctx.closePath();
        //this.ctx.lineWidth = 3.0;
        //this.ctx.strokeStyle = this.color;
        //this.ctx.stroke();
    }

    public update() {
        // Before updating the coordinate, store the current coordinate as the last coordinate
        this.updateLastCoordinate();

        super.update();
    }

    /**
     * As we will be drawing lines, we need to store the last coordinate.
     */
    private updateLastCoordinate() {
        this.lastCoordinate = this.coordinate;
    }
}