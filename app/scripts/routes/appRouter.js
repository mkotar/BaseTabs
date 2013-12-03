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
            var x = tabs.addTab('Start');
            $('#'+x).html('<p>Hello Bob</p>');
            var tabId = tabs.addTab('Vendor');

            var y =tabs.addTab('Seed');
            $('#'+y).html('<p>Hello Damo</p>');
            new AppView({el: $('#'+tabId)}).render();

//            setTimeout(function(){
//                tabs.removeTab(tabId)
//            }, 3000);

        }
    });

    return ApprouterRouter;
});