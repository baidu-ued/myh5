const app = require('../../../build/dev-server.js')
const QRCode = require('qrcode')
const util = require('../../util/index.js')
const path = require('path')
const { uploadFile } = require('../../upload/index.js')
const { promisify } = require('util')
const save = async(req, res) => {
	const fileName = util.md5('qrcode') + '.png'
	const toFilePath = path.resolve(process.cwd(), 'server/dbimg', fileName)
	toFileSync = promisify(QRCode.toFile);
	await toFileSync(toFilePath, req.query.url);
	await uploadFile(fileName, toFilePath);
	res.send({
		url: 'http://ors5gu12t.bkt.clouddn.com/' + fileName,
		msg: 'success',
		status: 1
	})
}
app.get('/aj/qrcode/save', save); //保存图片
