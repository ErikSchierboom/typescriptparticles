/// <reference path="../libs/typings/raphael.d.ts" />

import Vector = module('helpers/vector');
import Particle = module('Particles/particle');

/**
 * This class extends the Particle class to creating a bouncing ball particle.
 */
export class BouncingBallParticle extends Particle.Particle {
    radius: number;

    constructor(public paper: RaphaelPaper) {
        super(paper);
    
        // Generate a random radius to create different sized circles
        this.radius = Math.random() * 20 + 5;

        // Give the particle a random coordinate that fits on the canvas
        this.coordinate.x = Math.random() * (paper.width - this.radius * 2) + this.radius;
        this.coordinate.y = Math.random() * (paper.height - this.radius * 2) + this.radius;

        // Create random x and y vectors that will determine where the
        // particle will be moving to
        this.vx = (Math.random() * 2 - 1) * 40;
        this.vy = (Math.random() * 2 - 1) * 40;

       // this.dt = 1.0 / framesPerSecond;

        // Give the particle a random color
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
    }

    public update() {
        super.update();
        
        // Here we need to do some additional processing to ensure that the
        // bouncing ball particles actually bounce when they reach the borders
        // of the canvas

        if (this.shouldReverseHorizontalDirection) {
            this.vx *= -1;
        }

        if (this.shouldReverseVerticalDirection) {
            this.vy *= -1;
        }
    }

    /**
     * Draw the bouncing ball to the canvas.
     */
    public draw() {

        this.paper.circle(this.coordinate.x, this.coordinate.y, this.radius);

        //this.ctx.beginPath();
        //this.ctx.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, 2 * Math.PI, false);
        //this.ctx.closePath();
        //this.ctx.fillStyle = this.color;
        //this.ctx.fill();
    }

    // Properties used to retrieve the movevement direction of the particle
    get movingToLeft(): bool { return this.vx < 0; }
    get movingToRight(): bool { return this.vx > 0; }
    get movingToTop(): bool { return this.vy < 0; }
    get movingToBottom(): bool { return this.vy > 0; }

    // Properties used to determine if the bouncing ball is over a border
    get overLeftBorder(): bool { return this.coordinate.x <= this.radius; }
    get overRightBorder(): bool { return this.coordinate.x >= this.paper.width - this.radius; }
    get overTopBorder(): bool { return this.coordinate.y <= this.radius; }
    get overBottomBorder(): bool { return this.coordinate.y >= this.paper.height - this.radius; }

    /**
     * Indicates if the particle should reverse its horizontal direction due
     * to the particle moving over the utmost left or right of the canvas.
     */
    get shouldReverseHorizontalDirection(): bool {
        return (this.movingToLeft && this.overLeftBorder) ||
               (this.movingToRight && this.overRightBorder);
    }

    /**
     * Indicates if the particle should reverse its vertital direction due
     * to the particle moving over the utmost top or bottom of the canvas.
     */
    get shouldReverseVerticalDirection(): bool {
        return (this.movingToTop && this.overTopBorder) ||
               (this.movingToBottom && this.overBottomBorder);
    }
}