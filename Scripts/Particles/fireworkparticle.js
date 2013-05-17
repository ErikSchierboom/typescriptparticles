var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'Particles/particle'], function(require, exports, __Particle__) {
    
    var Particle = __Particle__;

    var FireworkParticle = (function (_super) {
        __extends(FireworkParticle, _super);
        function FireworkParticle(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.coordinate.x = this.paper.width / 2;
            this.coordinate.y = this.paper.height / 2;
            this.vx = (Math.random() * 2 - 1) * 40;
            this.vy = (Math.random() * 2 - 1) * 40;
            this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
        }
        FireworkParticle.prototype.draw = function () {
        };
        FireworkParticle.prototype.update = function () {
            this.updateLastCoordinate();
            _super.prototype.update.call(this);
        };
        FireworkParticle.prototype.updateLastCoordinate = function () {
            this.lastCoordinate = this.coordinate;
        };
        return FireworkParticle;
    })(Particle.Particle);
    exports.FireworkParticle = FireworkParticle;    
})
