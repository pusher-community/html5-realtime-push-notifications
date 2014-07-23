var config;
try {
  config = require("./config");
} catch(e) {
  console.log("Failed to find local config, falling back to environment variables");
  config = {
    app_id: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET
  }
}

var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var escapeHTML = require("escape-html");

var app = express();
var root = __dirname + "/..";

// --------------------------------------------------------------------
// SET UP PUSHER
// --------------------------------------------------------------------
var Pusher = require("pusher");
var pusher = new Pusher({
  appId: config.app_id,
  key: config.key,
  secret: config.secret
});

// --------------------------------------------------------------------
// SET UP EXPRESS
// --------------------------------------------------------------------

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Simple logger
app.use(function(req, res, next){
  console.log("%s %s", req.method, req.url);
  console.log(req.body);
  next();
});

// Error handler
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

// Basic protection on _servers content
app.get("/nodejs/*", function(req, res) {
  res.send(404);
});

app.get("/php/*", function(req, res) {
  res.send(404);
});

app.get("/ruby-sinatra/*", function(req, res) {
  res.send(404);
});

// Message proxy
app.get("/notify", function(req, res) {
  var message = req.query.message;

  var body;
  var status;

  if (!message) {
    status = 400;
    body = "message must be provided";
    res.send(status, body);
  }

  message = sanitiseInput(message);

  pusher.trigger("my_notifications", "notification", {message: message});

  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.setHeader("Content-Type", "application/json");

  status = 200;
  res.send(status);
});

// Serve static files from directory
app.use(express.static(root));

// Open server on specified port
console.log("Starting Express server");
app.listen(process.env.PORT || 5001);

var sanitiseInput = function(input) {
  return escapeHTML(input).slice(0, 300);
};