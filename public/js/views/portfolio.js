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
        render: function() {
            var self = this;
            if (self.$el.find('ul.lists').length) {
                return;
            }
            this.$el.html(this.template());

            this.collection.each(function(Model) {
                self.$el.find('ul.lists').append(new project({
                    model: Model.toJSON()
                }).render().el);
            });
            this.showList();
            this.onReady();
            return this;
        },
        close: function() {
            this.$el.find('.innerContent').removeClass('show');
        }
    });


    return portfolio;
});