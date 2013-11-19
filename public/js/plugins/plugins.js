define([
    'zepto',
    'hammerjs',
    'jqhammerjs'
], function() {


$.fn.slideFolded = function (options) {
    settings = $.extend({
        clName: ''
    }, options );

    this.each(function () {
        var el = $(this), paperHtml = '';

        el.wrap('<div class="slideFolded"></div>');

        paperHtml = el.closest('.slideFolded').html();
        el.append(paperHtml);
        el.find(settings.clName).append(paperHtml);
        el.find(settings.clName + ' ' + settings.clName + ' ' + settings.clName).append(paperHtml);
        el.closest('.slideFolded').find(settings.clName).each(function (i) {
            $(this).addClass('fold_' + (i + 1));
        });
        //el.append(el);
    });
};

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
        var arrows = function () {
            eta.parentEl.find('.eta_nav').show();
            if (eta.counter < 1 ) {
                eta.parentEl.find('.eta_nav.left').hide();
            } 
            if (eta.counter > eta.total - 2) {
                eta.parentEl.find('.eta_nav.right').hide();
            }
        };

        eta.parentEl.find('.eta_nav').click(function () {
            if ($(this).hasClass('left')) {
                eta.counter -= 1;
            } else {
                eta.counter += 1;
            }
            arrows();
            eta.slideTo();
        });

        $(document).keyup(function (e) {
            if (e.keyCode === 37) {
                eta.counter = eta.counter < 1 ? eta.total - 1 : eta.counter - 1;
            }
            if (e.keyCode === 39) {
                eta.counter = eta.counter > eta.total - 2 ? 0 : eta.counter + 1;
            }
            arrows();
            eta.slideTo();
        });

        eta.el.hammer().on('swiperight', function () {
            eta.counter = eta.counter < 1 ? eta.total - 1 : eta.counter - 1;
            arrows();
            eta.slideTo();
        });
        eta.el.hammer().on('swipeleft', function () {
            eta.counter = eta.counter > eta.total - 2 ? 0 : eta.counter + 1;
            arrows();
            eta.slideTo();
        });

        eta.parentEl.find('.eta_navigation li').click(function () {
            eta.counter = $(this).index();
            arrows();
            eta.slideTo();
        });
    };


    eta.init = function () {
        eta.el = $(this);
        eta.list = eta.el.find('li');
        eta.total = eta.list.length;
        eta.parentEl = $(this).parent();

        eta.list.eq(0).addClass('show');

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

});