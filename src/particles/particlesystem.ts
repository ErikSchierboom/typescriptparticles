/// <reference path="../../libs/raphael.d.ts" />

/// <amd-dependency path="animation" />

import Drawing = module('helpers/drawing');
import Particle = module('particles/particle');
import FountainParticle = module('particles/fountainparticle');
import BouncingBallParticle = module('particles/bouncingballparticle');
import ExplosionParticle = module('particles/explosionparticle');

/**
 * An "enumeration" for the different particle types. TypeScript does contain an 
 * enum type, but does not recommend using it as it is almost guaranteed to change
 * in a future version of the specification.
 */
export class ParticleType {
    static Fountain: string = "Fountain";
    static Explosion: string = "Explosion";
    static BouncingBall: string = "Bouncing balls";    
    
    /**
     * Define the particle types as a property.
     */
    static get particleTypes(): string[] {
        return [Fountain, Explosion, BouncingBall];
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

    constructor(public paper: RaphaelPaper, public particleType: string, private numberOfParticles: number = 30) {
        super(paper);

        // Create the particles
        this.createParticles();
    }

    private createParticles() {

        // First, clear the existing particles, which are stored in the Drawables array
        this.Drawables = [];

        // Then add the new particles to the Drawables array
        for (var i = 0; i < this.numberOfParticles; ++i) {
            this.Drawables.push(this.createParticle());
        };
    };
        
    /**
     * Create a particle of the current particle type.
     */
    private createParticle(): Drawing.Drawable {

        if (this.particleType == ParticleType.Fountain) {
            return new FountainParticle.FountainParticle(this.paper);
        }
        else if (this.particleType == ParticleType.BouncingBall) {
            return new BouncingBallParticle.BouncingBallParticle(this.paper);
        }
        else if (this.particleType == ParticleType.Explosion) {
            return new ExplosionParticle.ExplosionParticle(this.paper);
        }

        // We should never get here, but if we do throw an exception
        throw 'Invalid particle type specified.';
    }

    /**
     * Refresh the particle system by re-creating the particles.
     */
    public refresh() {
        this.createParticles();
    };

    /**
     * Draw the particle system to the canvas, effectively drawing
     * each of the individual particles.
     */
    public draw() {

        // Update the particles
        this.update();
                
        // First clear the paper and then draw the particles
        this.paper.clear();
        super.draw();
    }

    public startAnimating() {
        // Request an animation frame for the current method. This will be called
        // as often as needed to render in around 60 FPS
        this.animationHandle = window.requestAnimationFrame(function () => {
            this.startAnimating()
        });
    
        // For each animation frame, we draw the particle system to the canvas
        this.draw();
    }

    public stopAnimating() {

        // Use the animation handle we retrieved in the startAnimating method
        // to cancel the animation
        window.cancelAnimationFrame(this.animationHandle);
    }

    /**
     * Update the particle system, which will result in each individual
     * particle being updated.
     */
    private update() {
        for (var i = 0; i < this.Drawables.length; ++i) {

            // We need to do a cast as the particles are stored in array
            // containing their base Drawable type
            var particle = <Particle.Particle>this.Drawables[i];
            particle.update();
        }
    }
}