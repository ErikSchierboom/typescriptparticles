var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'helpers/vector', 'helpers/drawing', 'Particles/particle'], function(require, exports, __Vector__, __Drawing__, __Particle__) {
    var Vector = __Vector__;

    var Drawing = __Drawing__;

    var Particle = __Particle__;

    var FireworkParticle = (function (_super) {
        __extends(FireworkParticle, _super);
        function FireworkParticle(paper, coordinate, isRocket) {
            if (typeof isRocket === "undefined") { isRocket = true; }
                _super.call(this, paper);
            this.paper = paper;
            this.rocketColor = '#000000';
            this.particles = [];
            if(coordinate == undefined) {
                this.coordinate = new Vector.Vector2d(this.paper.width / 2, this.paper.height);
            } else {
                this.coordinate = coordinate;
            }
            this.updateBeginCoordinate();
            this.isRocket = isRocket;
            this.movement = new Vector.Vector2d((Math.random() * 2 - 1) * 40, this.paper.height - (Math.random() * 2 - 1) * 40);
            this.color = Raphael.hsl(Math.floor(Math.random() * 360), 100, 50);
            this.particles.push(this);
        }
        FireworkParticle.prototype.draw = function () {
            for(var i = 0; i < this.particles.length; ++i) {
                var particle = this.particles[i];
                var path = this.paper.path('M ' + particle.beginCoordinate.toRaphaelCoordinate() + ' L ' + particle.coordinate.toRaphaelCoordinate());
                path.attr('stroke', this.isRocket ? this.rocketColor : particle.color);
            }
        };
        FireworkParticle.prototype.update = function () {
            if(this.isRocket && this.iteration == Drawing.framesPerSecond * 2) {
                this.convertFromRocketToExplosion();
            }
            for(var i = 0; i < this.particles.length; ++i) {
                this.particles[i].update();
            }
        };
        FireworkParticle.prototype.convertFromRocketToExplosion = function () {
            this.particles = [];
            for(var i = 0; i < 50; ++i) {
                this.particles.push(new FireworkParticle(this.paper, this.coordinate, false));
            }
            this.isRocket = false;
        };
        FireworkParticle.prototype.updateBeginCoordinate = function () {
            this.beginCoordinate = this.coordinate;
        };
        return FireworkParticle;
    })(Particle.Particle);
    exports.FireworkParticle = FireworkParticle;    
})
