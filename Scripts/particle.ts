/// <reference path="libs/typings/kinetic.d.ts" />
/// <reference path="drawing.ts" />

var framesPerSecond = 60;

import Drawing = module('drawing');

/**
 * A simulated enumeration for the different particle types.
 */
export class ParticleType {
    static BouncingBall: string = "Bouncing Ball";
    static Firework: string = "Firework";

    static get particleTypes(): string[] {
        return [BouncingBall, Firework];
    }
}

/**
 * This class forms the base of any particle implementation. It defines a set of properties
 * shared by all particles and some common methods and properties. It extends from the 
 * Drawable class to render the particle to the screen.
 */
export class Particle extends Drawing.Drawable {
    coordinate: Drawing.Point = new Drawing.Point();
    vx: number;
    vy: number;
    dt: number;
    color: string;

    constructor(public stage: Kinetic.Stage) {
        super(stage);
    }

    /**
     * Update the particle's coordinates.
     */
    public update() {
        this.coordinate.x += this.horizontalMovement;
        this.coordinate.y += this.verticalMovement;
    }

    // Properties for retrieving the horizontal and vertical movement
    get horizontalMovement(): number { return this.vx * this.dt; }
    get verticalMovement(): number { return this.vy * this.dt; }
}

/**
 * This class extends the Particle class to creating a bouncing ball particle.
 */
export class BouncingBallParticle extends Particle {
    radius: number;

    constructor(public stage: Kinetic.Stage) {
        super(stage);

        // Generate a random radius to create different sized circles
        this.radius = Math.random() * 20 + 5;

        // Give the particle a random coordinate that fits on the canvas
        this.coordinate.x = Math.random() * (this.stage.getWidth() - this.radius * 2) + this.radius;
        this.coordinate.y = Math.random() * (this.stage.getHeight() - this.radius * 2) + this.radius;

        // Create random x and y vectors that will determine where the
        // particle will be moving to
        this.vx = (Math.random() * 2 - 1) * 40;
        this.vy = (Math.random() * 2 - 1) * 40;

        this.dt = 1.0 / framesPerSecond;

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
    public draw(layer: Kinetic.Layer) {
        var circle = new Kinetic.Circle({
            x: this.coordinate.x,
            y: this.coordinate.y,
            radius: this.radius,
            fill: 'red'
        });

        layer.add(circle);

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
    get overRightBorder(): bool { return this.coordinate.x >= this.stage.getWidth() - this.radius; }
    get overTopBorder(): bool { return this.coordinate.y <= this.radius; }
    get overBottomBorder(): bool { return this.coordinate.y >= this.stage.getHeight() - this.radius; }

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

/**
 * This class extends the Particle class to creating a firework particle.
 */
export class FireworkParticle extends Particle {

    // The last coordinate
    lastCoordinate: Drawing.Point;
    
    constructor(public stage: Kinetic.Stage) {
        super(stage);

        // Give the particle a random coordinate that fits on the canvas
        this.coordinate.x = this.stage.getWidth() / 2;
        this.coordinate.y = this.stage.getHeight() / 2;

        // Create random x and y vectors that will determine where the
        // particle will be moving to
        this.vx = (Math.random() * 2 - 1) * 40;
        this.vy = (Math.random() * 2 - 1) * 40;

        this.dt = 1.0 / framesPerSecond;

        // Give the particle a random color
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
    }

    /**
     * Draw the firework particle to the canvas.
     */
    public draw(layer: Kinetic.Layer) {
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