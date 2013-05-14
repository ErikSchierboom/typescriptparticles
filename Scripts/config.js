require.config({
    paths: {
        'jquery': 'Libs/jquery-1.9.1.min',
        'knockout': 'Libs/knockout-2.2.1.min',
        'kinetic': 'Libs/kinetic-v4.5.1.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'knockout': {
            exports: 'ko'
        }
    }
});
require([
    'jquery', 
    'knockout', 
    'AppViewModel'
], function (jQuery, ko, appViewModel) {
    var viewmodel = new appViewModel.AppViewModel();
    ko.applyBindings(viewmodel);
});
