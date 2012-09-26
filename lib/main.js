const panel = require('panel');
const widget = require('widget');

const data = require('self').data;

var snippet_panel = panel.Panel({
    width: 300,
    height:700,
    contentURL: data.url('options.html'),
    contentScriptFile: [data.url('jquery-1.8.2.min.js'),
                        data.url('underscore-min.js'),
                        data.url('options.js')]
});

widget.Widget({
    id: 'snippet-button',
    label: 'about:home Snippet Switcher',
    content: 'SNIPPETS!',
    panel: snippet_panel
});
