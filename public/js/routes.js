define([
    'zepto',
    'underscore',
    'backbone',
    'views/contact',
    'views/home'
], function($, _, Backbone, Contact, Home) {
    var contact = null, 
        home = null,
        router;

    router = Backbone.Router.extend({
        routes: {
            '' : 'index',
            'skills' : 'skills',
            'iwant' : 'iwant',
            'contact' : 'contact'
        },
        index: function () {
            home = new Home();
            home.open('firstSlide');
        },
        skills: function () {
            home = new Home();
            home.open('secondSlide');
        },
        iwant: function () {
            home = new Home();
            home.open('thirdSlide');
        },
        contact: function () {
            contact = new Contact();
        }
    });

    return router;
});