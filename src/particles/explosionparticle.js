var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/color', 'helpers/vector', 'particles/particle'], function(require, exports, __Color__, __Vector__, __Particle__) {
    var Color = __Color__;

    var Vector = __Vector__;

    
    
    var Particle = __Particle__;

    var ExplosionParticle = (function (_super) {
        __extends(ExplosionParticle, _super);
        function ExplosionParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.acceleration = new Vector.Vector2d(0, 0.05);
            this.radius = Math.random() + 5;
            this.location = new Vector.Vector2d(this.paper.width / 2, this.paper.height / 2);
            this.velocity = new Vector.Vector2d((Math.random() * 8 - 4), Math.random() * 8 - 4);
            this.hue = Math.floor(Math.random() * 60);
            this.color = new Color.Color(this.hue);
        }
        ExplosionParticle.prototype.draw = function () {
            var explosionCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
            explosionCircle.attr('fill', this.color.toRaphaelString());
        };
        return ExplosionParticle;
    })(Particle.Particle);
    exports.ExplosionParticle = ExplosionParticle;    
})
