/// <reference path="libs/typings/require.d.ts" />
/// <reference path="libs/typings/knockout.d.ts" />

// Setup the dependencies for RequireJS
require.config({
    paths: {
        'jquery':   'libs/jquery-1.9.1.min',
        'knockout': 'libs/knockout-2.2.1.min',
        'raphael':  'libs/raphael-min',
    },
    shim: {
        'jquery':   { exports: '$'  },
        'knockout': { exports: 'ko' },               
    }
});

// Start the app by first requiring the following libraries to be loaded
require(['jquery', 'knockout', 'AppViewModel'], (jQuery, ko, appViewModel) => {

    // Create the app's view model and apply its bindings to knockout
    var viewmodel = new appViewModel.AppViewModel();
    ko.applyBindings(viewmodel);
});