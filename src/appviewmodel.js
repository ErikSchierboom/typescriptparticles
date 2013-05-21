define(["require", "exports", 'particles/particlesystem', "knockout", "raphael"], function(require, exports, __Particles__) {
    
    var Particles = __Particles__;

    var ko = require('knockout');
    var AppViewModel = (function () {
        function AppViewModel() {
            var _this = this;
            this.particleTypes = ko.observableArray(Particles.ParticleType.particleTypes);
            this.selectedParticleType = ko.observable(Particles.ParticleType.Fountain);
            this.animating = ko.observable(false);
            this.particleSystem = new Particles.ParticleSystem(AppViewModel.createRaphaelPaper(), this.selectedParticleType());
            this.selectedParticleType.subscribe(function (newParticleType) {
                _this.particleSystem.particleType = newParticleType;
                _this.reset();
            });
            this.toggleAnimating();
        }
        AppViewModel.PaperElement = 'particlesCanvas';
        AppViewModel.PaperWidth = 700;
        AppViewModel.PaperHeight = 300;
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
        AppViewModel.createRaphaelPaper = function createRaphaelPaper() {
            return Raphael(AppViewModel.PaperElement, AppViewModel.PaperWidth, AppViewModel.PaperHeight);
        };
        return AppViewModel;
    })();
    exports.AppViewModel = AppViewModel;    
})
