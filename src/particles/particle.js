var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/vector', 'helpers/drawing'], function(require, exports, __Vector__, __Drawing__) {
    var Vector = __Vector__;

    var Drawing = __Drawing__;

    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.location = new Vector.Vector2d();
            this.velocity = new Vector.Vector2d();
            this.acceleration = new Vector.Vector2d();
            this.lifetime = 255;
        }
        Particle.prototype.update = function () {
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
            this.lifetime -= 1;
        };
        Particle.prototype.isDead = function () {
            return this.lifetime <= 0;
        };
        return Particle;
    })(Drawing.Drawable);
    exports.Particle = Particle;    
})
