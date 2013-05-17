define(["require", "exports", 'Particles/particles', "knockout", "raphael"], function(require, exports, __Particles__) {
    
    var Particles = __Particles__;

    var ko = require('knockout');
    var AppViewModel = (function () {
        function AppViewModel() {
            var _this = this;
            this.particleTypes = ko.observableArray(Particles.ParticleType.particleTypes);
            this.selectedParticleType = ko.observable(Particles.ParticleType.BouncingBall);
            this.animating = ko.observable(false);
            this.paper = Raphael('particlesCanvas', 700, 300);
            this.particles = new Particles.Particles(this.paper);
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
        };
        AppViewModel.prototype.stopAnimating = function () {
            this.animating(false);
        };
        AppViewModel.prototype.reset = function () {
            this.particles.refresh();
        };
        return AppViewModel;
    })();
    exports.AppViewModel = AppViewModel;    
})
