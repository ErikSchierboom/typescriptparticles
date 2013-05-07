define(["require", "exports", 'particles', 'particle'], function(require, exports, __Particles__, __Particle__) {
    
    var Particles = __Particles__;

    var Particle = __Particle__;

    var AppViewModel = (function () {
        function AppViewModel() {
            var _this = this;
            this.particleTypes = ko.observableArray(Particle.ParticleType.particleTypes);
            this.selectedParticleType = ko.observable(Particle.ParticleType.BouncingBall);
            this.animating = ko.observable(false);
            var canvas = $('#particlesCanvas')[0];
            var ctx = canvas.getContext('2d');
            this.particles = new Particles.Particles(ctx);
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
            this.particles.startAnimating();
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
    $(document).ready(function () {
        var viewModel = new AppViewModel();
        ko.applyBindings(viewModel);
    });
})
