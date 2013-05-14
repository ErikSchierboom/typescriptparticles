var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'drawing', 'particle'], function(require, exports, __Drawing__, __Particle__) {
    var Drawing = __Drawing__;

    var Particle = __Particle__;

    var ParticleFactory = (function () {
        function ParticleFactory(stage) {
            this.stage = stage;
        }
        ParticleFactory.prototype.create = function (particleType) {
            if(particleType == Particle.ParticleType.BouncingBall) {
                return new Particle.BouncingBallParticle(this.stage);
            } else if(particleType == Particle.ParticleType.Firework) {
                return new Particle.FireworkParticle(this.stage);
            }
            throw 'Invalid particle type specified';
        };
        return ParticleFactory;
    })();
    exports.ParticleFactory = ParticleFactory;    
    var Particles = (function (_super) {
        __extends(Particles, _super);
        function Particles(stage, particleType) {
            if (typeof particleType === "undefined") { particleType = Particle.ParticleType.BouncingBall; }
                _super.call(this, stage);
            this.stage = stage;
            this.particleType = particleType;
            this.numberOfParticlesToRender = 10;
            this.particleFactory = new ParticleFactory(stage);
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
            var layer = new Kinetic.Layer();
            for(var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                this.particles[i].draw(layer);
            }
            this.stage.clear();
            this.stage.add(layer);
        };
        return Particles;
    })(Drawing.AnimatedDrawable);
    exports.Particles = Particles;    
})
