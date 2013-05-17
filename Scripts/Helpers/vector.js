define(["require", "exports"], function(require, exports) {
    var Vector2d = (function () {
        function Vector2d(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this.x = x;
            this.y = y;
        }
        return Vector2d;
    })();
    exports.Vector2d = Vector2d;    
})
