define(["require", "exports"], function(require, exports) {
    
    (function (VectorSpec) {
        describe("Vector2d", function () {
            var vector;
            beforeEach(function () {
                vector = new Vector.Vector2d();
            });
            it("can be multiplied with a number", function () {
                vector = new Vector.Vector2d(5, 7);
                expect(vector.multiply(3)).toEqual(new Vector.Vector2d(15, 21));
            });
        });
    })(exports.VectorSpec || (exports.VectorSpec = {}));
    var VectorSpec = exports.VectorSpec;
    ;
})
