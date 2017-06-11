const { promisify } = require('util')
/**
 * 获取总数
 * @param collection
 * @param option
 * @param cb
 * @return 成功返回总数
 */
module.exports.getCountSync = promisify((collection, option = {}, cb) => {
	return cb(null, collection.count(option))
});
/**
 * 获取数据
 * @param collection
 * @param option { limit, page, find, order }
 * @param cb
 * @return 成功返回数据
 */
module.exports.getDataSync = promisify((collection, option = {}, cb) => {
	const limit = Number(option.limit) || 18
	const page = Number(option.page) || 1
	const find = option.find || {}
	const order = option.order || -1
	collection.find(find).skip((page - 1) * limit).limit(limit).exec((err, data) => {
		cb(null, {
			limit: limit,
			page: page,
			order: order,
			data: data
		})
	})
});
