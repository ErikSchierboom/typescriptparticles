/// <reference path="libs/typings/jquery.d.ts" />
/// <reference path="libs/typings/knockout.d.ts" />
/// <reference path="libs/typings/raphael.d.ts" />
/// <reference path="libs/typings/require.d.ts" />

/// <amd-dependency path="knockout" />
/// <amd-dependency path="raphael" />

import Drawing = module('helpers/drawing');
import Particles = module('Particles/particles');

var ko = require('knockout');

/**
 * This class will serve as the view model for our app.
 */
export class AppViewModel {

    // The Raphael paper
    private paper: RaphaelPaper;

    // The particles that will be rendered to the screen
    private particles: Particles.Particles;

    // This observable contains all the particle types
    public particleTypes = ko.observableArray(Particles.ParticleType.particleTypes);

    // This observable contains the selected particle type
    public selectedParticleType = ko.observable(Particles.ParticleType.BouncingBall);

    // This observable will indicate if we are currently animating
    public animating = ko.observable(false);

    constructor() {

        // Create the Raphael paper on which all drawing will be done
        this.paper = Raphael('particlesCanvas', 700, 300);

        // Create the particles
        this.particles = new Particles.Particles(this.paper);

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
        //this.particles.startAnimating(null);
    }

    /**
     * Stop animating the particles.
     */
    private stopAnimating() {
        //this.particles.stopAnimating();
        this.animating(false);
    }

    /**
     * Reset the particles that are rendered on the screen.
     */
    public reset() {        
        this.particles.refresh();
    }
}