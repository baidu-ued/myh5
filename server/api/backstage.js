let dbHandel = require('../db/handel.js')
let app = require('../app/index.js')
const { promisify } = require('util')
var getDataSync = promisify((collection, cb) => {
	collection.findOne({}).exec((err, data) => {
		cb(null, data)
	})
})
const add = async(req, res) => {
	let query = req.query
	let collection = dbHandel.getModel('pic_admin')
	var data = await getDataSync(collection)
	if (!data) {
		await new Promise((resolve, reject) => {
			new collection({
				types: []
			}).save(() => {
				resolve()
			})
		})
	}
	data.types = data.types || []
	const xxx = data.types.some((item, index) => {
		if (item.name == query.name) {
			return true
		}
	})
	if (xxx) {
		res.send({
			status: 1,
			msg: '有了'
		})
	} else {
		data.types.push({
			name: query.name,
			id: parseInt(Math.random() * 999999)
		})
		collection.update({}, { types: data.types }, (err, docs) => {
			res.send({
				status: 1,
				msg: docs
			})
		})
	}
}
/**
 * 添加
 * @param id    图片类型id
 * @param name  新名字
 */
const add2 = (req, res) => {
	let query = req.query
	let collection = dbHandel.getModel('pic_admin')
	collection.remove({}, () => {
		new collection({
			types: [{
				id: 889890,
				name: '最热'
			}, {
				id: 890042,
				name: '爆笑职场'
			}, {
				id: 889891,
				name: '背景'
			}, {
				id: 889892,
				name: '图标'
			}, {
				id: 889893,
				name: '动画'
			}, {
				id: 889894,
				name: '线条'
			}, {
				id: 889895,
				name: '文字'
			}, {
				id: 889896,
				name: '边框'
			}, {
				id: 889898,
				name: '形状'
			}]
		}).save((err, docs) => {
			res.send({
				msg: '111'
			})
		})
	})
}
/**
 * 获取需要展示的类型
 * @param act  行为，(get 或 getall)
 */
const get = async(req, res) => {
	let query = req.query
	let collection = dbHandel.getModel('pic_admin')
	let { types = [] } = await getDataSync(collection)
	types = types.map((item) => {
		item.show = typeof item.show == 'undefined' ? 1 : item.show
		return item
	})
	/**
	 * 只列出需要展示的类型
	 */
	if (query.act == 'get') {
		types = types.filter((item) => {
			return item.show != 0
		})
	}
	res.send({
		status: 1,
		msg: '获取成功',
		data: types
	})
}
/**
 * 重命名
 * @param id    图片类型id
 * @param name  新名字
 */
const rname = async(req, res) => {
	let query = req.query
	let collection = dbHandel.getModel('pic_admin')
	let { types = [] } = await getDataSync(collection)
	types = types.map((item, index) => {
		item.name = item.id == req.query.id ? req.query.name : item.name.trim()
		return item
	})
	collection.update({}, { types: types }, (err, docs) => {
		if (err) throw err
		res.send({
			status: 1,
			msg: '成功'
		})
	})
}
/**
 * 保存
 * @param id    图片类型id
 * @param show  是否展示 0 or 1
 */
const setshow = async(req, res) => {
	let query = req.query
	let collection = dbHandel.getModel('pic_admin')
	let { types = [] } = await getDataSync(collection)
	types = types.map((item, index) => {
		if (item.id == query.id) {
			item.show = query.show
		}
		return item
	})
	collection.update({}, { types: types }, (err, docs) => {
		if (err) throw err
		res.send({
			status: 1,
			msg: '成功'
		})
	})
}
const type = (req, res) => {
	if (req.query.act == 'add') {
		add2(req, res)
	} else if (req.query.act == 'get' || req.query.act == 'getall') {
		get(req, res)
	} else if (req.query.act == 'rname') {
		rname(req, res)
	} else if (req.query.act == 'setshow') {
		setshow(req, res)
	}
}
app.get('/api/admin/pic/type', type) //获取页面数据
