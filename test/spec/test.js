describe('TabsController', function () {
    var TabsController,
        mainElId = 'my-tabstrip',
        tabstripId = 'myTabs';

    beforeEach(function (done) {
        require([
            'TabsController'
        ], function (tabby) {
            $('#' + mainElId).empty();
            TabsController = clone(tabby);
            done();
        });
    });

    after(function () {
        $('#' + mainElId).empty();
    })

    it('should create Bootstrap tab containers when invoked', function () {
        var tabStrip,
            mainEl,
            tabs,
            opts = {
                el: mainElId,
                tabstripId: tabstripId
            };

        tabs = new TabsController(opts);

        tabStrip = $('#' + opts.tabstripId);
        mainEl = $('#' + opts.el);
//        console.log('1', TabsController.bob)
//        TabsController.bob = 'testing';
        mainEl.find(tabStrip).length.should.equal(1);
    });

    it('should add a new tab with close button', function () {
        var mainEl,
            tabs,
            firstTab,
            tabPane,
            tabNav,
            tabCloser,
            opts = {
                el: mainElId,
                tabstripId: tabstripId
            };

//        console.log('2', TabsController.bob);
        tabs = new TabsController(opts);
        firstTab = tabs.addTab({tabName: 'Bob', tabType: 'directory'});
        tabPane = firstTab.getTabEl();
        mainEl = $('#' + opts.el);
        tabNav = mainEl.find('a[href=#' + firstTab.getGuid() + ']');
        tabCloser = tabNav.find('.tab-closer');

        tabPane.length.should.not.be.equal(0);
        tabPane.length.should.be.equal(1);
        tabNav.length.should.not.be.equal(0);
        tabNav.length.should.be.equal(1);
        tabCloser.length.should.not.be.equal(0);
        tabCloser.length.should.be.equal(1);
    });
});

