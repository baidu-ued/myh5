/**
 * 获取图片集合
 * @param collection
 * @param option
 * @return 成功返回数据集合，失败返回-1
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

/*
	获取所有图片数
*/
module.exports.getPicCountSync = (collection) => {
	return new Promise((resolve, reject) => {
		resolve(collection.count());
	})
}

// Sync.delPic = (collection, delList) => {
// 	delList = typeof delList == 'string' ? delList.split() : delList
// 	return new Promise((resolve, reject) => {
// 		collection.remove({
// 			pic_id: {
// 				$in: delList
// 			}
// 		}, () => {
// 			resolve();
// 		})
// 	})
// }
