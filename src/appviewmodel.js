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
            this.particleSystem = new Particles.ParticleSystem(this.paper);
            this.selectedParticleType.subscribe(function (newParticleType) {
                _this.particleSystem.particleType = newParticleType;
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
            this.particleSystem.startAnimating();
        };
        AppViewModel.prototype.stopAnimating = function () {
            this.particleSystem.stopAnimating();
            this.animating(false);
        };
        AppViewModel.prototype.reset = function () {
            this.particleSystem.refresh();
        };
        return AppViewModel;
    })();
    exports.AppViewModel = AppViewModel;    
})
