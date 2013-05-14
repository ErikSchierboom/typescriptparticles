/// <reference path="libs/typings/kinetic.d.ts" />
/// <reference path="drawing.ts" />
/// <reference path="particle.ts" />

import Drawing = module('drawing');
import Particle = module('particle');

/**
 * A class to create particles depending on the particle type.
 */
export class ParticleFactory {
    constructor(public stage: Kinetic.Stage) { }

    /**
     * Create a particle based on the specified particle type.
     */
    public create(particleType: string) : Particle {
        if (particleType == Particle.ParticleType.BouncingBall) {
            return new Particle.BouncingBallParticle(this.stage);
        }
        else if (particleType == Particle.ParticleType.Firework) {
            return new Particle.FireworkParticle(this.stage);
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

    constructor(public stage: Kinetic.Stage, public particleType: string = Particle.ParticleType.BouncingBall) {
        super(stage);

        // Create the particle factory first before we will use it to create the particles
        this.particleFactory = new ParticleFactory(stage);

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

        // Create the Kinetic layer to add the particles to
        var layer = new Kinetic.Layer();     
        
        // Render all particles after updating them first (which will update their coordinates, etc.)
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw(layer);
        }

        this.stage.clear();
        this.stage.add(layer);
    }
}