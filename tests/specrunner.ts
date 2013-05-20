/// <reference path="../libs/require.d.ts" />
/// <reference path="../libs/jasmine.d.ts" />

// Setup the dependencies for RequireJS
require.config({
    baseUrl: './',
    paths: {
        'src': '../src',
        'jquery': '../libs/jquery-1.9.1.min',
        'knockout': '../libs/knockout-2.2.1.min',
        'raphael': '../libs/raphael-min',
        'jasmine': '../libs/jasmine',
        'jasmine-html': '../libs/jasmine-html',
    },
    shim: {
        'jquery':   { exports: '$'  },
        'knockout': { exports: 'ko' },
        'jasmine':  { exports: 'jasmine' },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

// Start the app by first requiring the following libraries to be loaded
require(['jquery', 'knockout', 'jasmine', 'jasmine-html', 'specs/all'], (jQuery, ko, jasmine, jasmineHtml) => {

    // Create the Jasmine environment that will be running our tests
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    // Output the test results to HTML
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };
    
    // Run the spec runner to perform the actual tests
    jasmineEnv.execute();
});