/// <reference path="../libs/require.d.ts" /> 
/// <reference path="../libs/knockout.d.ts" />
/// <reference path="../libs/raphael.d.ts" />

/// <amd-dependency path="knockout" />
/// <amd-dependency path="raphael" />

import Drawing = module('helpers/drawing');
import Particles = module('particles/particlesystem');

var ko = require('knockout');

/**
 * This class will serve as the view model for our app.
 */
export class AppViewModel {

    // The Raphael paper settings
    private paperElement: string = 'particlesCanvas';
    private paperWidth: number = 700;
    private paperHeight: number = 300;
    private paper: RaphaelPaper;

    // The particle system that will render the particles to the screen
    private particleSystem: Particles.ParticleSystem;

    // This observable contains all the particle types. We use this to let the use 
    // select the particle type to render
    public particleTypes = ko.observableArray(Particles.ParticleType.particleTypes);

    // This observable contains the selected particle type, which is the particle
    // type that is rendered
    public selectedParticleType = ko.observable(Particles.ParticleType.BouncingBall);

    // This observable will indicate if we are currently animating
    public animating = ko.observable(false);

    constructor() {

        // Create the Raphael paper on which all drawing will be done
        this.paper = Raphael(this.paperElement, this.paperWidth, this.paperHeight);

        // Create the particle system that will draw the particles to the paper
        this.particleSystem = new Particles.ParticleSystem(this.paper);

        // Update the particle type when the user has changed it and then reset
        // the rendered particles to have the change be reflected immediately
        this.selectedParticleType.subscribe(function (newParticleType) => {
            this.particleSystem.particleType = newParticleType;
            this.reset();
        });

        // Immediately start animating
        this.toggleAnimating();
    }

    /**
     * Toggle the animation from running to stopped and vice versa.
     */
    public toggleAnimating() {
        if (this.animating()) {
            this.particleSystem.stopAnimating();
            this.animating(false);
        }
        else {
            this.particleSystem.startAnimating();
            this.animating(true);
        }
    }

    /**
     * Reset the particles that are rendered on the screen.
     */
    public reset() {        
        this.particleSystem.refresh();
    }
}