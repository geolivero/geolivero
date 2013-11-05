var fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({
        imageMagick: true
    }),
    helpers = require('./../helpers/helpers.js'),
    settings = require('./../settings');

exports.upload = function(files, callback) {
    var uploadFile, multiFilesFuncs = [];

    if (typeof callback === 'undefined') {
        return;
    }

    uploadFile = function(file, ready) {
        var fullPath = settings.imgPath.projects + file.name;

        if (!file.path.length && typeof file.path !== 'undefined') {
            ready(null);
        }

        fs.rename(file.path, fullPath, function(err) {
            if (err) {
                console.error(err, ' :error on renaming file');
                ready(null);
                return;
            }

            imageMagick(fullPath).size(function(err, size) {

                if (err) {
                    console.error(err);
                    ready(null);
                } else {
                    ready({
                        name: file.name,
                        width: size.width,
                        height: size.height
                    });
                }

                
            });

            imageMagick(fullPath)
                .resize(100, 100)
                .write(settings.imgPath.projects + 'thumbs/' + file.name, function(err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Image is resized');
                    }

                });

            fs.unlink(file.path, function(err) {
                if (err) {
                    console.log(err, ' :error unlinking file');
                }
            });
        });

    }

    if (files instanceof Array) {

        files.each(function(file) {
            multiFilesFuncs.push(function (callback) {
                uploadFile(file, callback);
            });
        });

        new helpers.commitWaterfall(multiFilesFuncs, function (data) {
            callback(data);
        });
    } else {
        new helpers.commitWaterfall([
            function (callback) {
                uploadFile(files, callback);
            }
        ], function (data) {
            callback(data);
        });
        
    }
}

String.prototype.randomId = function() {
    var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return this + text + '_';
};


Array.prototype.each = function(callback) {
    var i = 0;

    while (i < this.length) {
        callback(this[i], i);
        i += 1;
    }
}