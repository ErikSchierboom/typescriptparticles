define(["require", "exports"], function(require, exports) {
    var Color = (function () {
        function Color(hue, saturation, lightness) {
            if (typeof hue === "undefined") { hue = 0; }
            if (typeof saturation === "undefined") { saturation = 100; }
            if (typeof lightness === "undefined") { lightness = 50; }
            this.hue = hue;
            this.saturation = saturation;
            this.lightness = lightness;
        }
        Color.prototype.toRaphaelString = function () {
            return Raphael.hsl(this.hue, this.saturation, this.lightness);
        };
        return Color;
    })();
    exports.Color = Color;    
})
