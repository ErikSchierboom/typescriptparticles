/// <reference path="drawing.ts" />

var framesPerSecond = 60;

import Drawing = module('drawing');

/**
 * This class forms the base of any particle implementation. It defines a set of properties
 * shared by all particles and some common methods and properties. It extends from the 
 * Drawable class to render the particle to the screen.
 */
export class Particle extends Drawing.Drawable {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    dt: number;
    color: string;

    constructor(public ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    /**
     * Update the particle's coordinates.
     */
    public update() {
        this.x += this.horizontalMovement;
        this.y += this.verticalMovement;
    }

    // Properties for retrieving the horizontal and vertical movement
    get horizontalMovement(): number { return this.vx * this.dt; }
    get verticalMovement(): number { return this.vy * this.dt; }
}

/**
 * This class extends the Particle class to creating a bouncing ball particle.
 */
export class BouncingBallParticle extends Particle {
    constructor(public ctx: CanvasRenderingContext2D) {
        super(ctx);

        // Generate a random radius to create different sized circles
        this.radius = Math.random() * 20 + 5;

        // Give the particle a random coordinate that fits on the canvas
        this.x = Math.random() * (this.ctx.canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (this.ctx.canvas.height - this.radius * 2) + this.radius;

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
    public draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    // Properties used to retrieve the movevement direction of the particle
    get movingToLeft(): bool { return this.vx < 0; }
    get movingToRight(): bool { return this.vx > 0; }
    get movingToTop(): bool { return this.vy < 0; }
    get movingToBottom(): bool { return this.vy > 0; }

    // Properties used to determine if the bouncing ball is over a border
    get overLeftBorder(): bool { return this.x <= this.radius; }
    get overRightBorder(): bool { return this.x >= this.ctx.canvas.width - this.radius; }
    get overTopBorder(): bool { return this.y <= this.radius; }
    get overBottomBorder(): bool { return this.y >= this.ctx.canvas.height - this.radius; }

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
 * A simulated enumeration for the different particle types.
 */
export class ParticleType {
    static BouncingBall: string = "BouncingBall";
}

/**
 * A class to create particles depending on the particle type.
 */
export class ParticleFactory {
    constructor(public ctx: CanvasRenderingContext2D) { }

    /**
     * Create a particle based on the specified particle type.
     */
    public create(particleType: string) {
        if (particleType == ParticleType.BouncingBall) {
            return new BouncingBallParticle(this.ctx);
        }

        throw 'Invalid particle type specified';
    }
}

/**
 * This class can render a collection of particles to the screen.
 */
export class Particles extends Drawing.AnimatedDrawable {

    // The number of particles to render
    numberOfParticlesToRender: number = 10;

    // The particles that will be rendered
    particles: Particle[];

    // The factory for creating the particles
    particleFactory: ParticleFactory;

    constructor(public ctx: CanvasRenderingContext2D, private particleType: string = ParticleType.BouncingBall) {
        super(ctx);

        // Create the particle factory first before we will use it to create the particles
        this.particleFactory = new ParticleFactory(ctx);

        // Create the particles
        this.createParticles();
    }

    private createParticles() {

        // Create the array that will hold all the particles
        this.particles = [];

        // Add the specified number of particles
        for (var i = 0; i < this.numberOfParticlesToRender; ++i) {            
            this.particles.push(this.particleFactory.create(this.particleType));
        };
    };

    public refresh() {
        
        // Refresh the particles by re-creating them
        this.createParticles();
    };

    public draw() {

        // Start with clearing the rendering context
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Render all particles after updating them first (which will update their coordinates, etc.)
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}