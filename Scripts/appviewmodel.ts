/// <reference path="Libs/Typings/jquery.d.ts" />
/// <reference path="Libs/Typings/knockout.d.ts" />
/// <reference path="Libs/Typings/kinetic.d.ts" />
/// <reference path="Libs/Typings/require.d.ts" />

/// <reference path="drawing.ts" />
/// <reference path="particles.ts" />
/// <amd-dependency path="knockout" />
/// <amd-dependency path="kinetic" />

import Drawing = module('drawing');
import Particles = module('particles');
import Particle = module('particle');

var ko = require('knockout');

/**
 * This class will serve as the view model for our app.
 */
export class AppViewModel {

    // The Kinetic stage
    private stage: Kinetic.Stage;

    // The Kinetic layer
    private layer: Kinetic.Layer;

    // The particles that will be rendered to the screen
    private particles: Particles.Particles;

    // This observable contains all the particle types
    public particleTypes = ko.observableArray(Particle.ParticleType.particleTypes);

    // This observable contains the selected particle type
    public selectedParticleType = ko.observable(Particle.ParticleType.BouncingBall);

    // This observable will indicate if we are currently animating
    public animating = ko.observable(false);

    constructor() {

        // Create the Kinetic stage that forms the basis to which the 
        // Kinetic layer will be added that will be rendered to
        this.stage = new Kinetic.Stage({
            container: 'particlesCanvas',
            width: 700,
            height: 300
        });

        // Create the particles
        this.particles = new Particles.Particles(this.stage);

        // Update the particle type when the user has changed it and then reset
        // the rendered particles
        this.selectedParticleType.subscribe(function (newParticleType) => {
            this.particles.particleType = newParticleType;
            this.reset();
        });
                
        this.startAnimating();
    }

    /**
     * Toggle the animating from running to stopped or vice versa.
     */
    public toggleAnimating() {
        if (this.animating()) {
            this.stopAnimating();
        }
        else {
            this.startAnimating();
        }
    }

    /**
     * Start animating the particles.
     */
    private startAnimating() {
        this.animating(true);
        this.particles.startAnimating(null);
    }

    /**
     * Stop animating the particles.
     */
    private stopAnimating() {
        this.particles.stopAnimating();
        this.animating(false);
    }

    /**
     * Reset the particles that are rendered on the screen.
     */
    public reset() {        
        this.particles.refresh();
    }
}