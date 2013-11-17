$.fn.etalage = function () {
    var eta = {};
    
    eta.counter = 0;
    eta.views = {
        greateNavigation: function () {
            
        }
    }


    eta.init = function () {
        eta.el = $(this);
        eta.list = eta.el.find('li');
        eta.total = eta.list.length;

        console.log($(this));
    };

    return this.each(etalage.init);
};