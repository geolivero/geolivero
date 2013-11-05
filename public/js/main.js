require({
    shim: {
        backbone: {
            deps: [
                'underscore',
                'zepto'
            ],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        hammerjs: {
            deps: [
                'zepto'
            ],
            exports: 'Hammerjs'
        },
        plugins: {
            deps: [
                'zepto',
                'hammerjs'
            ],
            exports: 'Plugins'
        },
        geo: {
            deps: [
                'zepto'
            ],
            exports: 'Geo'
        }
    },
    paths: {
        zepto: '../bower_components/zepto/zepto',
        backbone: '../bower_components/backbone/backbone',
        hammerjs: '../bower_components/hammerjs/dist/hammer',
        handlebars: '../bower_components/handlebars/handlebars',
        underscore: '../bower_components/underscore/underscore',
        geo: 'plugins/geo',
        text: '../bower_components/text/text',
        backbone: '../bower_components/backbone/backbone',
        template: '../js-templates'
    }
});

require([
    'zepto',
    'app'
], function($, App) {
    $(App.init);
});
