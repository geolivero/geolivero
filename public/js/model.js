define([
    'underscore',
    'backbone',
    'settings'
    ], function (_, backbone, Settings) {

    var portfolio;

    portfolio = Backbone.Model.extend({
        idAttribute: "_id"
    });

    return portfolio;
});