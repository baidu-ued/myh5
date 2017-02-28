let dbHandel = require('../db/handel.js')
let xxx = require('../const/api.js')
let list = function(req, res) {
	let obj = req.query;
	let myh5 = dbHandel.getModel('myh5');
    myh5.find({}, function(err, docs) {
		res.send({
			status: xxx.SUC_STATUS,
			msg: '获取成功',
			data: {
				pageNum : Math.ceil(docs.length / obj.length),
				data : docs.splice((obj.page - 1) * obj.length, obj.length)
			}
		})
	});
};
module.exports = function(Router) {
	Router.get('/list/:act', function(req, res, next) {
		if (req.params.act == 'list') {
			list(req, res);
			return;
		}
	})
	return Router;
}
