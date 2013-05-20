/// <reference path='../../../libs/jasmine.d.ts' />

/// <amd-dependency path='jasmine' />

import Drawing = module('src/helpers/drawing');

export module VectorSpec {

    describe('Drawing', function () {

        it('defines frames per second', function() {
            expect(Drawing.FramesPerSecond).toEqual(60);
        });
    });
};