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
    static PaperElement: string = 'particlesCanvas';
    static PaperWidth: number = 700;
    static PaperHeight: number = 300;
    
    // The particle system that will render the particles to the screen
    private particleSystem: Particles.ParticleSystem;

    // This observable contains all the particle types. We use this to let the use 
    // select the particle type to render
    public particleTypes = ko.observableArray(Particles.ParticleType.particleTypes);

    // This observable contains the selected particle type, which is the particle
    // type that is rendered. We give it a default value which will be used to determine
    // what particles to start rendering immediately
    public selectedParticleType = ko.observable(Particles.ParticleType.Fountain);

    // This observable will indicate if we are currently animating
    public animating = ko.observable(false);

    constructor() {
        
        // Create the particle system that will draw the particles to the paper
        this.particleSystem = new Particles.ParticleSystem(AppViewModel.createRaphaelPaper(), this.selectedParticleType());

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

    /**
     * Create a RaphaelPaper instance to which will be drawn.
     */
    private static createRaphaelPaper() {
        return Raphael(AppViewModel.PaperElement, AppViewModel.PaperWidth, AppViewModel.PaperHeight);
    }
}