/// <reference path="typings/jquery.d.ts" />

// Return a pseudo-random number between -1 and 1
function GenerateRandomNumber() {
    return Math.random() * 2 - 1;
};

interface IDrawable {
    draw();
}

class Drawable implements IDrawable {
    constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {}
    draw() {}
}

class Particle extends Drawable {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    dt: number;
    color: string;

    constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = GenerateRandomNumber() * 30;
        this.vy = GenerateRandomNumber() * 30;
        this.r = Math.random() * 20 + 5;
        this.dt = 0.05;
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ',100%, 50%)';
    }

    public update() {
        this.x += this.vx * this.dt;
        this.y += this.vy * this.dt;
    }

    public draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

class Particles extends Drawable {
    particles: Particle[];

    constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);

        this.particles = [];
        this.addParticles(10);        
    }

    private addParticles(nmbr) {
        for (var i = 0; i < nmbr; i++) {
            var p = new Particle(this.canvas, this.ctx);
            this.particles.push(p);
        };
    };    

    public draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}

$(document).ready(function () {
    
    // Get the HTMLCanvasElement on which we will be drawing our particles
    var canvas = <HTMLCanvasElement>$('#particlesCanvas')[0];

    // Get the 2D rendering context from the canvas
    var ctx = canvas.getContext('2d');
    
    // Create the particles, which we will be rendering on the canvas
    var particles = new Particles(canvas, ctx);    

    // Define the interval for the particles to be redrawn
    var redrawParticlesIntervalInMilliseconds = 50;

    // Set an interval that will redraw the particles again and again
    setInterval(function () { particles.draw() }, redrawParticlesIntervalInMilliseconds);
});