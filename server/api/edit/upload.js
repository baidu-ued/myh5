var qiniu = require("qiniu");
var cwd = process.cwd();
// var config = require(__dirname + '/qiniu.js');
// //需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'J8aSs0uWrR1eMi4cNwJlvxPnTcRdfCCn-RpmUytN';
qiniu.conf.SECRET_KEY = 'zetjLKiXDxUvwS7wv3ERNViWshrJG5_-GXVte8b4';
//要上传的空间
bucket = 'group1';
//上传到七牛后保存的文件名
key = '115.png';
//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}
//生成上传 Token
token = uptoken(bucket, key);
//要上传文件的本地路径
filePath = 'http://z.sina.com.cn/styles/images/logo.png'
//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}
//调用uploadFile上传
uploadFile(token, key, filePath);

module.exports = uploadFile;
