let express = require('express')
let path = require('path')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let config = require('../../config')
let dbHandel = require('../db/handel.js')
let url = require('url')
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
let app = express()
app.use(cookieParser())
app.use(session({
	secret: 'who am i ?',
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
	saveUninitialized: true,
	resave: true
}))
app.use(express.static('src'))
app.use('/dbimg', express.static('server/dbimg'))
app.use('/dbmusic', express.static('server/dbmusic'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')
var login = function(req, res, next) {
	res.set('Content-Type', 'text/html')
	if (!req.session.isLogin) {
		res.redirect('/login')
		return
	}
	next()
}
// 前台页面
app.get('/show', function(req, res, next) {
	let myh5 = dbHandel.getModel('myh5')
	let id = url.parse(req.url, true).query['id']
	myh5.find({ work_id: id }, (err, docs) => {
		if (docs[0].data) {
			res.render('/Users/BraisedCakes/Desktop/github/myh5/src/page/show/index.html', {
				workData: docs[0],
				fn: function(json) {
					let str = ''
					for (let attr in json) {
						str += attr + ':' + json[attr] + ''
					}
					return str
				}
			})
		} else {
			res.send('没有该页面')
		}
		res.end()
	})
})
app.get('/list', login, function(req, res, next) {
	res.sendFile('/Users/BraisedCakes/Desktop/github/myh5/src/page/list/index.html')
})
app.get('/edit/:act', login, function(req, res, next) {
	res.render('/Users/BraisedCakes/Desktop/github/myh5/src/page/edit/index.html', {
		work_id: req.params.act
	})
})
app.get('/login', function(req, res, next) {
	res.set('Content-Type', 'text/html')
	if (req.session.isLogin) {
		res.redirect('/list')
		return
	}
	res.sendFile('/Users/BraisedCakes/Desktop/github/myh5/src/page/login/index.html')
})
app.get('/backstage', login, function(req, res, next) {
	res.sendFile('/Users/BraisedCakes/Desktop/github/myh5/src/page/backstage/index.html')
})




app.use(staticPath, express.static('./static'))
module.exports = app
