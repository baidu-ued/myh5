let http = require('http');
var fs = require('fs')
var getMd5 = require('md5');
var { md5 } = require('./server/util/index.js');
const dbHandel = require('./server/db/handel.js')
const { saveCollectionSync } = require('./server/promisify/index.js')
const { promisify } = require('util');
const sizeOf = require('image-size');
var cwd = process.cwd();
// //上传到七牛后保存的文件名
var typelist = [{
	id : 889890,
	name : '最热'
},{
	id: 890042,
	name: '爆笑职场'
}, {
	id: 889891,
	name: '背景'
}, {
	id: 889892,
	name: '图标'
}, {
	id: 889893,
	name: '动画'
}, {
	id: 889894,
	name: '线条'
}, {
	id: 889895,
	name: '文字'
}, {
	id: 889896,
	name: '边框'
}, {
	id: 889898,
	name: '形状'
}];
let pics = dbHandel.getModel('pics');
var index = 0;
pics.find((err, docs)=>{
	docs.forEach((item, index)=>{
		if(item.type){
			var id = item.type.id;
			pics.update({
				id : item.id
			}, {
				types : id
			}, ()=>{
				++index;
				console.log(index)
			})
		}
	})
})
// //拿到某个接口
// var get = promisify((url, cb) => {
// 	http.get(url, function(req, res) {
// 		var body = '';
// 		req.on('data', function(chunk) {
// 			body += chunk;
// 		});
// 		req.on('end', function() {
// 			var list = JSON.parse(body).list;
// 			if (!list || list.length == 0) {
// 				cb(null, false);
// 			} else {
// 				cb(null, list);
// 			}
// 		});
// 	});
// });
// var index = 0;
// (async() => {
// 	let pics = dbHandel.getModel('pics');
// 	//遍历每个type
// 	for (let i = 0; i < typelist.length; i++) {
// 		console.log('进入下一个type:', typelist[i].name)
// 		var rootUrl = 'http://store.eqxiu.com/api/product/cat/listProdByCate?attrGroupId=1&category=' + typelist[i].id + '&pageSize=18';
// 		//遍历所有页
// 		for (let j = 0; j < 999; j++) {
// 			let list = await get(rootUrl + '&pageNo=' + (j + 1)); //某个接口的所有图片
// 			if (!list) {
// 				break;
// 			}
// 			//遍历所有图片
// 			for (let k = 0; k < list.length; k++) {
// 				// console.log(list[k].sourceId);
// 				if(list[k].sourceId){
// 					await new Promise((resolve, reject)=>{
// 						pics.update({sourceId : list[k].sourceId}, { type : typelist[i] }, ()=>{
// 							resolve();
// 						})
// 					})
// 					console.log(++index)
// 				}
// 			}
// 		}
// 	}
// })()
