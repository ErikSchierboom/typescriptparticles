/// <reference path="../../libs/raphael.d.ts" />

import Color = module('helpers/color');
import Vector = module('helpers/vector');
import Drawing = module('helpers/drawing');

/**
 * This class forms the base of any particle implementation. It defines a set of properties
 * shared by all particles and some common methods and properties. It extends from the 
 * Drawable class to render the particle to the screen.
 */
export class Particle extends Drawing.Drawable {
    location: Vector.Vector2d = new Vector.Vector2d();
    velocity: Vector.Vector2d = new Vector.Vector2d();
    acceleration: Vector.Vector2d = new Vector.Vector2d();
    color: Color.Color;
    radius: number;
    
    constructor(public paper: RaphaelPaper) {
        super(paper);
    }

    /**
     * Update the particle's vectors and age.
     */
    public update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
    }

    /**
     * Indicates if the particle is dead.
     */
    public get isDead() {
        return false;
    }

    // Properties used to retrieve the movement direction of the particle
    public get movingToLeft(): bool { return this.velocity.x < 0; }
    public get movingToRight(): bool { return this.velocity.x > 0; }
    public get movingToTop(): bool { return this.velocity.y < 0; }
    public get movingToBottom(): bool { return this.velocity.y > 0; }

    // Properties used to determine if the bouncing ball is over a border
    public get overLeftBorder(): bool { return this.location.x <= this.radius; }
    public get overRightBorder(): bool { return this.location.x >= this.paper.width - this.radius; }
    public get overTopBorder(): bool { return this.location.y <= this.radius; }
    public get overBottomBorder(): bool { return this.location.y >= this.paper.height - this.radius; }
}