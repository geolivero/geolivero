$.fn.etalage = function (options) {
    var eta = {}, settings;
    
    settings = $.extend({
        time: 5,
        navigation: true,
        arrows: true
    }, options );

    eta.counter = 0;
    eta.oldCounter = 0;

    eta.views = {
        createNavigation: function () {
            var lists = [];

            eta.list.each(function (i) {
                var cl = i === 0 ? 'current' : '';
                lists.push('<li class="' + cl + '">'+ (i + 1) + '</li>');
            });

            eta.parentEl.append([
                '<div class="eta_navigation">',
                    '<ol>',
                    lists.join(''),
                    '</ol>',
                '</div>'
            ].join(''));
        },
        createArrows: function () {
            eta.parentEl.append([
                '<span class="left arrow eta_nav"><</span>',
                '<span class="right arrow eta_nav">></span>'
            ].join(''));
            eta.parentEl.find('.left.arrow').hide();

        }
    };

    eta.slideTo = function () {
        this.parentEl.find('.eta_navigation ol li').removeClass('current');
        this.parentEl.find('.eta_navigation ol li').eq(eta.counter).addClass('current');
        eta.list.eq(eta.oldCounter).removeClass('show');
        eta.list.eq(eta.counter).addClass('show');
        eta.oldCounter = eta.counter;
    };

    eta.controllers = function () {
        this.parentEl.find('.eta_nav').click(function () {
            this.parentEl.find('.eta_nav').show();

            if ($(this).hasClass('left')) {
                eta.counter -= 1;
                if (eta.counter < 2 ) {
                    $(this).hide();
                }
            } else {
                eta.counter += 1;
                if (eta.counter > eta.total - 2) {
                    $(this).hide();
                }
            }
            eta.slideTo();
        });

        this.parentEl.find('.eta_navigation li').click(function () {
            eta.counter = $(this).index();
            eta.slideTo();
        });
    };


    eta.init = function () {
        eta.el = $(this);
        eta.list = eta.el.find('li');
        eta.total = eta.list.length;
        eta.parentEl = $(this).parent();

        if (settings.navigation) {
            eta.views.createNavigation();
        }
        if (settings.arrows) {
            eta.views.createArrows();
        }

        eta.controllers();
    };
    


    return this.each(eta.init);
};