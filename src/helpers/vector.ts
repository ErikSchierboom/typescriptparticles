/**
 * A simple 2D vector.
 */
export class Vector2d {
    constructor(public x: number = 0, public y: number = 0) { }

    public add(vector: Vector2d) {
        return new Vector2d(this.x + vector.x, this.y + vector.y);
    }

    public multiply(mult: number) {
        return new Vector2d(this.x * mult, this.y * mult);
    }

    public toRaphaelCoordinate() {
        return this.x + ' ' + this.y;
    }
}