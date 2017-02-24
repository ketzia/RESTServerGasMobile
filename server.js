var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var apiRoutes = require("./app/index");

var app = express();
var port = process.env.PORT || 8016;
apiRoutes(app);
app.listen(port);
console.log("Running at "+port);
exports = module.exports = app;