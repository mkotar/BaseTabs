/*global define*/

define([
    'jquery',
    'bootstrap'
], function ($, Bootstrap) {
    'use strict';

    var TabsController = function (opts) {
        var tabGuids = [],
            templates,
            data = {};

        data = $.extend({}, data, opts);

            templates = {
                tabstrip: function (htmlId) {
                    return '<ul class="nav nav-tabs" id="' + htmlId + '" /><div class="tab-content" />';
                },
                tabNav: function (guid, name) {
                    return '<li><a href="#' + guid + '" data-toggle="tab">' + name + '</a></li>';
                },
                tabPane: function (guid) {
                    return '<div class="tab-pane" id="' + guid + '"></div>';
                }
            };

        var initTabstripDOM = function () {
            $('#' + data.el).append(templates.tabstrip(data.tabstripId));
        }

        var generateTabGuid = function () {
            var r = Math.floor((Math.random() * 1000) + 1);
            var t = (new Date().getTime());
            return data.el + (t + r);
        }

        var addTab = function (tabName) {
            tabName = tabName || '';
            var guid = generateTabGuid(),
                container = $('#' + data.tabstripId);

            $('#' + data.el).find('div.tab-content').append(templates.tabPane(guid));
            container.append(templates.tabNav(guid, tabName));
            container.find('a[href="#' + guid + '"]').tab('show');
            tabGuids.push(guid);
            return guid;
        };

        var removeTab = function (guid) {
            $('#' + guid).remove();
            $('#' + data.tabstripId).find('a[href="#' + guid + '"]').parent().remove();
            $('#' + data.tabstripId).find('a:last').tab('show');
        };

        var order = function order(opts){
            //no default implementation - provide your own
        }

        //do i even need this?
        var render = function render(opts){
//            order();
        }

        initTabstripDOM();

        return {
            'addTab': addTab,
            'removeTab': removeTab,
            'order':order
        }

    };


    return TabsController;
});