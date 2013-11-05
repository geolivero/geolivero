define([
    'zepto'
], function($) {

    return {
        homeTemplate: {
            set: function() {

                this.html = $('#mainApp').html();
            },
            get: function() {
                console.log(this.html);
                return this.html;
            }
        }
    }
})