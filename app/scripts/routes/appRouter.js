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
//                sorting: function(a, b, sortBy) {
//                    if (typeof a.getType() === 'undefined') {
//                        console.log('a', a.getNav())
//                    }
//                        if (sortBy.indexOf(a.getType()) < sortBy.indexOf(b.getType()))
//                       return 1;
//                     if (sortBy.indexOf(b.getType()) > sortBy.indexOf(b.getType()))
//                       return -1;
//                     return 0;
//                },
                sortBy: ['start','directory','single']
            });

            // first tab
            var firstTab = tabs.addTab('firstTab - single', 'single');
            $('#' + firstTab.getGuid()).html('<p>Hello Bob</p>');

            // no-name tab
            var noName = tabs.addTab('','directory');
            noName.setName('new Name - directory', 'directory');
            new AppView({el: $('#' + noName.getGuid())}).render();

            var dirTab = tabs.addTab('dirTab - directory', 'directory');
            $('#' + dirTab.getGuid()).html('<p>Hello Bob</p>');

            // last tab
            var lastTab = tabs.addTab('lastTab - start','start');
            $('#' + lastTab.getGuid()).html('<p>Hello Bob</p>');


//            setTimeout(function(){
//                tabs.removeTab(tabId)
//            }, 3000);

        }
    });

    return ApprouterRouter;
});