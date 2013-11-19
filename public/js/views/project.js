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
        events: {
            'click .shifLeft' : 'showProjects'
        },
        initialize: function () {
            this.render();
        },
        preventClick: function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.showProjects();
        },
        showProjects: function (e) {
            e.stopPropagation();
            e.preventDefault();

            if (this.$el.find('.project').hasClass('show')) {
                this.$el.find('.project').removeClass('show');
            } else {
                this.$el.find('.project').addClass('show');
            }
        },
        render: function () {
            var html = this.template({ model: this.model.toJSON(), 
                imgPath: Settings.getProjectImagePath }),
                self = this;
            
            this.$el.append(html);
            this.$el.find('ul.projects').etalage();
            setTimeout(function () {
                self.$el.find('.project').addClass('show');
            }, 300);
            //console.log(html);
            return this;
        },
        close: function () {
            this.$el.find('ul.projects').remove();
            this.$el.off('click', '.shifLeft');
        }
    });

    return project;
});