define(["require", "exports", 'particles', 'particle', "knockout", "kinetic"], function(require, exports, __Particles__, __Particle__) {
    
    var Particles = __Particles__;

    var Particle = __Particle__;

    var ko = require('knockout');
    var AppViewModel = (function () {
        function AppViewModel() {
            var _this = this;
            this.particleTypes = ko.observableArray(Particle.ParticleType.particleTypes);
            this.selectedParticleType = ko.observable(Particle.ParticleType.BouncingBall);
            this.animating = ko.observable(false);
            this.stage = new Kinetic.Stage({
                container: 'particlesCanvas',
                width: 700,
                height: 300
            });
            this.particles = new Particles.Particles(this.stage);
            this.selectedParticleType.subscribe(function (newParticleType) {
                _this.particles.particleType = newParticleType;
                _this.reset();
            });
            this.startAnimating();
        }
        AppViewModel.prototype.toggleAnimating = function () {
            if(this.animating()) {
                this.stopAnimating();
            } else {
                this.startAnimating();
            }
        };
        AppViewModel.prototype.startAnimating = function () {
            this.animating(true);
            this.particles.startAnimating(null);
        };
        AppViewModel.prototype.stopAnimating = function () {
            this.particles.stopAnimating();
            this.animating(false);
        };
        AppViewModel.prototype.reset = function () {
            this.particles.refresh();
        };
        return AppViewModel;
    })();
    exports.AppViewModel = AppViewModel;    
})
