/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AppviewView = Backbone.View.extend({
        template: JST['app/scripts/templates/appView.ejs'],
        initialize: function(opts){
            this.el = opts.el || 'div';
            console.log('View init')
        },

        render: function(){

            this.$el.html(this.template());
        }
    });

    return AppviewView;
});