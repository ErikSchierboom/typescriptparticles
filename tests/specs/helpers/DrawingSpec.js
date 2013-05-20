define(["require", "exports", 'src/helpers/drawing', "jasmine"], function(require, exports, __Drawing__) {
    var Drawing = __Drawing__;

    (function (VectorSpec) {
        describe('Drawing', function () {
            it('defines frames per second', function () {
                expect(Drawing.FramesPerSecond).toEqual(60);
            });
        });
    })(exports.VectorSpec || (exports.VectorSpec = {}));
    var VectorSpec = exports.VectorSpec;
    ;
})
