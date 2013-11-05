define([
    'zepto',
    'underscore',
    'backbone',
    'geo',
    'text!template/index.html'
    ], function ($, _,backbone, Geo, IndexHtml) {

    var home;

    home = Backbone.View.extend({
        el: '#mainApp',
        initialize: function () {
            this.render();
        },
        template: _.template(IndexHtml),
        open: function (clName) {
            var self = this;
            this.$el.find('.slide').removeClass('show'); 
            setTimeout(function () {
                self.$el.find('.' + clName).addClass('show');
            }, 500);
        },
        render: function () {
            if (!this.$el.find('.slide').length) {
                this.$el.html(this.template);
            }
        },
        close: function () {
            this.$el.html('');
            this.unbindAll();
        }
    });


    return home;
});