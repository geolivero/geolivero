
/*

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"projects"
    }
}

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'projects');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
var mongourl = generate_mongo_url(mongo);*/


var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var projects = require('./routes/projects');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('uploadDir',  __dirname + '/uploads');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    uploadDir: __dirname + '/uploads',
    keepExtensions: true
}));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//------------------------------------------------------------
//-----------Public routes
//------------------------------------------------------------
app.get('/', routes.index);
app.get('/skills', routes.pages);
app.get('/iwant', routes.pages);
app.get('/contact', routes.pages);
app.get('/portfolio', routes.pages);
app.get('/project/:id', routes.pages);
app.get('/projects/list.json', projects.getList);
app.get('/projects/list/:type', projects.getListByType);

//------------------------------------------------------------
//-----------Routes of admin
//------------------------------------------------------------

app.get('/admin', admin.index);
app.get('/admin/projects/create', admin.projects.create);
app.get('/admin/projects/:id', admin.projects.update);
app.get('/admin/projects/:id/delete', admin.projects.destroy);
app.get('/login', admin.loginPage);
app.get('/admin/logout', admin.logout);

app.post('/login', admin.login);
app.post('/admin/projects/create', admin.projects.createProject);

app.put('/admin/project/update', admin.projects.updateProject);

app.delete('/admin/project/destroy', admin.projects.destroyProject);

//------------------------------------------------------------
//-----------Start listening to the port
//------------------------------------------------------------

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});