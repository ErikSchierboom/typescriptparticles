/// <reference path="../libs/typings/raphael.d.ts" />

import Drawing = module('helpers/drawing');
import Particle = module('Particles/particle');
import BouncingBallParticle = module('Particles/bouncingballparticle');
import FireworkParticle = module('Particles/fireworkparticle');

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
 * A class to create particles depending on the particle type.
 */
export class ParticleFactory {
    constructor(public paper: RaphaelPaper) { }

    /**
     * Create a particle based on the specified particle type.
     */
    public create(particleType: string) : Particle {
        if (particleType == ParticleType.BouncingBall) {
            return new BouncingBallParticle.BouncingBallParticle(this.paper);
        }
        else if (particleType == ParticleType.Firework) {
            return new FireworkParticle.FireworkParticle(this.paper);
        }

        throw 'Invalid particle type specified';
    }
}

/**
 * This class can render a collection of particles to the screen.
 */
export class Particles extends Drawing.CompositeDrawable {

    // The animation handle
    animation: RaphaelAnimation;

    // The number of particles to render
    numberOfParticlesToRender: number = 10;

    // The particles that will be rendered
    particles: Particle[];

    // The factory for creating the particles
    particleFactory: ParticleFactory;

    constructor(public paper: RaphaelPaper, public particleType: string = ParticleType.BouncingBall) {
        super(paper);

        // Create the particle factory first before we will use it to create the particles
        this.particleFactory = new ParticleFactory(paper);

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
        var parent = super;

        this.animation = Raphael.animation({}, 50, 'linear', function () {
            parent.draw();
        });        
    }
}