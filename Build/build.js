({
    baseUrl: '../Scripts',
    paths: {
        'jquery':     'Libs/jquery-1.9.1.min',
        'knockout':   'Libs/knockout-2.2.1.min',
        'raphael':    'Libs/raphael-min',
        'requireLib': 'Libs/require.min',
    },
    include: 'requireLib',
    name: 'main',
    out: '../Scripts/main-built.js'
})