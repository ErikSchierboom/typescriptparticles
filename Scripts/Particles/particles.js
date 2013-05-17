var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/drawing', 'Particles/bouncingballparticle', 'Particles/fireworkparticle'], function(require, exports, __Drawing__, __BouncingBallParticle__, __FireworkParticle__) {
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
    var ParticleFactory = (function () {
        function ParticleFactory(paper) {
            this.paper = paper;
        }
        ParticleFactory.prototype.create = function (particleType) {
            if(particleType == ParticleType.BouncingBall) {
                return new BouncingBallParticle.BouncingBallParticle(this.paper);
            } else if(particleType == ParticleType.Firework) {
                return new FireworkParticle.FireworkParticle(this.paper);
            }
            throw 'Invalid particle type specified';
        };
        return ParticleFactory;
    })();
    exports.ParticleFactory = ParticleFactory;    
    var Particles = (function (_super) {
        __extends(Particles, _super);
        function Particles(paper, particleType) {
            if (typeof particleType === "undefined") { particleType = ParticleType.BouncingBall; }
                _super.call(this, paper);
            this.paper = paper;
            this.particleType = particleType;
            this.numberOfParticlesToRender = 10;
            this.particleFactory = new ParticleFactory(paper);
            this.createParticles();
        }
        Particles.prototype.createParticles = function () {
            this.particles = [];
            for(var i = 0; i < this.numberOfParticlesToRender; ++i) {
                this.particles.push(this.particleFactory.create(this.particleType));
            }
            ;
        };
        Particles.prototype.refresh = function () {
            this.createParticles();
        };
        Particles.prototype.draw = function () {
            var parent = _super.prototype;
            this.animation = Raphael.animation({
            }, 50, 'linear', function () {
                parent.draw();
            });
        };
        return Particles;
    })(Drawing.CompositeDrawable);
    exports.Particles = Particles;    
})
