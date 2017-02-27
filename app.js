var app = require('./build/dev-server.js');
var opn = require('opn')
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/test');
db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open', function() {
	console.log('连接数据库成功');
	var routers = require('./back/api/index.js');
	routers.forEach(function(Router) {

        app.use('/api', Router);

    })
		// 定义 about 页面的路由
	app.get('/edit/:act', function(req, res) {
	  res.send('About birds');
	});
	app.listen(8080, function(err) {
		if (err) {
			console.log(err)
			return
		}
		// opn('http://localhost:8080')
	})
});
module.exports.db = db;
