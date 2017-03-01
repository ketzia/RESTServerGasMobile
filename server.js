var express         = require("express");
var mongoose        = require("mongoose");
var session         = require("express-session");
var apiRoutes       = require("./app/index");
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var db = require('./app/config/db');
var port = process.env.PORT || 8016;

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(db.url);

// Configure app to parse json requests and handle DELETE/PUT requests
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT


// Esto sirve para separar requests de otros servidores
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

apiRoutes(app);
app.listen(port);
console.log("Running at "+port);
exports = module.exports = app;