var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/color', 'helpers/vector', 'helpers/random', 'particles/particle'], function(require, exports, __Color__, __Vector__, __Random__, __Particle__) {
    var Color = __Color__;

    var Vector = __Vector__;

    var Random = __Random__;

    
    var Particle = __Particle__;

    var ExplosionParticle = (function (_super) {
        __extends(ExplosionParticle, _super);
        function ExplosionParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
        }
        ExplosionParticle.MaximumAge = 200;
        ExplosionParticle.prototype.isDead = function () {
            return this.age >= ExplosionParticle.MaximumAge;
        };
        ExplosionParticle.prototype.getInitialRadius = function () {
            return Random.Random.inRange(5, 6);
        };
        ExplosionParticle.prototype.getInitialAcceleration = function () {
            return new Vector.Vector2d(0, 0.05);
        };
        ExplosionParticle.prototype.getInitialLocation = function () {
            return new Vector.Vector2d(this.paper.width / 2, this.paper.height / 2);
        };
        ExplosionParticle.prototype.getInitialVelocity = function () {
            return new Vector.Vector2d(Random.Random.inRange(-4, 4), Random.Random.inRange(-4, 4));
        };
        ExplosionParticle.prototype.getInitialColor = function () {
            return new Color.Color(Math.floor(Random.Random.inRange(0, 60)));
        };
        return ExplosionParticle;
    })(Particle.Particle);
    exports.ExplosionParticle = ExplosionParticle;    
})
