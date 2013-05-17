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
        }
        Particle.prototype.update = function () {
            this.coordinate.x += this.horizontalMovement;
            this.coordinate.y += this.verticalMovement;
        };
        Object.defineProperty(Particle.prototype, "horizontalMovement", {
            get: function () {
                return this.vx * this.dt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "verticalMovement", {
            get: function () {
                return this.vy * this.dt;
            },
            enumerable: true,
            configurable: true
        });
        return Particle;
    })(Drawing.Drawable);
    exports.Particle = Particle;    
})
