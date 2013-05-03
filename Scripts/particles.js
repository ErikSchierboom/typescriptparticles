var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function GenerateRandomNumber() {
    return Math.random() * 2 - 1;
}
;
var Drawable = (function () {
    function Drawable(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    Drawable.prototype.draw = function () {
    };
    return Drawable;
})();
var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle(canvas, ctx) {
        _super.call(this, canvas, ctx);
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = GenerateRandomNumber() * 30;
        this.vy = GenerateRandomNumber() * 30;
        this.r = Math.random() * 20 + 5;
        this.dt = 0.05;
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
    }
    Particle.prototype.update = function () {
        this.x += this.vx * this.dt;
        this.y += this.vy * this.dt;
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    return Particle;
})(Drawable);
var Particles = (function (_super) {
    __extends(Particles, _super);
    function Particles(canvas, ctx) {
        _super.call(this, canvas, ctx);
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.addParticles(10);
    }
    Particles.prototype.addParticles = function (nmbr) {
        for(var i = 0; i < nmbr; i++) {
            var p = new Particle(this.canvas, this.ctx);
            this.particles.push(p);
        }
        ;
    };
    Particles.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    };
    return Particles;
})(Drawable);
$(document).ready(function () {
    var canvas = $('#particlesCanvas')[0];
    var ctx = canvas.getContext('2d');
    var particles = new Particles(canvas, ctx);
    var redrawParticlesIntervalInMilliseconds = 50;
    setInterval(function () {
        particles.draw();
    }, redrawParticlesIntervalInMilliseconds);
});
