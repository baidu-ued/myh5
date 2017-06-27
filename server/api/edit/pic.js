const multiparty = require('multiparty');
const exec = require('child_process').exec;
const cwd = process.cwd();
const path = require('path');
const sizeOf = require('image-size');
const dbHandel = require('../../db/handel.js')
const util = require('../../util/index.js')
const app = require('../../../build/dev-server.js')
const fs = require('fs')
const { saveCollectionSync, getCountSync, getDataSync, delDataSync } = require('../../promisify/index.js')
const { uploadFile } = require('../../upload/index.js')
const http = require('http')
/**
 * 规则
 * 如果types存在， 就获取该类型图片
 * 如果types不存在， 就获取所有图片
 */
const get = async(req, res) => {
	const pics = dbHandel.getModel('pics')
	const find = {}
	if (req.query.types) {
		find.types = String(req.query.types)
	}
	/**
	 	获取总数
	*/
	let count = await getCountSync(pics, find);
	/**
	 	获取指定数据
	*/
	let data = await getDataSync(pics, {
		limit: req.query.limit,
		page: req.query.page,
		order: { _id: -1 },
		find: find
	});
	/**
	 	发送回调
	*/
	res.send({
		status: 1,
		msg: '获取成功',
		data: {
			page: data.page,	//当前页
			pageNum: Math.ceil(count / data.limit),	//页码
			count: count,	//总个数
			limit: data.limit,	//每个页数
			data: data.data	//数据
		}
	})
}
const save = (req, res) => {
	let form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err) throw err;
		(async() => {
			let pics = dbHandel.getModel('pics');
			let data = [];
			if (!files['picture']) {
				res.send({
					status: 1,
					msg: '类型应该为picture'
				})
				return;
			}
			for (let i = 0; i < files['picture'].length; i++) {
				const item = files['picture'][i]
				// exec('cp ' + item.path + ' ' + path.resolve(cwd, 'server/dbimg/'))
				const pic_id = util.md5('pic')
				var name = util.md5('pic') + item.originalFilename.slice(item.originalFilename.indexOf('.'));
				await uploadFile(name, item.path)
				data.push({
					src: name,
					id: pic_id
				})
				const dimensions = sizeOf(item.path)
				await saveCollectionSync(pics, {
					username: req.cookies.username,
					id: util.md5('pic'),
					src: name,
					width: dimensions.width,
					height: dimensions.height,
					types: 'my'
				})
			}
			res.send({
				status: 1,
				msg: '上传成功',
				data: data
			})
		})()
	})
}
const del = (req, res) => {
	let pics = dbHandel.getModel('pics');
	(async() => {
		let list = req.query.pic_id;
		list = typeof list == 'string' ? list.split() : list
		let status = await delDataSync(pics, {
			find: {
				pic_id: {
					$in: list
				}
			}
		});
		res.send({
			status: 1,
			msg: status ? '删除成功' : '删除失败'
		})
	})()
}
app.get('/aj/pic/get', get); //获取图片
app.get('/aj/pic/del', del); //删除图片
app.post('/aj/pic/save', save); //保存图片
