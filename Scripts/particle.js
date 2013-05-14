var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'drawing'], function(require, exports, __Drawing__) {
    var framesPerSecond = 60;
    var Drawing = __Drawing__;

    var ParticleType = (function () {
        function ParticleType() { }
        ParticleType.BouncingBall = "Bouncing Ball";
        ParticleType.Firework = "Firework";
        Object.defineProperty(ParticleType, "particleTypes", {
            get: function () {
                return [
                    ParticleType.BouncingBall, 
                    ParticleType.Firework
                ];
            },
            enumerable: true,
            configurable: true
        });
        return ParticleType;
    })();
    exports.ParticleType = ParticleType;    
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(stage) {
                _super.call(this, stage);
            this.stage = stage;
            this.coordinate = new Drawing.Point();
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
    var BouncingBallParticle = (function (_super) {
        __extends(BouncingBallParticle, _super);
        function BouncingBallParticle(stage) {
                _super.call(this, stage);
            this.stage = stage;
            this.radius = Math.random() * 20 + 5;
            this.coordinate.x = Math.random() * (this.stage.getWidth() - this.radius * 2) + this.radius;
            this.coordinate.y = Math.random() * (this.stage.getHeight() - this.radius * 2) + this.radius;
            this.vx = (Math.random() * 2 - 1) * 40;
            this.vy = (Math.random() * 2 - 1) * 40;
            this.dt = 1.0 / framesPerSecond;
            this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
        }
        BouncingBallParticle.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.shouldReverseHorizontalDirection) {
                this.vx *= -1;
            }
            if(this.shouldReverseVerticalDirection) {
                this.vy *= -1;
            }
        };
        BouncingBallParticle.prototype.draw = function (layer) {
            var circle = new Kinetic.Circle({
                x: this.coordinate.x,
                y: this.coordinate.y,
                radius: this.radius,
                fill: 'red'
            });
            layer.add(circle);
        };
        Object.defineProperty(BouncingBallParticle.prototype, "movingToLeft", {
            get: function () {
                return this.vx < 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "movingToRight", {
            get: function () {
                return this.vx > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "movingToTop", {
            get: function () {
                return this.vy < 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BouncingBallParticle.prototype, "movingToBottom", {
            get: function () {
                return this.vy > 0;
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
                return this.coordinate.x >= this.stage.getWidth() - this.radius;
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
                return this.coordinate.y >= this.stage.getHeight() - this.radius;
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
    })(Particle);
    exports.BouncingBallParticle = BouncingBallParticle;    
    var FireworkParticle = (function (_super) {
        __extends(FireworkParticle, _super);
        function FireworkParticle(stage) {
                _super.call(this, stage);
            this.stage = stage;
            this.coordinate.x = this.stage.getWidth() / 2;
            this.coordinate.y = this.stage.getHeight() / 2;
            this.vx = (Math.random() * 2 - 1) * 40;
            this.vy = (Math.random() * 2 - 1) * 40;
            this.dt = 1.0 / framesPerSecond;
            this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
        }
        FireworkParticle.prototype.draw = function (layer) {
        };
        FireworkParticle.prototype.update = function () {
            this.updateLastCoordinate();
            _super.prototype.update.call(this);
        };
        FireworkParticle.prototype.updateLastCoordinate = function () {
            this.lastCoordinate = this.coordinate;
        };
        return FireworkParticle;
    })(Particle);
    exports.FireworkParticle = FireworkParticle;    
})
