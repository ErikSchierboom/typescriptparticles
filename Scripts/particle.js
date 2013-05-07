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
        function Particle(ctx) {
                _super.call(this, ctx);
            this.ctx = ctx;
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
        function BouncingBallParticle(ctx) {
                _super.call(this, ctx);
            this.ctx = ctx;
            this.radius = Math.random() * 20 + 5;
            this.coordinate.x = Math.random() * (this.ctx.canvas.width - this.radius * 2) + this.radius;
            this.coordinate.y = Math.random() * (this.ctx.canvas.height - this.radius * 2) + this.radius;
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
        BouncingBallParticle.prototype.draw = function () {
            this.ctx.beginPath();
            this.ctx.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.closePath();
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
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
                return this.coordinate.x >= this.ctx.canvas.width - this.radius;
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
                return this.coordinate.y >= this.ctx.canvas.height - this.radius;
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
        function FireworkParticle(ctx) {
                _super.call(this, ctx);
            this.ctx = ctx;
            this.coordinate.x = this.ctx.canvas.width / 2;
            this.coordinate.y = this.ctx.canvas.height / 2;
            this.vx = (Math.random() * 2 - 1) * 40;
            this.vy = (Math.random() * 2 - 1) * 40;
            this.dt = 1.0 / framesPerSecond;
            this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
        }
        FireworkParticle.prototype.draw = function () {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastCoordinate.x, this.lastCoordinate.y);
            this.ctx.lineTo(this.coordinate.x, this.coordinate.y);
            this.ctx.closePath();
            this.ctx.lineWidth = 3.0;
            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
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