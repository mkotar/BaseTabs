describe('TabsController', function () {
    var TabsController,
        tabs,
        opts = {
            el: 'my-tabstrip',
            tabstripId: 'myTabs'
        };

    beforeEach(function (done) {
        requirejs([
            'TabsController'
        ], function (tabby) {
            $('#' + opts.el).empty();
            TabsController = clone(tabby);
            tabs = new TabsController(opts);
            done();
        });
    });

    afterEach(function () {
        $('#' + opts.el).empty();
    })

    it('should create Bootstrap tab containers when invoked', function () {
        var tabStrip,
            mainEl;

        tabStrip = $('#' + opts.tabstripId);
        mainEl = $('#' + opts.el);
        mainEl.find(tabStrip).length.should.equal(1);

        // has bootstrap class nav?
        var tabStripClasses = tabStrip.attr("class").split(" ");
        chai.expect(tabStripClasses, "tabStrip classes").to.contain("nav");
    });

    it('should add a new tab nav', function () {
        var mainEl,
            firstTab,
            tabNav;

        firstTab = tabs.addTab({tabName: 'Bob', tabType: 'directory'});

        mainEl = $('#' + opts.el);
        tabNav = mainEl.find('a[href=#' + firstTab.getGuid() + ']');
        tabNav.length.should.be.equal(1);
    });

    it('should add a new tab pane', function () {
        var mainEl,
            firstTab,
            tabNav;

        firstTab = tabs.addTab({tabName: 'Bob', tabType: 'directory'});

        mainEl = $('#' + opts.el);
        tabNav = mainEl.find('#' + firstTab.getGuid());
        tabNav.length.should.be.equal(1);
    });

    it('should add a new tab with close button', function () {
        var mainEl,
            firstTab,
            tabNav,
            tabCloser;

        firstTab = tabs.addTab({tabName: 'Bob', tabType: 'directory'});

        mainEl = $('#' + opts.el);
        tabNav = mainEl.find('a[href=#' + firstTab.getGuid() + ']');
        tabCloser = tabNav.find('.tab-closer');

        tabCloser.length.should.be.equal(1);
    });

    it('should remove tab when click on close button', function () {
        var mainEl,
            firstTab,
            tabCloser;

        firstTab = tabs.addTab({tabName: 'Bob', tabType: 'directory'});
        mainEl = $('#' + opts.el);
        firstTabEl = mainEl.find('a[href=#' + firstTab.getGuid() + ']');

        tabCloser = firstTabEl.find('.tab-closer');
        tabCloser.trigger('click');

        // tab nav removed?
        mainEl.find('a[href=#' + firstTab.getGuid() + ']').length.should.be.equal(0);
        // tab pane removed?
        mainEl.find('#' + firstTab.getGuid()).length.should.be.equal(0);
    });
});

