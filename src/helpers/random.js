define(["require", "exports"], function(require, exports) {
    var Random = (function () {
        function Random() { }
        Random.inRange = function inRange(min, max) {
            return (Math.random() * (max - min)) + min;
        };
        return Random;
    })();
    exports.Random = Random;    
})
