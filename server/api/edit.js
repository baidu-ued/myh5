let dbHandel = require('../db/handel.js')
var multiparty = require('multiparty');
//获取数据
let get = function(req, res) {
	let obj = req.query
	let myh5 = dbHandel.getModel('myh5');
	myh5.find({ work_id: 1 }, function(err, docs) {
		if (!err) {
			res.send({
				status: 1,
				msg: '获取成功',
				data: docs[0]
			})
		}
	});
}
//保存数据
let save = function(req, res) {
	let obj = req.query
	console.log(obj);
	let myh5 = dbHandel.getModel('myh5');
	myh5.update({ work_id: 1 }, { data: obj }, function(err, docs) {
		if (!err) {
			res.send({
				status: 1,
				msg: '保存成功',
			})
		}
	});
}
//保存数据
let pic = function(req, res) {
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files){
		if(err) throw err;
		console.log(files);
		res.send({
			status: 1,
			msg: '保存成功',
		})
	})
}
module.exports = function(Router) {
	Router.get('/edit/:act', function(req, res, next) {
		if (req.params.act == 'get') {
			get(req, res)
			return;
		} else if (req.params.act == 'save') {
			save(req, res)
			return;
		}
	})
	Router.post('/edit/:act', function(req, res, next) {
		if (req.params.act == 'pic') {
			pic(req, res)
			return;
		}
	})
	return Router
}
