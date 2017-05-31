let dbHandel = require('../db/handel.js')
let app = require('../../build/dev-server.js')
let login = (req, res) => {
	let obj = req.query
	let user = dbHandel.getModel('user')
	user.find(obj, (err, docs) => {
		if (err) throw err;
		if (docs.length == 0) {
			res.send({
				status: 0,
				msg: '没有该账号'
			})
		} else {
			res.clearCookie('username');
			res.cookie('username', obj.username, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) });
			res.send({
				status: 1,
				msg: '获取成功',
				data: docs[0],
				href: '/edit'
			})
		}
	})
}
let signup = (req, res) => {
	let obj = req.query
	let user = dbHandel.getModel('user')
	new user({
		username: obj.username,
		password: obj.password
	}).save(() => {
		res.send({
			status: 1,
			msg: '保存成功'
		})
	});
}
app.get('/api/login/login', login); //获取页面数据
app.get('/api/login/signup', signup); //获取页面数据
