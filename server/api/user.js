let dbHandel = require('../db/handel.js')
let app = require('../app/index.js')
const { promisify } = require('util')
const { getCountSync, getDataSync } = require('../promisify/index.js')
/**
 * 获取图片
 * 如果types存在， 就获取该类型图片
 * 如果types不存在， 就获取所有图片
 */
const get = async(req, res) => {
	const pics = dbHandel.getModel('user')
	const find = {}
	/**
	 	获取总数
	*/
	let count = await getCountSync(pics, find);
	console.log(count)
	/**
	 	获取指定数据
	*/
	let data = await getDataSync(pics, {
		limit: req.query.limit,
		page: req.query.page,
		order: { _id: -1 },
		find: find
	});
	/**
	 	发送回调
	*/
	res.send({
		status: 1,
		msg: '获取成功',
		data: {
			page: data.page, //当前页
			pageNum: Math.ceil(count / data.limit), //页码
			count: count, //总个数
			limit: data.limit, //每个页数
			data: data.data //数据
		}
	})
}
const delall = async(req, res) => {
	const user = dbHandel.getModel('user')
	user.remove({}, () => {
		res.send({
			status: 1,
			msg: '删除所有用户成功'
		});
	})
}
app.get('/api/user/get', get) //获取页面数据
app.get('/api/user/delall', delall) //获取页面数据
