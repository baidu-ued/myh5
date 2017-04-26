let dbHandel = require('../db/handel.js')
let get = function(req, res) {
	let obj = req.query
	res.send({
		status: 1,
		msg: '获取成功',
		data: {
			data: data,
			pageNum: Math.ceil(count / length)
		}
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
