/*global define*/

define([
    'underscore',
    'backbone',
    'models/appCollection'
], function (_, Backbone, AppcollectionModel) {
    'use strict';

    var AppcollectionCollection = Backbone.Collection.extend({
        model: AppcollectionModel
    });

    return AppcollectionCollection;
});