define([
    'zepto',
    'backbone',
    'routes',
    'helpers'
], function($, Backbone, Routes, Helpers) {

    var initApp, manageAudio;

    manageAudio = function () {
        var bg = document.getElementById('snd_bg_' + (Math.ceil(Math.random() * 2
            ))),
            body = $('body.webApp');
        bg.play();
        body.addClass('sndOn');

        $('footer a.sound').click(function (e) {
            if ($(this).text().indexOf('Sound off') > -1) {
                bg.pause();
                body.removeClass('sndOn');
                $(this).text('Sound on');
            } else {
                bg.play();
                body.addClass('sndOn');
                $(this).text('Sound off');
            }
            e.preventDefault();
        });
    };

    initApp = function() {      
        new Routes();

        Backbone.history.start({
            pushState: true
        });

        manageAudio();

        if (Backbone.history && Backbone.history._hasPushState) {

            $(document).delegate("a", "click", function(evt) {
                var href = $(this).attr("href"),
                    protocol = this.protocol + "//";

                if (href.indexOf('http://') < 0 && 
                    href.indexOf('https://') < 0 &&
                    href.indexOf('#sound') < 0 &&
                    href.indexOf('mailto:')) {
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