var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    exports.framesPerSecond = 60;
    var Drawable = (function () {
        function Drawable(paper) {
            this.paper = paper;
        }
        Drawable.prototype.draw = function () {
        };
        return Drawable;
    })();
    exports.Drawable = Drawable;    
    var CompositeDrawable = (function (_super) {
        __extends(CompositeDrawable, _super);
        function CompositeDrawable(paper) {
                _super.call(this, paper);
            this.paper = paper;
            this.Drawables = [];
        }
        CompositeDrawable.prototype.draw = function () {
            for(var i = 0; i < this.Drawables.length; ++i) {
                this.Drawables[i].draw();
            }
        };
        return CompositeDrawable;
    })(Drawable);
    exports.CompositeDrawable = CompositeDrawable;    
})
