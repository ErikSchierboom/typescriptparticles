({
    baseUrl: '../',
    paths: {
        'jquery':     'libs/jquery-1.9.1.min',
        'knockout':   'libs/knockout-2.2.1.min',
        'raphael':    'libs/raphael-min',
        'requireLib': 'libs/require.min',
    },
    include: 'requireLib',
    name: 'main',
    out: '../main-built.js'
})