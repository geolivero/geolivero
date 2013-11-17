define([
    'zepto',
    'underscore',
    'backbone',
    'views/contact',
    'views/home',
    'views/portfolio',
    'views/project',
    'model',
    'collections',
], function($, _, Backbone, Contact, Home, Portfolio, Project, PortModel, PortCollection) {
    var contact = null,
        home = null,
        portfolio = null,
        project = null,
        portCollection = null,
        router;

    router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'skills': 'skills',
            'iwant': 'iwant',
            'portfolio': 'portfolio',
            'project/:id': 'project',
            'contact': 'contact'
        },
        index: function() {
            home = new Home();
            home.open('firstSlide');
        },
        skills: function() {
            home = new Home();
            home.open('secondSlide');
        },
        iwant: function() {
            home = new Home();
            home.open('thirdSlide');
        },
        portfolio: function() {
            portCollection = new PortCollection();

            portfolio = new Portfolio({
                collection: portCollection
            });
        },
        project: function(id) {
            var model = null;
            if (portCollection) {
                model = portCollection.get(id);
            } else {
                portCollection = new PortCollection();

                portfolio = new Portfolio({
                    collection: portCollection
                }).onReady = function () {
                    model = portCollection.get(id);
                    project = new Project({
                        model: model
                    });
                };
            }
            if (model) {
                project = new Project({
                    model: model
                });
            }
        },
        contact: function() {
            contact = new Contact();
        }
    });

    return router;
});