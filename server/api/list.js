const dbHandel = require('../db/handel.js')
let app = require('../app/index.js')
const util = require('util')
const { getCountSync, getDataSync } = require('../promisify/index.js')
const get = (req, res) => {
	(async() => {
		const myh5 = dbHandel.getModel('myh5')
		const count = await getCountSync(myh5, {
			username: req.cookies.username
		})
		const data = await getDataSync(myh5, {
			limit: req.query.limit,
			page: req.query.page,
			find: {
				username: req.cookies.username
			}
		})
		res.send({
			status: 1,
			msg: '获取成功',
			data: {
				count: count,	//总数
				data: data.data,	//数据
				limit : data.limit,	//每页最大数量
				page : data.page,	//当前第几页
				pageNum: Math.ceil(count / data.limit)	//总共多少页
			}
		})
	})()
}
const add = (req, res) => {
	(async() => {
		const myh5 = dbHandel.getModel('myh5')
		const count = await getCountSync(myh5, {})
		new myh5({
			work_id: count + 1,
			data: {},
			username: req.cookies.username
		}).save((err, docs)=>{
			if(err) throw err
			res.send({
				msg: '创建成功'
			})
		})
	})()
}
app.get('/api/list/get', get)
app.get('/api/list/add', add)
