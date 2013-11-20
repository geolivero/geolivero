define([
    'zepto',
    'underscore',
    'handlebars',
    'backbone',
    'text!template/contact.html'
    ], function ($, _, backbone, Handlebars, ContactHtml) {

    var contact;

    contact = Backbone.View.extend({
        el: '#mainApp',
        template: _.template(ContactHtml),
        initialize: function (){
            this.render();
        },
        closeView: function (callback) {
            var self = this;
            setTimeout(function () {
                self.$el.find('.innerContent').removeClass('show');    
            }, 100); 
            setTimeout(function () {
                self.$el.find('.phone').removeClass('show');
                callback();    
            }, 1000); 
        },
        render: function () {
            var self = this;
            this.$el.html(this.template);
            setTimeout(function () {
                self.$el.find('.innerContent').addClass('show');    
            }, 100); 
            setTimeout(function () {
                self.$el.find('.phone').addClass('show');    
            }, 1000); 
        },
        close: function () {
            this.$el.find('.innerContent').removeClass('show');     
        }
    });


    return contact;
});