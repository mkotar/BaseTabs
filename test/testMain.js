/* global require, mocha */
require.config({
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../app/bower_components/jquery/jquery',
        bootstrap: '../app/scripts/vendor/bootstrap_tabs/js/bootstrap',
        TabsController: '../app/scripts/vendor/base_tabs/tabsController'
    }
});

require([
    // FILE(S) BEING TESTED
    'spec/test'
], function (test) {
    'use strict';
    // INITIALIZE THE RUN
    console.log('RUN BABY RUN.........................', test);
    mocha.run();
});
