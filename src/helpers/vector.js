define(["require", "exports"], function(require, exports) {
    var Vector2d = (function () {
        function Vector2d(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector2d.prototype.add = function (vector) {
            return new Vector2d(this.x + vector.x, this.y + vector.y);
        };
        Vector2d.prototype.multiply = function (mult) {
            return new Vector2d(this.x * mult, this.y * mult);
        };
        Vector2d.prototype.toRaphaelCoordinate = function () {
            return this.x + ' ' + this.y;
        };
        return Vector2d;
    })();
    exports.Vector2d = Vector2d;    
})
