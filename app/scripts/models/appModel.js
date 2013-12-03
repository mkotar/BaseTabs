/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var AppmodelModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return AppmodelModel;
});