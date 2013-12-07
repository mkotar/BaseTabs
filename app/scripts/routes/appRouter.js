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
            var tabs = new TabsController({el: 'my-tabstrip', tabstripId: 'myTabs'});

            // first tab
            var firstTab = tabs.addTab('firstTab');
            $('#' + firstTab.getGuid()).html('<p>Hello Bob</p>');


            // no-name tab
            var noName = tabs.addTab();
            noName.setName('new Name');
            new AppView({el: $('#' + noName.getGuid())}).render();

            // last tab
            var lastTab = tabs.addTab('lastTab');
            $('#' + lastTab.getGuid()).html('<p>Hello Bob</p>');



//            setTimeout(function(){
//                tabs.removeTab(tabId)
//            }, 3000);

        }
    });

    return ApprouterRouter;
});