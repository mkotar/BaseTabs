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
        };

        var generateTabGuid = function () {
            var r = Math.floor((Math.random() * 1000) + 1);
            var t = (new Date().getTime());
            return data.el + (t + r);
        };

        var renderNewTabName = function (guid, newNav) {
            var org = $("a[href='#"+guid+"']").parent();
            console.log(org.hasClass('active'));
            var active = org.hasClass('active') ? 'active' : '';

            org.replaceWith(newNav);
            $("a[href='#"+guid+"']").parent().addClass('active');
            return newNav;
        };

        var tab = function (params) {
            console.log('params', params);
            var nav = templates.tabNav(params.guid, params.tabName);
            var pane = templates.tabPane(params.guid);
            var guid = params.guid;

            return {
                setName: function (newName) {
                    nav = renderNewTabName(guid, templates.tabNav(guid, newName));
                },
                getNav: function () {
                    return nav;
                },
                getGuid: function () {
                    return guid;
                },
                getPane: function () {
                    return pane;
                }
            }
        };

        var createNewTab = function (tab) {
            var container = $('#' + data.tabstripId);
            $('#' + data.el).find('div.tab-content').append(tab.getPane());
            container.append(tab.getNav());
            container.find('a[href="#' + tab.getGuid() + '"]').tab('show');
            tabGuids.push(tab.getGuid());
        };

        var addTab = function (tabName) {
            tabName = tabName || '';
            var guid = generateTabGuid();
//                container = $('#' + data.tabstripId);

            var tempTab = new tab({
                guid: guid,
                tabName: tabName
            });

            createNewTab(tempTab);


            return tempTab;
        };

        var removeTab = function (guid) {
            $('#' + guid).remove();
            $('#' + data.tabstripId).find('a[href="#' + guid + '"]').parent().remove();
            $('#' + data.tabstripId).find('a:last').tab('show');
        };

        var order = function order(opts) {
            //no default implementation - provide your own
        }

        //do i even need this?
        var render = function render(opts) {
//            order();
        }

        initTabstripDOM();

        return {
            'addTab': addTab,
            'removeTab': removeTab,
            'order': order
        }

    };


    return TabsController;
});