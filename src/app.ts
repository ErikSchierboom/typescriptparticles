/// <reference path="../libs/require.d.ts" />
/// <reference path="../libs/knockout.d.ts" />

// Setup the dependencies for RequireJS
require.config({
    paths: {
        'jquery': '../libs/jquery-1.9.1.min',
        'knockout': '../libs/knockout-2.2.1.min',
        'raphael': '../libs/raphael-min',
    },
    shim: {
        'jquery':   { exports: '$'  },
        'knockout': { exports: 'ko' },               
    }
});

// Start the app, but require that jQuery, Knockout and the AppViewModel modules
// have been loaded first. A consequence of this is that
require(['jquery', 'knockout', 'appviewmodel'], ($, ko, appViewModel) => {

    // When the document has been loaded, we create the view model for the app
    // and bind it to Knockout
    $(function () {
        ko.applyBindings(new appViewModel.AppViewModel());
    });
});