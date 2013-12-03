/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap_tabs/js/bootstrap',
        tabsController: 'vendor/base_tabs/tabsController'
    }
});

require([
    'backbone', 'routes/appRouter'
], function (Backbone, AppRouter) {
    var app = new AppRouter;

    Backbone.history.start();


});
