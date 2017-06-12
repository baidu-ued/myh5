const app = require('../../../build/dev-server.js')
const QRCode = require('qrcode')
const util = require('../../util/index.js')
const path = require('path')
const save = (req, res) => {
	const fileName = util.md5('qrcode') + '.png'
	const toFilePath = path.resolve(process.cwd(), 'server/dbimg', fileName)
	console.log(toFilePath)
	QRCode.toFile(toFilePath, req.query.url, function(err) {
		if (err) throw err
		res.send({
			url : 'http://localhost:8080/dbimg/' + fileName,
			msg : 'success',
			status : 1
		})
	})
}
app.get('/aj/qrcode/save', save); //保存图片
