var getMd5 = require('md5');
module.exports.md5 = (str) =>{
	return getMd5(str + new Date().getTime() + Math.random() * 100 )
}
