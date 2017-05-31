let multiparty = require('multiparty');
let exec = require('child_process').exec;
let cwd = process.cwd();
let path = require('path');
let dbHandel = require('../../db/handel.js')
let util = require('../../util/index.js')
let app = require('../../../build/dev-server.js')
let { getPicSync, getPicCountSync, delPicSync } = require('../../db/edit/pic.js')
let get = (req, res) => {
	let pics = dbHandel.getModel('pics');
	(async() => {
		let count = await getPicCountSync(pics);
		let data = await getPicSync(pics, {
			limit: req.query.limit,
			page: req.query.page
		});
		res.send({
			status: 1,
			msg: '获取成功',
			data: {
				page: data.page,
				pageNum: Math.ceil(count / data.limit),
				count: count,
				limit: data.limit,
				data: data.data
			}
		})
	})()
}
let save = (req, res) => {
	let form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err) throw err;
		let pics = dbHandel.getModel('pics');
		let data = [];
		files['sina_img'].forEach((item) => {
			exec('cp ' + item.path + ' ' + path.resolve(cwd, 'server/dbimg/'));
			data.push({
				src: 'http://localhost:8080/dbimg/' + path.basename(item.path)
			});
			new pics({
				username: req.cookies.username,
				pic_id: util.md5('pic'),
				src: 'http://localhost:8080/dbimg/' + path.basename(item.path)
			}).save();
		})
		res.send({
			status: 1,
			msg: '保存成功',
			data: data
		})
	})
}
let del = (req, res) => {
	let pics = dbHandel.getModel('pics');
	(async() => {
		let status = await delPicSync(pics, req.query.pic_id);
		res.send({
			status: 1,
			msg: status ? '删除成功' : '删除失败'
		})
	})()
}
app.get('/aj/pic/get', get); //获取图片
app.get('/aj/pic/del', del); //删除图片
app.post('/aj/pic/save', save); //保存图片
