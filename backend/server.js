'use strict';

const express = require('express');

var utils = require('./utils');

var t = require('tcomb');

var cors = require('cors');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';
const PRIVATE_KEY = '876464b2bf363a5fa994c6980f4610e08d8ab478';
const PUBLIC_KEY = 'c6b8556a2d08e48a5c46a64c7cf3abeb';

// build the API with crypto
var api = require('./characters')({
	publicKey: PUBLIC_KEY
	, privateKey: PRIVATE_KEY
}, utils);


// App
const app = express();

var allowedOrigins = ['http://localhost:3000','http://localhost:4200','https://marvelsydneyfront.herokuapp.com'];

app.use(cors({
	origin: function(origin, callback){
	  // allow requests with no origin 
	  // (like mobile apps or curl requests)
	  if(!origin) return callback(null, true);
	  if(allowedOrigins.indexOf(origin) === -1){
		var msg = 'The CORS policy for this site does not ' +
				  'allow access from the specified Origin.';
		return callback(new Error(msg), false);
	  }
	  return callback(null, true);
	}
  }));



// hello to check server
app.get('/', (req, res) => {
	res.send('Hello world\n');
});

// route for characters
app.get('/characters', (req, res) => {

	// for pagination
	var offset = req.query.offset;
	var limit = req.query.limit || 25;

	api.findAll(limit, offset, function (err, results) {
		if (err) {
			res.send(err);
			console.log(err);
		}
		res.send(results);
	});
});


var readAPI = function (url, port, path, method) {

	var options = {
		host: url,
		port: port,
		path: path,
		method: 'POST'
	};

	http.request(options, function (res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	}).end();
}

app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);