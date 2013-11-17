define([
    'underscore',
    'backbone',
    'model',
    'settings'
], function(_, backbone, Model, Settings) {

    var portfolios;

    portfolios = Backbone.Collection.extend({
        model: Model,
        url: Settings.projectList,
        setType: function (type) {
            type = type || 'website';
            this.url = Settings.projectByName(type);
        }
    });

    return portfolios;
});