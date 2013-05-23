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

    var FountainParticle = (function (_super) {
        __extends(FountainParticle, _super);
        function FountainParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
        }
        FountainParticle.prototype.isDead = function () {
            return this.location.y >= this.paper.height - this.radius;
        };
        FountainParticle.prototype.getInitialRadius = function () {
            return Random.Random.inRange(5, 6);
        };
        FountainParticle.prototype.getInitialAcceleration = function () {
            return new Vector.Vector2d(0, 0.05);
        };
        FountainParticle.prototype.getInitialLocation = function () {
            return new Vector.Vector2d(this.paper.width / 2, this.paper.height / 4);
        };
        FountainParticle.prototype.getInitialVelocity = function () {
            return new Vector.Vector2d(Random.Random.inRange(-1, 1), Random.Random.inRange(-2, 0));
        };
        FountainParticle.prototype.getInitialColor = function () {
            return new Color.Color(20);
        };
        FountainParticle.prototype.getOpacity = function () {
            return 1.0 - Math.max(0, this.age / 100);
        };
        return FountainParticle;
    })(Particle.Particle);
    exports.FountainParticle = FountainParticle;    
})
