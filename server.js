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

apiRoutes(app);
app.listen(port);
console.log("Running at "+port);
exports = module.exports = app;