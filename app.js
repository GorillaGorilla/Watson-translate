/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js application for bluemix for testing services
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require("body-parser");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var port = (process.env.VCAP_APP_PORT || 'test-port');
var host = (process.env.VCAP_APP_HOST || 'test-host');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

//app.get('/:input', function(req, res){
//  var input = req.params.input;
//  console.log("get request arrived!");
//  console.log(input);
//  res.end();
//});

app.get('/help',function(req, res){
  console.log("request test:" + req.body.dummy);
  res.send(req.body.dummy);
  res.end();
});

app.get('*',function(req, res){
  res.redirect('/public');
});