/// <reference path="drawing.ts" />
/// <reference path="particle.ts" />

import Drawing = module('drawing');
import Particle = module('particle');

/**
 * A class to create particles depending on the particle type.
 */
export class ParticleFactory {
    constructor(public ctx: CanvasRenderingContext2D) { }

    /**
     * Create a particle based on the specified particle type.
     */
    public create(particleType: string) : Particle {
        if (particleType == Particle.ParticleType.BouncingBall) {
            return new Particle.BouncingBallParticle(this.ctx);
        }
        else if (particleType == Particle.ParticleType.Firework) {
            return new Particle.FireworkParticle(this.ctx);
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

    constructor(public ctx: CanvasRenderingContext2D, public particleType: string = Particle.ParticleType.BouncingBall) {
        super(ctx);

        // Create the particle factory first before we will use it to create the particles
        this.particleFactory = new ParticleFactory(ctx);

        // Create the particles
        this.createParticles();
    }

    private createParticles() {

        // Remove the current particles
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