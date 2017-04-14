let dbHandel = require('../db/handel.js')
let get = function(req, res) {
	let obj = req.query
	let myh5 = dbHandel.getModel('myh5')
	let type = String(obj.type) || 'news'
	let length = Number(obj.length) || 10
	let page = Number((obj.page - 1) * length)


	var readFile1 = function() {
		return new Promise(function(resolve, reject) {
			myh5.count({
				type : type
			}, function(err, docs){
				resolve(docs)
			})
		});
	};
	var readFile2 = function() {
		return new Promise(function(resolve, reject) {
			myh5.where({
				type: type
			}).skip(page).limit(length).exec(function(err, docs) {
				resolve(docs)
			})
		});
	};
	var asyncReadFile = async function() {
		var count = await readFile1();
		var data = await readFile2();
		res.send({
			status: 1,
			msg: '获取成功',
			data: {
				data: data,
				pageNum : Math.ceil(count / 10)
			}
		})
	};
	asyncReadFile()
}
module.exports = function(Router) {
	Router.get('/list/:act', function(req, res, next) {
		if (req.params.act == 'get') {
			get(req, res)
			return;
		}
	})
	return Router
}
