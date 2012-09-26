(function($, _) {
    'use strict';

    // Load templates
    var templates = {};
    $('[type="text/html"]').each(function() {
        var $e = $(this);
        templates[this.id] = _.template($e.html());
        $e.remove();
    });

    const service_hosts = {
        'production': 'https://snippets.mozilla.com',
        'staging': 'https://snippets.stage.mozilla.com',
        'local': 'http://localhost:8000'
    };

    const service_url_options = {
        'STARTPAGE_VERSION': 'Start Page Version',
        'NAME': 'Product Name',
        'VERSION': 'Product Version',
        'APPBUILDID': 'Application Build ID',
        'BUILD_TARGET': 'Build Target',
        'LOCALE': 'Product Locale',
        'CHANNEL': 'Product Release Channel',
        'OS_VERSION': 'Operating System Version',
        'DISTRIBUTION': 'Distribution',
        'DISTRIBUTION_VERSION': 'Distribution Version'
    };

    var $form = $('#switcher-options-form');
    var $input_list = $form.find('ul');

    $input_list.html(templates.option_list({
        servers: service_hosts,
        options: service_url_options
    }));
})(jQuery, _);
