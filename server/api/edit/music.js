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
const http = require('http')
const get = (req, res) => {
	let pics = dbHandel.getModel('music');
	(async() => {
		let count = await getCountSync(pics, {});
		let data = await getDataSync(pics, {
			limit: req.query.limit,
			page: req.query.page,
			order : { _id: -1 }
		});

		pics.find((err, docs)=>{
			console.log(docs)
		})

		// new pics({
		// 	src : 'http://res1.eqh5.com/store/fb61d1d7e9110a0a1c64e821fbc744d0.mp3'
		// }).save();

		res.send({
			status: 1,
			msg: '获取成功',
			data: {
				page: data.page,
				pageNum: Math.ceil(count / data.limit),
				count: count,
				limit: data.limit,
				data: data.data
			}
		})
	})()
}
app.get('/aj/music/get', get); //获取图片
