var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Drawable = (function () {
        function Drawable(stage) {
            this.stage = stage;
        }
        Drawable.prototype.draw = function (layer) {
        };
        return Drawable;
    })();
    exports.Drawable = Drawable;    
    var AnimatedDrawable = (function (_super) {
        __extends(AnimatedDrawable, _super);
        function AnimatedDrawable(stage) {
                _super.call(this, stage);
            this.stage = stage;
        }
        AnimatedDrawable.prototype.startAnimating = function (layer) {
            this.draw(layer);
        };
        AnimatedDrawable.prototype.stopAnimating = function () {
        };
        return AnimatedDrawable;
    })(Drawable);
    exports.AnimatedDrawable = AnimatedDrawable;    
    var Point = (function () {
        function Point(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    exports.Point = Point;    
})
