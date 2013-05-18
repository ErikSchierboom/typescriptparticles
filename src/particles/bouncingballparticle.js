var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/vector', 'particles/particle'], function(require, exports, __Vector__, __Particle__) {
    var Vector = __Vector__;

    
    var Particle = __Particle__;

    var BouncingBallParticle = (function (_super) {
        __extends(BouncingBallParticle, _super);
        function BouncingBallParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.radius = Math.random() * 20 + 5;
            this.coordinate.x = Math.random() * (paper.width - this.radius * 2) + this.radius;
            this.coordinate.y = Math.random() * (paper.height - this.radius * 2) + this.radius;
            this.movement = new Vector.Vector2d((Math.random() * 2 - 1) * 40, (Math.random() * 2 - 1) * 40);
            this.color = Raphael.hsl(Math.floor(Math.random() * 360), 100, 50);
        }
        BouncingBallParticle.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.shouldReverseHorizontalDirection) {
                this.movement.x *= -1;
            }
            if(this.shouldReverseVerticalDirection) {
                this.movement.y *= -1;
            }
        };
        BouncingBallParticle.prototype.draw = function () {
            var bouncingBall = this.paper.circle(this.coordinate.x, this.coordinate.y, this.radius);
            bouncingBall.attr('fill', this.color);
        };
        Object.defineProperty(BouncingBallParticle.prototype, "movingToLeft", {
            get: function () {
                return this.movement.x < 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "movingToRight", {
            get: function () {
                return this.movement.x > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "movingToTop", {
            get: function () {
                return this.movement.y < 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "movingToBottom", {
            get: function () {
                return this.movement.y > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "overLeftBorder", {
            get: function () {
                return this.coordinate.x <= this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "overRightBorder", {
            get: function () {
                return this.coordinate.x >= this.paper.width - this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "overTopBorder", {
            get: function () {
                return this.coordinate.y <= this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "overBottomBorder", {
            get: function () {
                return this.coordinate.y >= this.paper.height - this.radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "shouldReverseHorizontalDirection", {
            get: function () {
                return (this.movingToLeft && this.overLeftBorder) || (this.movingToRight && this.overRightBorder);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "shouldReverseVerticalDirection", {
            get: function () {
                return (this.movingToTop && this.overTopBorder) || (this.movingToBottom && this.overBottomBorder);
            },
            enumerable: true,
            configurable: true
        });
        return BouncingBallParticle;
    })(Particle.Particle);
    exports.BouncingBallParticle = BouncingBallParticle;    
})
