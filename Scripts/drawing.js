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
})
