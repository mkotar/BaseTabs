/*global define*/

define([
    'jquery',
    'backbone',
    'views/appView',
    'tabsController'
], function ($, Backbone, AppView, TabsController) {
    'use strict';

    var ApprouterRouter = Backbone.Router.extend({
        routes: {
            '': 'help'
        },
        help: function () {
            console.log('router "/"');
            var tabs = new TabsController({
                el: 'my-tabstrip',
                tabstripId: 'myTabs',
                sortBy: ['start', 'directory', 'single']
            });

            // first tab
            var firstTab = tabs.addTab({tabName: 'firstTab - single', tabType: 'single'});
            $('#' + firstTab.getGuid()).html('<p>Tab 1</p>');

            // no-name tab
            var noName = tabs.addTab({
                tabType: 'directory'
            });


            noName.setName('new Name - directory');
            new AppView({el: noName.getTabEl()}).render();

            // last tab
            var lastTab = tabs.addTab({tabName: 'lastTab - start', tabType: 'start', tabClose: false});
            $('#' + lastTab.getGuid()).html('<p>Tab start</p>');

            var dirTab = tabs.addTab({tabName: 'dirTab - directory', tabType: 'directory'});
            $('#' + dirTab.getGuid()).html('<p>Tab 3</p>');


        }
    });

    return ApprouterRouter;
});