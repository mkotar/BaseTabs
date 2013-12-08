/*global define*/

define([
    'jquery',
    'bootstrap'
], function ($, Bootstrap) {
    'use strict';

    var TabsController = function (opts) {
        var tabList = [],
            templates,
            data = {
                sorting: false,
                sortBy: false
            };

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

        var defaultSort = function (a, b) {
            if (data.sortBy.indexOf(a.getType()) > data.sortBy.indexOf(b.getType())) {
                return 1;
            }
            if (data.sortBy.indexOf(b.getType()) < data.sortBy.indexOf(b.getType())) {
                return -1;
            }
            return 0;
        };

        var isFunction = function (possibleFunction) {
            return (typeof(possibleFunction) == typeof(Function));
        };

        var applySorting = function () {
            if (!data.sortBy) {
                return;
            }

            if (isFunction(data.sorting)) {
                tabList.sort(function (a, b) {
                    return data.sorting(a, b, data.sortBy);
                });
                return;
            }

            tabList.sort(function (a, b) {
                return defaultSort(a, b);
            });
        };

        var renderNewTabName = function (guid, newNav) {
            var org = $("a[href='#" + guid + "']").parent();
            var active = org.hasClass('active') ? 'active' : '';

            org.replaceWith(newNav);
            $("a[href='#" + guid + "']").parent().addClass('active');
            return newNav;
        };

        var tab = function (params) {
            var nav = templates.tabNav(params.guid, params.tabName);
            var pane = templates.tabPane(params.guid);
            var guid = params.guid;
            var type = params.type;

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
                },
                getType: function () {
                    return type;
                }
            }
        };


        var renderNav = function() {
            var container = $('#' + data.tabstripId);
            container.empty();
                console.log('renderNav')
            $.each(tabList, function(index, item){
                container.append(item.getNav());
            });
        };

        var createNewTab = function (tab) {
            var container = $('#' + data.tabstripId);

            tabList.push(tab);
            if (data.sorting || data.sortBy) {
                applySorting();
                renderNav();
                $('#' + data.el).find('div.tab-content').append(tab.getPane());
                container.find('a[href="#' + tab.getGuid() + '"]').tab('show');
                return;
            }

            $('#' + data.el).find('div.tab-content').append(tab.getPane());
            container.append(tab.getNav());
            container.find('a[href="#' + tab.getGuid() + '"]').tab('show');
        };

        var addTab = function (tabName, tabType) {
            tabName = tabName || '';
            var guid = generateTabGuid();

            var tempTab = new tab({
                guid: guid,
                tabName: tabName,
                type: tabType
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