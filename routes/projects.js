var settings = require('./../settings.js'),
    db = require('./../models/models.js'),
    fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({
        imageMagick: true
    }),
    rewriteData, getResImg, loadImages,
    helpers = require('./../helpers/helpers.js');


rewriteData = function(projects, callback) {
    var newProjects = [],
        getNewPics, i = 0;

    helpers.each(projects, function(pr, i) {

        newProjects.push({
            _id: pr._id,
            color: pr.color,
            type: pr.type,
            title: pr.title,
            body: pr.body,
            frontPic: pr.pic_front,
            url: pr.url,
            pics: pr.pics
        });

        if (i === projects.length - 1) {
            callback(newProjects);
        }

    });

};


exports.getList = function(req, res) {
    db.Projects.find({}).sort({
        order: 1
    }).exec(function(err, projects) {
        if (err) {
            console.error(err);
        }
        rewriteData(projects, function(newProj) {
            res.json(newProj);
        });

    });
};

exports.getListByType = function(req, res) {
    db.Projects.find({
        type: req.params.type
    }).sort({
        order: 1
    }).exec(function(err, projects) {
        if (err) {
            console.error(err);
        }
        rewriteData(projects, function(newProj) {
            res.json(newProj);
        });
    });
};