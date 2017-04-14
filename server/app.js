var app = require('../build/dev-server.js');
var opn = require('opn')
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var db = mongoose.createConnection('mongodb://localhost/test');
db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open', function() {
	console.log('连接数据库成功');
	var routers = require('./api/index.js');
	routers.forEach(function(Router, index) {
        app.use('/api', Router);
    })
	app.listen(8080, function(err) {
		if (err) {
			console.log(err)
			return
		}
		opn('http://localhost:8080')
		// opn('http://localhost:8080/edit/3')
	})
});
module.exports.db = db;
