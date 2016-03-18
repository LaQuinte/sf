/*
* Space Farm
*/
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mustache = require('mustache-express');
//var io =  require('socket.io')(server);
//var moment = require('moment');

var port  = 8080;

// Mustache
app.engine("sth", mustache());
app.set("view engine", "sth");

// Express
app.use("/static", express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");

// Route
app.get("/", function(req, res){
    res.render("index", {
        title: "Space Farm"
    });
});

server.listen(port);
