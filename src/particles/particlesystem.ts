/// <reference path="../../libs/raphael.d.ts" />

/// <amd-dependency path="animation" />

import Drawing = module('helpers/drawing');
import Particle = module('particles/particle');
import BouncingBallParticle = module('particles/bouncingballparticle');
import FireworkParticle = module('particles/fireworkparticle');

/**
 * An "enumeration" for the different particle types. TypeScript does contain an 
 * enum type, but does not recommend using it as it is almost guaranteed to change
 * in a future version of the specification.
 */
export class ParticleType {
    static BouncingBall: string = "Bouncing Ball";
    static Firework: string = "Firework";

    // Return the particle types as an array
    static get particleTypes(): string[] {
        return [BouncingBall, Firework];
    }
}

/**
 * This class represents a particle system. It is implemented as a CompositeDrawable
 * where the Drawables themselves are particles.
 */
export class ParticleSystem extends Drawing.CompositeDrawable {

    // The handle returned by the requestAnimationFrame method. We will
    // be using this handle to allow animation to be stopped.
    private animationHandle: number;

    // The number of particles to render
    private numberOfParticlesToRender: number = 20;

    constructor(public paper: RaphaelPaper, public particleType: string = ParticleType.BouncingBall) {
        super(paper);

        // Create the particles
        this.createParticles();
    }

    private createParticles() {

        // First, clear the existing particles
        this.Drawables = [];

        // Then add the new particles
        for (var i = 0; i < this.numberOfParticlesToRender; ++i) {            
            this.Drawables.push(this.createParticle());
        };
    };

    // Create a particle for the current particle type
    private createParticle(): Drawing.Drawable {

        if (this.particleType == ParticleType.BouncingBall) {
            return new BouncingBallParticle.BouncingBallParticle(this.paper);
        }
        else if (this.particleType == ParticleType.Firework) {
            return new FireworkParticle.FireworkParticle(this.paper);
        }

        // We should never get here, but if we do throw an exception
        throw 'Invalid particle type specified.';
    }

    public refresh() {
        
        // Refresh the particle system by re-creating the particles
        this.createParticles();
    };

    public draw() {

        // Before we will be drawing the particles, we need to clear the paper
        this.paper.clear();

        super.draw();

        // Update the particles, which will update the position of the particle
        // which we need to have the particles move on the screen
        this.update();
    }

    public startAnimating() {
        // Request an animation frame for the current method. This will be called
        // as often as needed to render in around 60 FPS
        this.animationHandle = window.requestAnimationFrame(function () => {
            this.startAnimating()
        });
    
        this.draw();
    }

    public stopAnimating() {

        // Use the animation handle we retrieved in the startAnimating method
        // to cancel the animation
        window.cancelAnimationFrame(this.animationHandle);
    }
}