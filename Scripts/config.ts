/// <reference path="Libs/Typings/require.d.ts" />
/// <reference path="Libs/Typings/knockout.d.ts" />

// Setup the dependencies for RequireJS
require.config({    
    paths: {
        'jquery':   'Libs/jquery-1.9.1.min',
        'knockout': 'Libs/knockout-2.2.1.min',
        'kinetic':  'Libs/kinetic-v4.5.1.min',
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