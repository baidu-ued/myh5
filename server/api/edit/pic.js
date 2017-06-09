let multiparty = require('multiparty');
let exec = require('child_process').exec;
let cwd = process.cwd();
let path = require('path');
let sizeOf = require('image-size');
let dbHandel = require('../../db/handel.js')
let util = require('../../util/index.js')
let app = require('../../../build/dev-server.js')
let fs = require('fs')
let { getPicSync, getPicCountSync, delPicSync } = require('../../db/edit/pic.js')
let http = require('http')
let get = (req, res) => {
	let pics = dbHandel.getModel('pics');
	(async() => {
		let find = {};
		if(req.query.type){
			find.type = req.query.type;
		}
		console.log(req.query)

		let count = await getPicCountSync(pics);
		let data = await getPicSync(pics, {
			limit: req.query.limit,
			page: req.query.page,
			find: find
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
		if (!files['picture']) {
			res.send({
				status: 1,
				msg: '不成功'
			})
			return;
		}
		files['picture'].forEach((item) => {
			exec('cp ' + item.path + ' ' + path.resolve(cwd, 'server/dbimg/'));
			let pic_id = util.md5('pic');
			data.push({
				src: 'http://localhost:8080/dbimg/' + path.basename(item.path),
				pic_id: pic_id
			});
			let dimensions = sizeOf(item.path);
			new pics({
				username: req.cookies.username,
				pic_id: pic_id,
				src: 'http://localhost:8080/dbimg/' + path.basename(item.path),
				width: dimensions.width,
				height: dimensions.height
			}).save(() => {
				res.send({
					status: 1,
					msg: '保存成功',
					data: data
				})
			});
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
let change = (req, res) => {
	let pics = dbHandel.getModel('pics');
	(async() => {
		pics.update({ pic_id : req.query.pic_id }, { type : req.query.type }, ()=>{
			res.send({
				msg : '替换成功'
			})
		})
	})()
}


let setadmin = (req, res) => {
	let pics = dbHandel.getModel('admin');
	(async() => {
		pics.find((err, docs)=>{
			if(err) throw err
			let pic_type = docs[0].pic_type;
			let id = ++pic_type[pic_type.length - 1].id;
			pic_type.push({
				name : req.query.type,
				id : id
			})
			pics.update({}, { pic_type : pic_type}, (err, docs)=>{
				if(err) throw error
				console.log(docs)
			})
		})
		// new pics({
		// 	pic_type : [{
		// 		name : '背景',
		// 		id : '1001'
		// 	}]
		// }).save((err, docs)=>{
		// 	console.log(err)
		// 	console.log(docs)
		// });
		res.send({
			msg : '成功'
		})
	})()
}
let getadmin = (req, res) => {
	let pics = dbHandel.getModel('admin');
	(async() => {
		pics.find((err, docs)=>{
			if(err) throw err
			res.send({
				data : docs[0]
			})
		})
	})()
}
app.get('/aj/pic/change', change); //删除图片
app.get('/aj/pic/get', get); //获取图片
app.get('/aj/pic/del', del); //删除图片
app.get('/aj/pic/setadmin', setadmin); //删除图片
app.get('/aj/pic/getadmin', getadmin); //删除图片
app.post('/aj/pic/save', save); //保存图片
