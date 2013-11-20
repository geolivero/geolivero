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
        timer: null,
        template: _.template(IndexHtml),
        open: function (clName) {
            var self = this;
            this.$el.find('.slide').removeClass('show'); 
            setTimeout(function () {
                self.$el.find('.' + clName).addClass('show');
                self.$el.find('.tool.slides').addClass('show');
            }, 500);
            
        },
        closeView: function (callback) {
            this.$el.find('.slide').removeClass('show'); 
            this.$el.find('.tool.slides').removeClass('show');
            this.timer = setTimeout(callback, 1000);
        },  
        render: function () {
            if (!this.$el.find('.slide').length) {
                this.$el.html(this.template);
            }
        }
    });


    return home;
});