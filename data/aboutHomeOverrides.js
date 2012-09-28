/**
* Page-mod hacks to override about:home behavior
*/
self.on('message', function (event) {
    if (event.update_url) {
        localStorage['snippets-last-update'] = 0;
        localStorage['snippets-update-url'] = event.update_url;
        console.log("UPDATE URL " + event.update_url);
    }
});
