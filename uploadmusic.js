var getMd5 = require('md5');
const dbHandel = require('./server/db/handel.js')
const http = require('http')
const fs = require('fs')
const path = require('path')
const { uploadFile } = require('./5.js')
const { promisify } = require('util')
var { md5 } = require('./server/util/index.js');
var cwd = process.cwd();
let pics = dbHandel.getModel('music');
var rootList = [{
	id: '889909',
	name: '激昂'
}, {
	id: '889907',
	name: '甜蜜'
}, {
	id: '890008',
	name: '影视原生'
}, {
	id: '889901',
	name: '招聘'
}, {
	id: '889905',
	name: '安静'
}, {
	id: '889903',
	name: '婚礼'
}, {
	id: '889908',
	name: '庄重'
}]
//拿到某个接口
let getAj = promisify((url, cb) => {
	// cb(null, true)
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
var getImg = promisify(({item, path, type}, cb) => {
	var url = 'http://res1.eqh5.com/' + path;
	http.get(url, function(res) {
		var imgData = "";
		res.setEncoding("binary");
		res.on("data", function(chunk) {
			imgData += chunk;
		});
		res.on("end", function() {
			console.log(path)
			var name = getMd5(imgData) + path.slice(path.indexOf('.'));
			fs.writeFile("./mp3/" + name, imgData, "binary", function(err) {
				if (err) {
					console.log("down fail");
				}
				// const dimensions = sizeOf("./mp3/" + name);
				new pics({
					id: md5(imgData),
					sourceId: item.sourceId,
					src: name,
					name : item.name,
					type : type,
					createTime: new Date().getTime()
				}).save(() => {
					console.log(name)
					cb(null, {
						name: name,
						filePath: "./mp3/" + name
					});
				})
			});
		});
	});
});
var index = 0;
(async() => {
	//遍历所有类型
	for (let i = 0; i < rootList.length; i++) {
		var rootUrl = 'http://store.eqxiu.com/api/product/cat/listProdByCate?attrGroupId=3&pageSize=10&category=' + rootList[i].id;
		//遍历当前类型前10页
		console.log('遍历')
		for (let j = 0; j < 10; j++) {
			let list = await getAj(rootUrl + '&pageNo=' + (j + 1)); //某个接口的所有图片
			for(let k = 0; k < list.length; k++){
				let path = list[k].authedPath || list[k].path || list[k].mid_pic || list[k].tmbPath || '';
				if(path == ''){
					break;
				}
				let json = await getImg({
					item : list[k],
					path  : path,
					type : rootList[i].id
				})
				await uploadFile(json.name, json.filePath);
				console.log('完成' + ++index + '个');
			}
		}
	}
})()
