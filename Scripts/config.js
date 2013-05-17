require.config({
    paths: {
        'jquery': 'Libs/jquery-1.9.1.min',
        'knockout': 'Libs/knockout-2.2.1.min',
        'raphael': 'Libs/raphael-min'
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
