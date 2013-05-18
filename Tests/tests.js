require.config({
    baseUrl: '../',
    paths: {
        'jquery': 'scripts/libs/jquery-1.9.1.min',
        'knockout': 'scripts/libs/knockout-2.2.1.min',
        'raphael': 'scripts/libs/raphael-min',
        'jasmine': 'scripts/libs/jasmine',
        'jasmine-html': 'scripts/libs/jasmine-html'
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
    'specifications/helpers/vectorspec'
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
