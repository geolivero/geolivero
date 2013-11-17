var settings = require('./../settings.js'),
    db = require('./../models/models.js'),
    check = require('validator').check,
    sanitize = require('validator').sanitize,
    uploadPic = require('./../plugins/uploadPic'),
    fs = require('fs'),
    helpers = require('./../helpers/helpers.js'),
    cleanUpData,
    isLoggedIn;

/*
 * GET home page.
 */


cleanUpData = function(postData, fileData) {
    var pic_names;

    postData.title = sanitize(postData.title).xss();
    postData.body = sanitize(postData.body).xss();
    postData.color = sanitize(postData.color).xss();
    postData.order = sanitize(postData.order).toInt();
    if (fileData[0] !== undefined && fileData[0][0] !== null) {
        postData.pic_front = fileData[0][0];
    }
    if (fileData[1] !== null && fileData[1][0] !== null) {
        postData.pics = fileData[1];
    }
    

    return postData;
};


isLoggedIn = function(req, res) {
    if (req.session.isLoggedIn) {
        return true;
    } else {
        res.redirect('/login');
    }
}


exports.index = function(req, res) {

    if (isLoggedIn(req, res)) {
        db.Projects.find({}).sort({
            order: 1
        }).exec(function(err, projects) {
            if (err) {
                console.error(err);
            }
            res.render('admin-index', {
                title: 'Portfolio',
                error: err,
                projects: projects
            });
        });
    }
};


exports.loginPage = function(req, res) {
    if (req.session.isLoggedIn) {
        res.redirect('/admin');
    } else {
        res.render('admin-login', {
            title: 'Login'
        });
    }
};

exports.logout = function(req, res) {
    if (req.session.isLoggedIn) {
        req.session.isLoggedIn = null;
    }
    res.redirect('/login');
};


exports.login = function(req, res) {
    var b = req.body;

    if (b.username === settings.superuser.username && b.password === settings.superuser.password) {
        req.session.isLoggedIn = true;
        res.redirect('/admin');
    } else {
        res.render('admin-login', {
            title: 'Login Failed',
            message: true
        });
    }

};

exports.projects = {
    create: function(req, res) {
        if (isLoggedIn(req, res)) {
            res.render('admin-projects-create', {
                title: 'Create a project'
            });
        }
    },
    createProject: function(req, res) {
        var uploadPics = [];
        if (isLoggedIn(req, res)) {

            uploadPics = [
                function (callback) {
                    uploadPic.upload(req.files.pic_front, callback);
                },
                function (callback) {
                    uploadPic.upload(req.files.pics, callback);    
                }
            ];

            helpers.commitWaterfall(uploadPics, function (picData) {

                new db.Projects(cleanUpData(req.body, picData))
                .save(function(err, doc) {
                    if (err) {
                        console.error(err);
                    }
                    res.redirect('/admin');
                });

            });

        }
    },
    update: function(req, res) {
        if (isLoggedIn(req, res)) {
            db.Projects.findById(req.params.id, function(err, project) {
                if (err) {
                    console.error(err);
                }
                res.render('admin-projects-update', {
                    title: 'Update a project',
                    project: project
                });
            });
        }
    },

    updateProject: function(req, res) {
        if (isLoggedIn(req, res)) {
            
            uploadPics = [
                function (callback) {
                    uploadPic.upload(req.files.pic_front, callback);
                },
                function (callback) {
                    uploadPic.upload(req.files.pics, callback);    
                }
            ];

            helpers.commitWaterfall(uploadPics, function (picData) {

                db.Projects.update({
                    _id: req.body.id
                }, cleanUpData(req.body, picData), function(err) {
                    if (err) {
                        console.error(err);
                    }
                    res.redirect('/admin');
                });

            });
        }
    },
    destroy: function(req, res) {
        if (isLoggedIn(req, res)) {
            res.render('admin-projects-delete', {
                title: 'Delete project',
                id: req.params.id
            });
        }
    },
    destroyProject: function(req, res) {
        if (isLoggedIn(req, res)) {
            db.Projects.remove({
                _id: req.body.id
            }, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    res.redirect('/admin');
                    console.log(req.body.id, ' is removed');
                }
            });
        }
    },
}