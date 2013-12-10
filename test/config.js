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