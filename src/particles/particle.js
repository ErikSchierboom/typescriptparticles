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
        }
        Particle.prototype.update = function () {
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
        };
        Object.defineProperty(Particle.prototype, "isDead", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "movingToLeft", {
            get: function () {
                return this.velocity.x < 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "movingToRight", {
            get: function () {
                return this.velocity.x > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "movingToTop", {
            get: function () {
                return this.velocity.y < 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "movingToBottom", {
            get: function () {
                return this.velocity.y > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "overLeftBorder", {
            get: function () {
                return this.location.x <= this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "overRightBorder", {
            get: function () {
                return this.location.x >= this.paper.width - this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "overTopBorder", {
            get: function () {
                return this.location.y <= this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "overBottomBorder", {
            get: function () {
                return this.location.y >= this.paper.height - this.radius;
            },
            enumerable: true,
            configurable: true
        });
        return Particle;
    })(Drawing.Drawable);
    exports.Particle = Particle;    
})
