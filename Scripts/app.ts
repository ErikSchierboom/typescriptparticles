/// <reference path="libs/typings/jquery.d.ts" />
/// <reference path="libs/typings/knockout.d.ts" />
/// <reference path="drawing.ts" />
/// <reference path="particles.ts" />

import Drawing = module('drawing');
import Particles = module('particles');

/**
 * This class will serve as the view model for our app.
 */
class AppViewModel {

    // The particles that will be rendered to the screen
    private particles: Particles.Particles;

    // This observable will indicate if we are currently animating
    public animating = ko.observable(false);    

    constructor() {
        // Get the 2D rendering context from our canvas element
        var canvas = <HTMLCanvasElement>$('#particlesCanvas')[0];
        var ctx = canvas.getContext('2d');

        // Create the particles instance and start animating
        this.particles = new Particles.Particles(ctx);
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
        this.particles.startAnimating();
    }

    /**
     * Stop animating the particles.
     */
    private stopAnimating() {
        this.particles.stopAnimating();
        this.animating(false);
    }

    /**
     * Refresh the particles that are rendered on the screen.
     */
    public refresh() {
        this.particles.refresh();
    }
}

$(document).ready(function () {

    // Create the view model and apply its bindings to knockout
    var viewModel = new AppViewModel();
    ko.applyBindings(viewModel);

});