/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js application for bluemix for testing services
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require("body-parser");
var watson = require('watson-developer-cloud');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var port = (process.env.VCAP_APP_PORT || 'test-port');
var host = (process.env.VCAP_APP_HOST || 'test-host');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
// body parser stuff toget the post request data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

if (process.env.VCAP_SERVICES) {
	var env = JSON.parse(process.env.VCAP_SERVICES);
//	var translateConfig = env.language_translation[0];
	console.log("env: " + env);
	var output = '';
	for (var property in env) {
  		output += property + ': ' + env[property]+'; ';
  		}
  		console.log('output: ' + output);
//	var credentials = env['language_translation'][0]['credentials'];
//	var urlTranslate = credentials['url'];
//	var usernameTranslate = credentials['username'];
//	var passwordTranslate = credentials['password']; 
	
	}

var language_translation = watson.language_translation({
		username: "15def373-6f17-4488-9faa-8352ebd4d59f",
		password: "Gzi66ZHDzAnP",
		version: 'v2'
});


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

app.post('/translate', function (req, res){
	console.log("req.body.dummy: " + req.body.dummy);
	var englishWords = req.body.dummy;
		//send a translation request to Watson, error check response and do something with it
	language_translation.translate({
		text: englishWords, source: 'en', target: 'es' },
		function(err, translation) {
			if(err) {
				console.log(err);
				res.send(err);
				res.end();
			} else {
				console.log(JSON.stringify(translation.translations, null, 2));
				console.log(translation.translations[0].translation);
				//send response back to the client
				res.send(JSON.stringify(translation.translations[0].translation));
				res.end();
			}
	});
});


app.get('/help',function(req, res){
  console.log("request test: " + req);
  console.log("request test: " + req.name);
  res.send("nothing");
  res.end();
});

app.get('*',function(req, res){
  res.redirect('/public');
});