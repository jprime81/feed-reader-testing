// This is the spec file that Jasmine will read and contains
// all of the tests that will be run against your application.
//
// We're placing all of our tests within the $() function,
// since some of these tests may require DOM elements. We want
// to ensure they don't run until the DOM is ready.

$(function() {

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have defined URLs and should not be empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have defined names and should not be empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    /* "The menu" test suite*/
    describe('The menu', function() {

        const menuIcon = $('.menu-icon-link');
        const pageBody = $('body');

        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            expect(pageBody.hasClass('menu-hidden')).toBeTruthy();
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('is visible when the menu icon is clicked', function () {
            // Click to unhide the menu
            menuIcon.click();
            expect(pageBody.hasClass('menu-hidden')).toBeFalsy();

            // Click to hide the menu
            menuIcon.click();
            expect(pageBody.hasClass('menu-hidden')).toBeTruthy();
          });
    });

    /* "Initial Entries" test suite*/
    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // Waits for the asynch to finish
         beforeEach(function(done) {

            // loads initial feed
            loadFeed(0, function() {
              done();
            });
         });

         it('should contain at least one entry within the container', function() {
            expect($('.feed').has('.entry').length).not.toBe(0);
         });
    });

    /* "New Feed Selection" test suite*/
    describe('New Feed Selection', function() {

        let initial;
        let current;

        // Waits for the asynch to finish
        beforeEach(function(done) {
            
            // loads initial feed
            loadFeed(0, function() {

                initial = $('.feed').html();

                // loads current feed
                loadFeed(1, function() {

                    done();
                });
            });

        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('displays the feed of the clicked menu item', function(done) {
            current = $('.feed').html();
            expect(current).not.toBe(initial);
            done();
        });

    });


}());