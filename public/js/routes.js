define([
    'zepto',
    'underscore',
    'backbone',
    'views/contact',
    'views/home',
    'views/portfolio',
    'views/project',
    'model',
    'settings',
    'collections',
], function($, _, Backbone, Contact, Home, Portfolio, Project, PortModel, Settings, PortCollection) {
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
        closeViews: function (callback) {
            if (portfolio !== null) {
                portfolio.closeView(callback);
                if(project !== null) {
                    project.closeView();
                    project = null;
                }
                portfolio = null;
            } else if(home !== null) {
                home.closeView(callback);
                home = null;
            } else if(contact !== null) {
                contact.closeView(callback);
                contact = null;
            } else {
                callback();
            }
        },
        index: function() {
            this.closeViews(function () {
                home = new Home();
                home.open('firstSlide');
            });
            Settings.snds.click.play();
        },
        skills: function() {
            home = new Home();
            home.open('secondSlide');
            Settings.snds.click.play();
        },
        iwant: function() {
            home = new Home();
            home.open('thirdSlide');
            Settings.snds.click.play();
        },
        portfolio: function() {
            this.closeViews(function () {
                portCollection = new PortCollection();

                portfolio = new Portfolio({
                    collection: portCollection
                });
            });
            Settings.snds.click.play();
        },
        project: function(id) {
            var model = null, clearProject;

            clearProject = function  () {
                if (project !== null && typeof project.close !== 'undefined') {
                    project.close();
                }
            };


            if (portCollection) {
                model = portCollection.get(id);
            } else {
                portCollection = new PortCollection();

                portfolio = new Portfolio({
                    collection: portCollection
                });
                portfolio.onReady = function () {
                    model = portCollection.get(id);
                    clearProject();
                    project = new Project({
                        model: model
                    });
                };
            }
            if (model) {
                clearProject();
                project = new Project({
                    model: model
                });
            }
            Settings.snds.click.play();
        },
        contact: function() {
            this.closeViews(function () {
                contact = new Contact();
            });
            Settings.snds.click.play();
        }
    });

    return router;
});