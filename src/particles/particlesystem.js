var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/drawing', 'particles/fountainparticle', 'particles/bouncingballparticle', 'particles/explosionparticle', "animation"], function(require, exports, __Drawing__, __FountainParticle__, __BouncingBallParticle__, __ExplosionParticle__) {
    var Drawing = __Drawing__;

    
    var FountainParticle = __FountainParticle__;

    var BouncingBallParticle = __BouncingBallParticle__;

    var ExplosionParticle = __ExplosionParticle__;

    var ParticleType = (function () {
        function ParticleType() { }
        ParticleType.Fountain = "Fountain";
        ParticleType.Explosion = "Explosion";
        ParticleType.BouncingBall = "Bouncing balls";
        Object.defineProperty(ParticleType, "particleTypes", {
            get: function () {
                return [
                    ParticleType.Fountain, 
                    ParticleType.Explosion, 
                    ParticleType.BouncingBall
                ];
            },
            enumerable: true,
            configurable: true
        });
        return ParticleType;
    })();
    exports.ParticleType = ParticleType;    
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(paper, particleType, numberOfParticles) {
            if (typeof numberOfParticles === "undefined") { numberOfParticles = 30; }
                _super.call(this, paper);
            this.paper = paper;
            this.particleType = particleType;
            this.numberOfParticles = numberOfParticles;
            this.createParticles();
        }
        ParticleSystem.prototype.createParticles = function () {
            this.Drawables = [];
            for(var i = 0; i < this.numberOfParticles; ++i) {
                this.Drawables.push(this.createParticle());
            }
            ;
        };
        ParticleSystem.prototype.createParticle = function () {
            if(this.particleType == ParticleType.Fountain) {
                return new FountainParticle.FountainParticle(this.paper);
            } else if(this.particleType == ParticleType.BouncingBall) {
                return new BouncingBallParticle.BouncingBallParticle(this.paper);
            } else if(this.particleType == ParticleType.Explosion) {
                return new ExplosionParticle.ExplosionParticle(this.paper);
            }
            throw 'Invalid particle type specified.';
        };
        ParticleSystem.prototype.refresh = function () {
            this.createParticles();
        };
        ParticleSystem.prototype.draw = function () {
            this.update();
            this.paper.clear();
            _super.prototype.draw.call(this);
        };
        ParticleSystem.prototype.startAnimating = function () {
            var _this = this;
            this.animationHandle = window.requestAnimationFrame(function () {
                _this.startAnimating();
            });
            this.draw();
        };
        ParticleSystem.prototype.stopAnimating = function () {
            window.cancelAnimationFrame(this.animationHandle);
        };
        ParticleSystem.prototype.update = function () {
            for(var i = 0; i < this.Drawables.length; ++i) {
                var particle = this.Drawables[i];
                particle.update();
            }
        };
        return ParticleSystem;
    })(Drawing.CompositeDrawable);
    exports.ParticleSystem = ParticleSystem;    
})
