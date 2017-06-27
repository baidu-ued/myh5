const { promisify } = require('util')
/**
 * 保存
 * @param collection
 * @param option
 * @param cb
 * @return 成功返回总数
 */
module.exports.saveCollectionSync = promisify((collection, option = {}, cb) => {
	new collection(option).save((err, docs) => {
		console.log(err);
		console.log(docs)
		cb(null)
	})
});
/**
 * 获取总数
 * @param collection
 * @param option
 * @param cb
 * @return 成功返回总数
 */
module.exports.getCountSync = promisify((collection, option = {}, cb) => {
	cb(null, collection.count(option))
});
/**
 * 获取数据
 * @param collection
 * @param option { limit, page, find, order }
 * @param cb
 * @return 成功返回数据
 */
module.exports.getDataSync = promisify((collection, option = {}, cb) => {
	const limit = Number(option.limit) || 15
	const page = Number(option.page) || 1
	const find = option.find || {}
	const order = option.order || {}
	collection.find(find).skip((page - 1) * limit).limit(limit).sort(order).exec((err, data) => {
		cb(null, {
			limit: limit,
			page: page,
			order: order,
			data: data
		})
	})
});
/**
 * 删除指定图片
 * @param collection
 * @param delList 图片id数组或字符串，如['id001', 'id002']或'id001'
 * @return 成功返回1，失败返回0
 */
module.exports.delDataSync = promisify((collection, option = {}, cb) => {
	const find = option.find || {}
	collection.remove(find, (err, msg) => {
		if (err) {
			throw err
		}
		cb(null, msg.result.n)
	})
});
