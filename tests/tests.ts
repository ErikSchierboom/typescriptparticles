/// <reference path="../scripts/libs/typings/require.d.ts" />
/// <reference path="../scripts/libs/typings/knockout.d.ts" />
/// <reference path="../scripts/libs/typings/jasmine.d.ts" />

// Setup the dependencies for RequireJS
require.config({
    baseUrl: '../',
    paths: {
        'specs': 'specifications',
        'src': 'scripts',
        'jquery': 'scripts/libs/jquery-1.9.1.min',
        'knockout': 'scripts/libs/knockout-2.2.1.min',
        'raphael': 'scripts/libs/raphael-min',
        'jasmine': 'scripts/libs/jasmine',
        'jasmine-html': 'scripts/libs/jasmine-html',
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
require(['jquery', 'knockout', 'jasmine', 'jasmine-html', 'specs/helpers/vectorspec' ], (jQuery, ko, jasmine, jasmineHtml) => {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };
    
    jasmineEnv.execute();
});