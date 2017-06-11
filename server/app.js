var app = require('../build/dev-server.js');
var opn = require('opn')
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var db = mongoose.createConnection('mongodb://localhost/test');

// require('./api/login')
// require('./api/edit')
require('./api/list')

app.listen(8080, function(err) {
	if (err) {
		console.log(err)
		return
	}
	// opn('http://localhost:8080')
})
db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open', function() {
	console.log('连接数据库成功');

});
module.exports.db = db;
