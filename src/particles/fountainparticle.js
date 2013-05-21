var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/color', 'helpers/vector', 'particles/particle'], function(require, exports, __Color__, __Vector__, __Particle__) {
    var Color = __Color__;

    var Vector = __Vector__;

    
    
    var Particle = __Particle__;

    var FountainParticle = (function (_super) {
        __extends(FountainParticle, _super);
        function FountainParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.acceleration = new Vector.Vector2d(0, 0.05);
            this.radius = Math.random() + 5;
            this.location = new Vector.Vector2d(this.paper.width / 2, this.paper.height / 4);
            this.velocity = new Vector.Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 2);
            this.color = new Color.Color(FountainParticle.Hue);
        }
        FountainParticle.Hue = 20;
        FountainParticle.prototype.draw = function () {
            var fountainCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
            fountainCircle.attr('fill', this.color.toRaphaelString());
        };
        Object.defineProperty(FountainParticle.prototype, "isDead", {
            get: function () {
                return this.overBottomBorder;
            },
            enumerable: true,
            configurable: true
        });
        return FountainParticle;
    })(Particle.Particle);
    exports.FountainParticle = FountainParticle;    
})
