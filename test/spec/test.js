/*global describe, it */
'use strict';
(function ($) {
    describe('TabsController', function ($) {
        it('should create Bootstrap containers - tabstrip & tabpane', function ($) {
            var opts = {
                    el: 'my-tabstrip',
                    tabstripId: 'myTabs'
                },
                tabStrip = $('#' + opts.tabstripId),
                mainEl = $('#' + opts.el),
                tabs;

            tabs = new TabsController(opts);

            mainEl.find(tabStrip).length.should.equal(1);
        });
    });
})($);
