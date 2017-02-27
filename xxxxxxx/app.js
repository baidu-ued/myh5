var express = require('express');
var app = express();
// var mongoose = require('mongoose');




// var db = mongoose.createConnection('mongodb://localhost/myh5_test');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!")
  // we're connected!

  app.get('/', function(req, res) {
  		// res.send('Hello World!');
  		res.sendFile(__dirname + '/index.html')
  	});
  	app.listen(3000);
});

//
// db.on('error', console.error.bind(console, '连接数据库失败'));
// db.once('open', function() {
// 	console.log('连接数据库成功');
//
// 	app.get('/', function(req, res) {
// 		// res.send('Hello World!');
// 		res.sendFile(__dirname + '/index.html')
// 	});
// 	app.listen(3000);
// });
