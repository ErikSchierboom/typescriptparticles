define(["require", "exports", 'particles/particlesystem', "knockout", "raphael"], function(require, exports, __Particles__) {
    
    var Particles = __Particles__;

    var ko = require('knockout');
    var AppViewModel = (function () {
        function AppViewModel() {
            var _this = this;
            this.paperElement = 'particlesCanvas';
            this.paperWidth = 700;
            this.paperHeight = 300;
            this.particleTypes = ko.observableArray(Particles.ParticleType.particleTypes);
            this.selectedParticleType = ko.observable(Particles.ParticleType.BouncingBall);
            this.animating = ko.observable(false);
            this.paper = Raphael(this.paperElement, this.paperWidth, this.paperHeight);
            this.particleSystem = new Particles.ParticleSystem(this.paper);
            this.selectedParticleType.subscribe(function (newParticleType) {
                _this.particleSystem.particleType = newParticleType;
                _this.reset();
            });
            this.toggleAnimating();
        }
        AppViewModel.prototype.toggleAnimating = function () {
            if(this.animating()) {
                this.particleSystem.stopAnimating();
                this.animating(false);
            } else {
                this.particleSystem.startAnimating();
                this.animating(true);
            }
        };
        AppViewModel.prototype.reset = function () {
            this.particleSystem.refresh();
        };
        return AppViewModel;
    })();
    exports.AppViewModel = AppViewModel;    
})
