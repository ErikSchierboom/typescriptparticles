/// <reference path="../../libs/raphael.d.ts" />

/**
 * A HSL color.
 */
export class Color {
    constructor(public hue: number = 0, public saturation: number = 100, public lightness: number = 50) { }

    /**
     * Convert this instance to a Raphael-compatible coordinate.
     */
    public toRaphaelString() {
        return Raphael.hsl(this.hue, this.saturation, this.lightness);
    }
}