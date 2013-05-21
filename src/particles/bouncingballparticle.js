var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/color', 'helpers/vector', 'particles/particle'], function(require, exports, __Color__, __Vector__, __Particle__) {
    var Color = __Color__;

    var Vector = __Vector__;

    
    
    var Particle = __Particle__;

    var BouncingBallParticle = (function (_super) {
        __extends(BouncingBallParticle, _super);
        function BouncingBallParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.radius = Math.random() * 20 + 5;
            this.location = new Vector.Vector2d(Math.random() * (paper.width - this.radius * 2) + this.radius, Math.random() * (paper.height - this.radius * 2) + this.radius);
            this.velocity = new Vector.Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
            this.color = new Color.Color(Math.floor(Math.random() * 360));
        }
        BouncingBallParticle.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.shouldReverseHorizontalDirection) {
                this.velocity.x *= -1;
            }
            if(this.shouldReverseVerticalDirection) {
                this.velocity.y *= -1;
            }
        };
        BouncingBallParticle.prototype.draw = function () {
            var bouncingBall = this.paper.circle(this.location.x, this.location.y, this.radius);
            bouncingBall.attr('fill', this.color.toRaphaelString());
        };
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
