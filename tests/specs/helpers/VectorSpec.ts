/// <reference path='../../../libs/jasmine.d.ts' />

/// <amd-dependency path='jasmine' />

import Vector = module('src/helpers/vector');

export module VectorSpec {

    describe('Vector', function () {

        describe('Vector2d', function () {
            var vector: Vector.Vector2d;

            beforeEach(function () {
                vector = new Vector.Vector2d(5, 7);
            });

            describe('after construction', function () {

                describe('using custom constructor', function () {
                    it('has x property set to passed value', function () {
                        expect(vector.x).toEqual(5);
                    });

                    it('has y property set to passed value', function () {
                        expect(vector.y).toEqual(7);
                    });
                });

                describe('using default constructor', function () {
                    beforeEach(function () {
                        vector = new Vector.Vector2d();
                    });

                    it('has x property set to zero', function () {
                        expect(vector.x).toEqual(0);
                    });

                    it('has y property set to zero', function () {
                        expect(vector.y).toEqual(0);
                    });
                });
            });

            it('can be multiplied with a number', function () {
                expect(vector.multiply(3)).toEqual(new Vector.Vector2d(15, 21));
            });

            it('can be added to another vector', function () {
                expect(vector.add(new Vector.Vector2d(7, 6))).toEqual(new Vector.Vector2d(12, 13));
            });

            it('can be converted to a Raphael coordinate', function () {
                expect(vector.toRaphaelCoordinate()).toEqual('5 7');
            });
        });
    });
};