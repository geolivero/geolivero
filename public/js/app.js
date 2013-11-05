define([
    'zepto',
    'backbone',
    'routes',
    'helpers'
], function($, Backbone, Routes, Helpers) {

    var initApp;

    initApp = function() {        
        new Routes();

        Backbone.history.start({
            pushState: true
        });

        if (Backbone.history && Backbone.history._hasPushState) {

            $(document).delegate("a", "click", function(evt) {
                var href = $(this).attr("href"),
                    protocol = this.protocol + "//";

                if (href.slice(protocol.length) !== protocol) {
                    evt.preventDefault();
                    Backbone.history.navigate(href, true);
                }
            });
        }
    };

    return {
        init: function() {
            initApp();
        }
    }
});