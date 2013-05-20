/// <reference path="../../libs/require.d.ts" />

// This typescript file is used to load all the test specifications. It allows us to 
// easily require all specs in our testrunner using "specs/all", instead of manually
// requiring all the specs in the testrunner itself

var specs =
    [
        'specs/helpers/vectorspec',
        'specs/helpers/drawingspec',
    ];

define(specs, function () { });
