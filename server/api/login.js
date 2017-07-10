let dbHandel = require('../db/handel.js')
let app = require('../app/index.js')
const { getCountSync, getDataSync } = require('../promisify/index.js')
let login = (req, res) => {
	let obj = req.query
	let user = dbHandel.getModel('user')
	user.find(obj, (err, docs) => {
		if (err) throw err
		if (docs.length == 0) {
			res.send({
				status: 0,
				msg: '没有该账号'
			})
		} else {
			res.clearCookie('username')
			req.session.isLogin = true
			res.cookie('username', obj.username, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) })
			res.send({
				status: 1,
				msg: '获取成功',
				data: docs[0],
				href: '/list'
			})
		}
	})
}
/**
 * 注册，  判断用户名是否唯一
 */
let signup = async(req, res) => {
	let query = req.query
	let user = dbHandel.getModel('user')
	var data = await getDataSync(user, {
		find : {
			username : query.username
		}
	})
	if(data.data.length != 0){
		res.send({
			status: 1,
			msg: '用户名冲突， 请更换用户名'
		})
		return;
	}
	let count = await getCountSync(user, {});
	new user({
		username: query.username,
		password: query.password,
		createTime : new Date(),
		uid : 10000000000 + count,
		admin : 0
	}).save(() => {
		res.send({
			status: 1,
			msg: '保存成功'
		})
	})
}
let signout = (req, res) =>{
	req.session.isLogin = false
	res.clearCookie('username')
	res.send({
		msg : '退出成功'
	})
}
app.get('/api/login/login', login) //获取页面数据
app.get('/api/login/signup', signup) //获取页面数据
app.get('/api/login/signout', signout) //获取页面数据
