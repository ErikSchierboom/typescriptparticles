require.config({
    paths: {
        'jquery': 'libs/jquery-1.9.1.min',
        'knockout': 'libs/knockout-2.2.1.min',
        'raphael': 'libs/raphael-min'
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
