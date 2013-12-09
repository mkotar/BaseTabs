/*global define*/

define([
    'jquery',
    'bootstrap'
], function ($, Bootstrap) {
    'use strict';

    var TabsController = function (opts) {

        var tabList = [],
            templates,
            mainElement = null,
            container = null,
            data = {
                sorting: false,
                sortBy: false
            };

        data = $.extend({}, data, opts);
        mainElement = $('#' + data.el);

        templates = {
            tabstrip: function (htmlId) {
                return '<ul class="nav nav-tabs" id="' + htmlId + '" /><div class="tab-content" />';
            },
            tabNav: function (guid, name, isClosable) {
                var noClose = '<li><a href="#' + guid + '" data-toggle="tab">' + name + '</a></li>',
                    hasClose = '<li><a href="#' + guid + '" data-toggle="tab">' + name + '<span class="tab-closer" data-guid="' + guid + '">&nbsp;&nbsp;&times;</span></a></li>';
                return  isClosable ? hasClose : noClose;
            },
            tabPane: function (guid) {
                return '<div class="tab-pane fade" id="' + guid + '"></div>';
            }
        };

        var initTabstripDOM = function () {
            mainElement.append(templates.tabstrip(data.tabstripId));
            container = $('#' + data.tabstripId);
            addListeners();
        };

        var addListeners = function addListeners() {
            //close btn click
            container.on('click', 'span.tab-closer', function (el) {
                removeTab(this.getAttribute("data-guid"));
            });
        }

        var generateTabGuid = function () {
            var r = Math.floor((Math.random() * 1000) + 1);
            var t = (new Date().getTime());
            return data.el + t + r;
        };

        var defaultSort = function (a, b) {
            if (data.sortBy.indexOf(a.getTabType()) > data.sortBy.indexOf(b.getTabType())) {
                return 1;
            }
            if (data.sortBy.indexOf(b.getTabType()) < data.sortBy.indexOf(b.getTabType())) {
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
                    var i = data.sorting(a, b, data.sortBy);
                    console.log(i);
                    return i;
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

        var Tab = function (params) {
            var pane = templates.tabPane(params.guid),
                guid = params.guid,
                tabType = params.tabType,
                tabClose = params.tabClose !== undefined ? params.tabClose : true,
                tabName = params.tabName || '',
                nav = templates.tabNav(guid, tabName, tabClose);

            return {
                setName: function (newName) {
                    nav = renderNewTabName(guid, templates.tabNav(guid, newName, tabClose));
                },
                getTabName: function () {
                    return tabName;
                },
                getNav: function () {
                    return nav;
                },
                getGuid: function () {
                    return guid;
                },
                getPaneInnerHTML: function () {
                    return pane;
                },
                getTabType: function () {
                    return tabType;
                },
                getTabClose: function () {
                    return tabClose;
                },
                getTabEl: function () {
                    return $('#' + this.getGuid());
                }
            }
        };

        var renderNav = function () {
            container.detach();
            container.empty();
            $.each(tabList, function (index, item) {
                container.append(item.getNav());
            });
            mainElement.prepend(container);
        };

        function addTabContent(tab) {
            mainElement.find('div.tab-content').append(tab.getPaneInnerHTML());
        }

        function activateTab(tab) {
            var anchor = container.find('a[href="#' + tab.getGuid() + '"]');
            anchor.tab('show');
        }

        var createNewTab = function (tab) {
            tabList.push(tab);
            if (data.sorting || data.sortBy) {
                applySorting();
                renderNav();
                addTabContent(tab);
                activateTab(tab);
                return false;
            }

            mainElement.find('div.tab-content').append(tab.getPaneInnerHTML());
            container.append(tab.getNav());
            container.find('a[href="#' + tab.getGuid() + '"]').tab('show');
        };

        var addTab = function (opts) {

            var tabName = opts.tabName || '',
                tabType = opts.tabType || '',
                tabClose = opts.tabClose,
                guid = generateTabGuid();

            var tempTab = new Tab({
                guid: guid,
                tabName: tabName,
                tabType: tabType,
                tabClose: tabClose
            });

            createNewTab(tempTab);

            return tempTab;
        };

        var removeTab = function (guid) {
            if (!guid) {
                return false;
            }
            $('#' + guid).remove();
            container.find('a[href="#' + guid + '"]').parent().remove();
            container.find('a:last').tab('show');
        };

        initTabstripDOM();

        return {
            'addTab': addTab,
            'removeTab': removeTab
        }

    };

    return TabsController;
});