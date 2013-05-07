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
})
