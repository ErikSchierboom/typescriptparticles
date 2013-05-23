/**
 * A simple 2D vector.
 */
export class Vector2d {
    constructor(public x: number = 0, public y: number = 0) { }

    /**
     * Add another vector to this vector.
     */
    public add(vector: Vector2d) {
        this.x += vector.x;
        this.y += vector.y;
    }

    /**
     * Convert this instance to a Raphael-compatible coordinate.
     */
    public toRaphaelCoordinate() {
        return this.x + ' ' + this.y;
    }
}