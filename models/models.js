var mongoose = require('mongoose'),
    db,
    projects;

mongoose.connect('mongodb://localhost/projects');

db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback () {
    console.log('success', 'mongodb connected');
});

projects = mongoose.Schema({
    title: String,
    color: String,
    type: Array,
    body: String,
    pic_front: {
        name: String,
        width: Number, 
        height: Number
    },
    pics: Array,
    order: Number,
    url: String
});

exports.Projects = mongoose.model('projects', projects);