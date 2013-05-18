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
            this.coordinate = new Vector.Vector2d();
            this.movement = new Vector.Vector2d();
            this.iteration = 1;
            this.dt = 1.0 / Drawing.FramesPerSecond;
        }
        Particle.prototype.update = function () {
            this.coordinate = this.coordinate.add(this.movement.multiply(this.dt));
            this.iteration += 1;
        };
        return Particle;
    })(Drawing.Drawable);
    exports.Particle = Particle;    
})
