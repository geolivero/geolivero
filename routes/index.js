
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Frontend developer and Multimedia designer : Gerald Olivero' });
};

exports.pages = function(req, res){
    req.params.id = req.params.id ? '/' + req.params.id : '';
    res.redirect('/#' + req.url.split('/')[1] + req.params.id);
};