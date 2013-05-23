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
            this.age = 0;
            this.reset();
        }
        Particle.prototype.draw = function () {
            var particleAsCircle = this.paper.circle(this.location.x, this.location.y, this.radius);
            particleAsCircle.attr('fill', this.color.toRaphaelString());
            particleAsCircle.attr('fill-opacity', this.getOpacity());
        };
        Particle.prototype.reset = function () {
            this.radius = this.getInitialRadius();
            this.location = this.getInitialLocation();
            this.acceleration = this.getInitialAcceleration();
            this.velocity = this.getInitialVelocity();
            this.color = this.getInitialColor();
            this.age = 0;
        };
        Particle.prototype.update = function () {
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
            this.age += 1;
        };
        Particle.prototype.getOpacity = function () {
            return 1.0;
        };
        Particle.prototype.isDead = function () {
            throw 'You should override this method in the descendant class.';
        };
        Particle.prototype.getInitialRadius = function () {
            throw 'You should override this method in the descendant class.';
        };
        Particle.prototype.getInitialAcceleration = function () {
            throw 'You should override this method in the descendant class.';
        };
        Particle.prototype.getInitialLocation = function () {
            throw 'You should override this method in the descendant class.';
        };
        Particle.prototype.getInitialVelocity = function () {
            throw 'You should override this method in the descendant class.';
        };
        Particle.prototype.getInitialColor = function () {
            throw 'You should override this method in the descendant class.';
        };
        return Particle;
    })(Drawing.Drawable);
    exports.Particle = Particle;    
})
