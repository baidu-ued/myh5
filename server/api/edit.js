let dbHandel = require('../db/handel.js')
let app = require('../../build/dev-server.js')
let get = (req, res) => {
	let obj = req.query
	let myh5 = dbHandel.getModel('myh5');
	myh5.find({ work_id: obj.work_id }, (err, docs) => {
		if (!err) {
			res.send({
				status: 1,
				msg: '获取成功',
				data: docs[0]
			})
		}
	});
}
let save = (req, res) => {
	let obj = req.query
	let myh5 = dbHandel.getModel('myh5');
	myh5.update({ work_id: obj.work_id }, { data: JSON.parse(obj.data) }, (err, docs) => {
		if (!err) {
			res.send({
				status: 1,
				msg: '保存成功',
			})
		}
	});
}
/*
	编辑页所有接口
*/
app.get('/api/edit/get', get); //获取页面数据
app.get('/api/edit/save', save); //保存数据
require('./edit/pic.js')	//图片接口
require('./edit/qrcode.js')	//二维码接口
require('./edit/music.js')	//图片接口
