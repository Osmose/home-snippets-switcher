const panel = require('panel');
const widget = require('widget');

const data = require('self').data;

const PREF_UPDATE_URL = 'browser.aboutHomeSnippets.updateUrl';

var pageMod = require("page-mod");
var preferences = require("preferences-service");
var ss = require("simple-storage");
var tabs = require('tabs');

var snippet_panel = panel.Panel({
    width: 300,
    height:700,
    contentURL: data.url('options.html'),
    contentScriptFile: [
        data.url('jquery-1.8.2.min.js'),
        data.url('underscore-min.js'),
        data.url('options.js')
    ]
});

widget.Widget({
    id: 'snippet-button',
    label: 'about:home Snippet Switcher',
    content: 'SNIPPETS!',
    panel: snippet_panel
});

// Set up a page mod to make tweaks to about:home
pageMod.PageMod({
    include: 'about:home',
    contentScriptFile: [
        data.url('aboutHomeOverrides.js')
    ],
    contentScriptWhen: 'start',
    onAttach: function (worker) {
        var updateURL = preferences.get(PREF_UPDATE_URL);
        worker.postMessage({update_url: updateURL});
    }
});

snippet_panel.port.on('set_update_url', function(url) {
    preferences.set(PREF_UPDATE_URL, url);
    openHome();
});

function openHome() {
    for (var k = 0; k < tabs.length; k++) {
        var tab = tabs[k];
        if (tab.url == 'about:home') {
            tab.activate();
            tab.reload();
            return;
        }
    }

    tabs.open({url: 'about:home'});
}
