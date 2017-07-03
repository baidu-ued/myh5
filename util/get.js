const { promisify } = require('util')
const http = require('http')
/**
 * 下载到本地
 * @param key 文件名
 * @param localFile 本地路径
 * @param cb 回调函数
 * @return 成功返回 true
 */
module.exports.download = promisify(({ item, path, type }, cb) => {
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
				new pics({
					id: md5(imgData),
					sourceId: item.sourceId,
					src: name,
					name: item.name,
					type: type,
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
