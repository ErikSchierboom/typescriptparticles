/// <reference path="../../libs/raphael.d.ts" />

import Color = module('helpers/color');
import Vector = module('helpers/vector');
import Random = module('helpers/random');
import Drawing = module('helpers/drawing');
import Particle = module('particles/particle');

/**
 * This class extends the Particle class to creating a bouncing ball particle.
 */
export class BouncingBallParticle extends Particle.Particle {
    constructor(public paper: RaphaelPaper) {
        super(paper);
    
        // Generate a random radius to create different bouncing balls
        this.radius = Math.random() * 20 + 5;

        // Give the particle a random coordinate that fits on the canvas
        this.location = new Vector.Vector2d(Math.random() * (paper.width - this.radius * 2) + this.radius, Math.random() * (paper.height - this.radius * 2) + this.radius);

        // Create random velocity
        this.velocity = new Vector.Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
        
        // Give the particle a random color
        this.color = new Color.Color(Math.floor(Math.random() * 360));
    }

    public update() {
        super.update();       
        
        // Here we need to do some additional processing to ensure that the
        // bouncing ball particles actually bounce when off the borders of the canvas

        if (this.shouldReverseHorizontalDirection) {
            this.velocity.x *= -1;
        }

        if (this.shouldReverseVerticalDirection) {
            this.velocity.y *= -1;
        }
    }

    /**
     * Draw the bouncing ball to the canvas.
     */
    public draw() {
        var bouncingBall = this.paper.circle(this.location.x, this.location.y, this.radius);
        bouncingBall.attr('fill', this.color.toRaphaelString());
    }

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