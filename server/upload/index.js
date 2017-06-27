const { promisify } = require('util')
var qiniu = require("qiniu")
qiniu.conf.ACCESS_KEY = 'J8aSs0uWrR1eMi4cNwJlvxPnTcRdfCCn-RpmUytN'
qiniu.conf.SECRET_KEY = 'zetjLKiXDxUvwS7wv3ERNViWshrJG5_-GXVte8b4'
bucket = 'group1'

function token(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key)
	return putPolicy.token()
}
/**
 * 保存
 * @param key 文件名 basename
 * @param localFile 本地路径
 * @param cb 回调函数
 * @return 成功返回 true
 */
module.exports.uploadFile = promisify((key, localFile, cb) => {
	var uptoken = token(bucket, key)
	var extra = new qiniu.io.PutExtra()
	qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
		if (!err) {
			// 上传成功， 处理返回值
			cb(null, true)
		} else {
			// 上传失败， 处理返回代码
			console.log(err)
		}
	})
})
