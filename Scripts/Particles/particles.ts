/// <reference path="../libs/typings/raphael.d.ts" />

/// <amd-dependency path="animation" />

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
 * This class represents a particle system.
 */
export class ParticleSystem extends Drawing.CompositeDrawable {

    // The handle returned by the requestAnimationFrame method. We will
    // be using this handle to allow animation to be stopped.
    private animationHandle: number;

    // The number of particles to render
    numberOfParticlesToRender: number = 10;
    
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
        this.Drawables = [];

        // Add the specified number of particles
        for (var i = 0; i < this.numberOfParticlesToRender; ++i) {            
            this.Drawables.push(this.particleFactory.create(this.particleType));
        };
    };

    public refresh() {
        
        // Refresh the particles by re-creating them
        this.createParticles();
    };

    public draw() {

        // Before we will be drawing the particles, we need to clear the paper
        this.paper.clear();

        // Draw the particles
        super.draw();

        // Update the particles
        this.update();
    }

    public update() {
        
        // Update the particles
        for (var i = 0; i < this.Drawables.length; ++i) {
            (<Particle.Particle>this.Drawables[i]).update();
        };
    }

    public startAnimating() {
        // Request an animation frame for the current method. 
        // This will cause this method to be called to render
        // in around 60 FPS
        this.animationHandle = window.requestAnimationFrame(function () => {
            this.startAnimating()
        });

        // Draw to the screen        
        this.draw();
    }

    public stopAnimating() {

        // Use the animation handle we retrieve in the startAnimating method
        // to cancel the animation
        window.cancelAnimationFrame(this.animationHandle);
    }
}