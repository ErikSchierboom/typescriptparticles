var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/drawing', 'particles/bouncingballparticle', 'particles/fireworkparticle', "animation"], function(require, exports, __Drawing__, __BouncingBallParticle__, __FireworkParticle__) {
    var Drawing = __Drawing__;

    
    var BouncingBallParticle = __BouncingBallParticle__;

    var FireworkParticle = __FireworkParticle__;

    var ParticleType = (function () {
        function ParticleType() { }
        ParticleType.BouncingBall = "Bouncing Ball";
        ParticleType.Firework = "Firework";
        Object.defineProperty(ParticleType, "particleTypes", {
            get: function () {
                return [
                    ParticleType.BouncingBall, 
                    ParticleType.Firework
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
        function ParticleSystem(paper, particleType) {
            if (typeof particleType === "undefined") { particleType = ParticleType.BouncingBall; }
                _super.call(this, paper);
            this.paper = paper;
            this.particleType = particleType;
            this.numberOfParticlesToRender = 20;
            this.createParticles();
        }
        ParticleSystem.prototype.createParticles = function () {
            this.Drawables = [];
            for(var i = 0; i < this.numberOfParticlesToRender; ++i) {
                this.Drawables.push(this.createParticle());
            }
            ;
        };
        ParticleSystem.prototype.createParticle = function () {
            if(this.particleType == ParticleType.BouncingBall) {
                return new BouncingBallParticle.BouncingBallParticle(this.paper);
            } else if(this.particleType == ParticleType.Firework) {
                return new FireworkParticle.FireworkParticle(this.paper);
            }
            throw 'Invalid particle type specified.';
        };
        ParticleSystem.prototype.refresh = function () {
            this.createParticles();
        };
        ParticleSystem.prototype.draw = function () {
            this.paper.clear();
            _super.prototype.draw.call(this);
            this.update();
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
        return ParticleSystem;
    })(Drawing.CompositeDrawable);
    exports.ParticleSystem = ParticleSystem;    
})
