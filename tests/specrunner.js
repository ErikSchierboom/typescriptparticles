require.config({
    baseUrl: './',
    paths: {
        'src': '../src',
        'jquery': '../libs/jquery-1.9.1.min',
        'knockout': '../libs/knockout-2.2.1.min',
        'raphael': '../libs/raphael-min',
        'jasmine': '../libs/jasmine',
        'jasmine-html': '../libs/jasmine-html'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'knockout': {
            exports: 'ko'
        },
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: [
                'jasmine'
            ],
            exports: 'jasmine'
        }
    }
});
require([
    'jquery', 
    'knockout', 
    'jasmine', 
    'jasmine-html', 
    'specs/all'
], function (jQuery, ko, jasmine, jasmineHtml) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };
    jasmineEnv.execute();
});
