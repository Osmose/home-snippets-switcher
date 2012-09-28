(function(self, $, _) {
    'use strict';

    // Load templates
    var templates = {};
    $('[type="text/html"]').each(function() {
        var $e = $(this);
        templates[this.id] = _.template($e.html());
        $e.remove();
    });

    const service_hosts = {
        production: 'https://snippets.mozilla.com',
        staging: 'https://snippets.stage.mozilla.com',
        local: 'http://localhost:8000'
    };

    const service_url_options = {
        STARTPAGE_VERSION: {
            name: 'Start Page Version',
            default_value: '%STARTPAGE_VERSION%'
        },
        NAME: {
            name: 'Product Name',
            default_value: '%NAME%'
        },
        VERSION: {
            name: 'Product Version',
            default_value: '%VERSION%'
        },
        APPBUILDID: {
            name: 'Application Build ID',
            default_value: '%APPBUILDID%'
        },
        BUILD_TARGET: {
            name: 'Build Target',
            default_value: '%BUILD_TARGET%'
        },
        LOCALE: {
            name: 'Product Locale',
            default_value: '%LOCALE%'
        },
        CHANNEL: {
            name: 'Product Release Channel',
            default_value: '%CHANNEL%'
        },
        OS_VERSION: {
            name: 'Operating System Version',
            default_value: '%OS_VERSION%'
        },
        DISTRIBUTION: {
            name: 'Distribution',
            default_value: '%DISTRIBUTION%'
        },
        DISTRIBUTION_VERSION: {
            name: 'Distribution Version',
            default_value: '%DISTRIBUTION_VERSION%'
        }
    };

    var snippet_url_fields = [
        'STARTPAGE_VERSION',
        'NAME',
        'VERSION',
        'APPBUILDID',
        'BUILD_TARGET',
        'LOCALE',
        'CHANNEL',
        'OS_VERSION',
        'DISTRIBUTION',
        'DISTRIBUTION_VERSION'
    ];
    function buildSnippetUrl(values) {
        var url = values.SERVER + '/';
        _(snippet_url_fields).each(function(fieldName) {
            if (values[fieldName] !== '') {
                url += values[fieldName];
            } else {
                url += service_url_options[fieldName].default_value;
            }
            url += '/';
        });

        return url;
    }

    var $form = $('#switcher-options-form');
    var $input_list = $form.find('ul');

    $input_list.html(templates.option_list({
        servers: service_hosts,
        options: service_url_options
    }));

    $form.submit(function(e) {
        e.preventDefault();
        var values = _($form.serializeArray()).reduce(function(memo, field) {
            memo[field.name] = field.value;
            return memo;
        }, {});

        var url = buildSnippetUrl(values);
        self.port.emit('set_update_url', url);
    });
})(self, jQuery, _);
