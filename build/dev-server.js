// require('./check-versions')()
let config = require('../config')
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let session = require('express-session');
let cookieParser = require('cookie-parser');
let webpackConfig = require('./webpack.dev.conf')
let app = express()
let cwd = process.cwd()
let compiler = webpack(webpackConfig)
let devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
})
let url = require('url');
let dbHandel = require('../server/db/handel.js')
app.use(cookieParser());
app.use(session({
	secret: 'who am i ?',
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
	saveUninitialized: true,
	resave: true
}));
app.use(devMiddleware)
// app.use(hotMiddleware)
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(express.static('src'));
app.use('/dbimg', express.static('server/dbimg'));
// 路由
function judegLogin(req, res, next) {
	if (!req.cookies.username) {
		// res.end();
		// return;
	}
	next();
}
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// 前台页面
app.get('/show', function(req, res, next) {
	let myh5 = dbHandel.getModel('myh5');
	let id = url.parse(req.url, true).query['id'];
	myh5.find({ work_id: id }, (err, docs) => {
		if (docs[0].data) {
			res.render('/Users/BraisedCakes/Desktop/myh5/src/page/show/index.html', {
				workData: docs[0],
				fn: function(json) {
					let str = '';
					for (let attr in json) {
						str += attr + ':' + json[attr] + ';'
					}
					return str;
				}
			});
		} else {
			res.send('没有该页面')
		}
		res.end();
	});
})

app.get('/list', function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if (!req.cookies.username) {
		res.redirect('/login')
		return;
	}
	res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/page/list/index.html')
});
app.get('/edit/:act', judegLogin, function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if (!req.cookies.username) {
		res.redirect('/login')
		return;
	}
	res.render('/Users/BraisedCakes/Desktop/myh5/src/page/edit/index.html', {
		work_id: req.params.act
	});
});
app.get('/login', judegLogin, function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if (req.cookies.username) {
		res.redirect('/list')
		return;
	}
	res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/page/login/index.html')
});
//
// app.get('/backstage', judegLogin, function(req, res, next) {
// 	res.set('Content-Type', 'text/html');
// 	res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/entry/backstage/index.html')
// });
app.use(staticPath, express.static('./static'))
module.exports = app;
