let http = require('http');
var fs = require('fs')
var getMd5 = require('md5');
var { md5 } = require('./server/util/index.js');
const dbHandel = require('./server/db/handel.js')
const { saveCollectionSync } = require('./server/promisify/index.js')
const { promisify } = require('util');
const sizeOf = require('image-size');
var qiniu = require("qiniu");
var cwd = process.cwd();
qiniu.conf.ACCESS_KEY = 'J8aSs0uWrR1eMi4cNwJlvxPnTcRdfCCn-RpmUytN';
qiniu.conf.SECRET_KEY = 'zetjLKiXDxUvwS7wv3ERNViWshrJG5_-GXVte8b4';
bucket = 'group1';
// //上传到七牛后保存的文件名
var list = [{
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

function uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
	return putPolicy.token();
}
var uploadFile = promisify((uptoken, key, localFile, cb) => {
	var extra = new qiniu.io.PutExtra();
	qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
		if (!err) {
			// 上传成功， 处理返回值
			cb(null, true);
		} else {
			// 上传失败， 处理返回代码
			console.log(err);
		}
	});
});
//拿到某个接口
var get = promisify((url, cb) => {
	http.get(url, function(req, res) {
		var body = '';
		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			var list = JSON.parse(body).list;
			if (!list || list.length == 0) {
				cb(null, false);
			} else {
				cb(null, list);
			}
		});
	});
});
var getImg = promisify(({item, path}, cb) => {
	var url = 'http://res1.eqh5.com/' + path;
	http.get(url, function(res) {
		var imgData = "";
		res.setEncoding("binary");
		res.on("data", function(chunk) {
			imgData += chunk;
		});
		res.on("end", function() {
			var name = getMd5(imgData) + path.slice(path.indexOf('.'));
			fs.writeFile("./img2/" + name, imgData, "binary", function(err) {
				if (err) {
					console.log("down fail");
				}
				const dimensions = sizeOf("./img2/" + name);
				new pics({
					id: md5(imgData),
					sourceId: item.sourceId,
					src: name,
					width: dimensions.width,
					height: dimensions.height,
					createTime: new Date().getTime()
				}).save(() => {
					cb(null, {
						key: name,
						token: uptoken(bucket, name),
						filePath: "./img2/" + name
					});
				})
			});
		});
	});
});
var index = 0;
(async() => {
	let pics = dbHandel.getModel('pics');
	//遍历每个type
	for (let i = 0; i < list.length; i++) {
		console.log('进入下一个type:', list[i].name)
		var rootUrl = 'http://store.eqxiu.com/api/product/cat/listProdByCate?attrGroupId=1&category=' + list[i].id + '&pageSize=18';
		//遍历所有页
		for (let j = 0; j < 999; j++) {
			let list = await get(rootUrl + '&pageNo=' + (j + 1)); //某个接口的所有图片
			if (!list) {
				break;
			}
			//遍历所有图片
			for (let k = 0; k < list.length; k++) {
				let path = list[k].authedPath || list[k].path || list[k].mid_pic || list[k].tmbPath || '';;
				if(path == ''){
					break;
				}
				let json = await getImg({
					item : list[k],
					path  : path
				})
				await uploadFile(json.token, json.key, json.filePath);
				console.log('当前第' + ++index + '张图片')
			}

		}
	}
})()
