require('../build/dev-server.js')
const opn = require('opn')
const db = require('./db/index.js')
const app = require('./app/index.js')
require('./api/login')
require('./api/edit')
require('./api/list')
require('./api/backstage')
require('./api/user')
db.on('error', console.error.bind(console, '连接数据库失败'))
db.once('open', function() {
	console.log('连接数据库成功')
	app.listen(8080, function(err) {
		if (err) {
			console.log(err)
			return
		}
	})
})
