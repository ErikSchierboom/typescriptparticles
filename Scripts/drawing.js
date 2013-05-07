var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Drawable = (function () {
        function Drawable(ctx) {
            this.ctx = ctx;
        }
        Drawable.prototype.draw = function () {
        };
        return Drawable;
    })();
    exports.Drawable = Drawable;    
    var AnimatedDrawable = (function (_super) {
        __extends(AnimatedDrawable, _super);
        function AnimatedDrawable(ctx) {
                _super.call(this, ctx);
            this.ctx = ctx;
        }
        AnimatedDrawable.prototype.startAnimating = function () {
            var _this = this;
            this.animationHandle = window.requestAnimationFrame(function () {
                _this.startAnimating();
            });
            this.draw();
        };
        AnimatedDrawable.prototype.stopAnimating = function () {
            window.cancelAnimationFrame(this.animationHandle);
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
