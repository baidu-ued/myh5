/**
 * 获取图片集合
 * @param collection
 * @param option {limit, page}
 * @return 成功返回 {limit, page, data}
 */
module.exports.getPicSync = (collection, option) => {
	let limit = Number(option.limit) || 18;
	let page = Number(option.page) || 1;
	return new Promise((resolve, reject) => {
		collection.find().limit(limit).skip(limit * (page - 1)).exec((err, data) => {
			if (err) {
				throw err;
			}
			resolve({
				limit: limit,
				page: page,
				data: data
			})
		})
	})
}
/**
 * 获取所有图片数
 * @param collection
 * @return 成功返回总数
 */
module.exports.getPicCountSync = (collection) => {
	return new Promise((resolve, reject) => {
		resolve(collection.count());
	})
}
/**
 * 删除指定图片
 * @param collection
 * @param delList 图片id数组或字符串，如['id001', 'id002']或'id001'
 * @return 成功返回1，失败返回0
 */
module.exports.delPicSync = (collection, delList) => {
	delList = typeof delList == 'string' ? delList.split() : delList
	return new Promise((resolve, reject) => {
		collection.remove({
			pic_id: {
				$in: delList
			}
		}, (err, msg) => {
			if(err){
				throw err
			}
			resolve(msg.result.n)
		})
	})
}
