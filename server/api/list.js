let dbHandel = require('../db/handel.js')
let get = function(req, res) {
	let obj = req.query
	let myh5 = dbHandel.getModel('myh5')
    myh5.find({}, function(err, docs) {
		console.log(docs);
		res.send({
			status: 1,
			msg: '获取成功',
			data: {
				pageNum : Math.ceil(docs.length / obj.length),
				data : docs.splice((obj.page - 1) * obj.length, obj.length)
			}
		})
	})
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
