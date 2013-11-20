define([
    'zepto',
    'underscore',
    'handlebars',
    'backbone',
    'text!template/portfolio.html',
    'text!template/list.html',
    'plugins',
    'settings'
], function($, _, backbone, Handlebars, PortfolioHtml, ProjectListHtml, Plugins, Settings) {

    var portfolio, project;

    project = Backbone.View.extend({
        tagName: 'li',
        hover: function (e) {
            Settings.snds.hover.play();
            e.preventDefault();
        },
        template: _.template(ProjectListHtml),
        render: function() {
            this.$el.html(this.template({
                model: this.model,
                imgPath: Settings.getProjectImagePath
            }));
            return this;
        }
    });

    portfolio = Backbone.View.extend({
        el: '#mainApp',
        template: _.template(PortfolioHtml),
        onReady: function () {},
        loader: function (images, callback, completed) {
            var i = 0, tracer, self = this;

            tracer = function () {
                if (images) {
                    if (i === images.length) {
                        completed();
                    }
                    $('body').append('<img class="fakeImg" style="display: none;" src="' + images[i] + '" />');
                    $('img.fakeImg').on('load', function () {
                        $('img.fakeImg').remove();
                        callback(i, images.length);
                        tracer();
                    });
                }
                i += 1;
            };
            tracer();
        },
        initialize: function() {
            var self = this;
            if (this.collection.toJSON().length) {
                this.render();
            } else {
                this.collection.fetch({
                    success: function() {
                        self.render();
                    },
                    error: function() {
                        console.log('Could not get the results');
                    }
                });
            }

        },
        hideList: function (callback) {
            var lists = this.$el.find('ul.lists li'),
                i = lists.length - 1,
                decrementer,
                starter, timer;

            decrementer = function() {
                timer = setTimeout(starter, 200);
            };
            starter = function() {
                if (i > -1) {
                    lists.eq(i).removeClass('show');
                    decrementer();
                    if (i === 0) {
                        setTimeout(callback, 300);
                    }
                }
                i -= 1;
            };
            starter();
        },
        closeView: function (callback) {
            this.hideList(callback);
        },
        showList: function() {
            var i = 0,
                incrementer,
                starter, timer,
                lists = this.$el.find('ul.lists li');

            incrementer = function() {
                timer = setTimeout(starter, 300);
            };
            starter = function() {
                if (i < lists.length) {
                    lists.eq(i).addClass('show');
                    incrementer();
                }
                i += 1;
            };
            incrementer();
        },
        progress: function (progress, total) {
            var procent = Math.round(progress / total * 100);
            this.$el.find('.loader')
            .css({ width: procent + '%'})
            .find('span').text(procent + '%');
        },
        render: function() {
            var self = this, images = [];
            if (self.$el.find('ul.lists').length) {
                return;
            }
            this.$el.html(this.template());
            this.$el.append('<div class="loader"><span>0</span></div>');

            this.collection.each(function(Model) {
                var model = Model.toJSON();
                images.push(Settings.getProjectImagePath(model.frontPic.name));
                model.pics.each(function (pic) {
                   images.push(Settings.getProjectImagePath(pic.name)); 
                });
                self.$el.find('ul.lists').append(new project({
                    model: model
                }).render().el);

            });

            this.loader(images, function (progress, total) {
                self.progress(progress, total);
            }, function () {
                setTimeout(function () {
                    self.$el.find('.loader').addClass('remove');
                }, 500);
                self.showList();
                self.onReady();
            });

            
            return this;
        },
        close: function() {
            this.$el.find('.innerContent').removeClass('show');
        }
    });


    return portfolio;
});

Array.prototype.each = function (callback) {
    var i = 0;
    while (i < this.length) {
        callback(this[i], i);
        i += 1;
    }
}