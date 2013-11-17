define([
    'zepto',
    'underscore',
    'handlebars',
    'backbone',
    'text!template/project.html',
    'settings'
], function($, _, backbone, Handlebars, ProjectHtml, Settings) {

    var project;

    project = Backbone.View.extend({
        el: '#portfolio',
        template: _.template(ProjectHtml),
        initialize: function () {
            this.render();
        },
        render: function () {
            var html = this.template({ model: this.model.toJSON(), imgPath: Settings.getProjectImagePath });
            this.$el.append(html);
            //console.log(html);
        }
    });

    return project;
});