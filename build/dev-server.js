// require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var webpackConfig = require('./webpack.dev.conf')
var app = express()
var cwd = process.cwd()
var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
})

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
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(express.static('src'));
app.use('/dbimg', express.static('server/dbimg'));
// 路由


function judegLogin(req, res, next){
	if(!req.cookies.username){
		console.log(9999)

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
	myh5.find({ work_id: 1 }, (err, docs) => {
		console.log(docs);
		res.render('/Users/BraisedCakes/Desktop/myh5/src/entry/show/index.html', {
            workData: docs[0],
			fn : function(json){
				var str = '';
				for(var attr in json){
					str += attr + ':' + json[attr] + ';'
				}
				return str;
			}
        });
		res.end();
	});
})
app.get('/list', judegLogin, function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if(!req.cookies.username){
		res.redirect('/login')
		return;
	}
	res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/entry/list/index.html')
});
app.get('/edit/:act', judegLogin, function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if(!req.cookies.username){
		res.redirect('/login')
		return;
	}

	res.render('/Users/BraisedCakes/Desktop/myh5/src/entry/edit/index.html', {
		work_id: req.params.act
	});

	// res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/entry/edit/index.html')
});
app.get('/login', judegLogin, function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if(req.cookies.username){
		res.redirect('/list')
		return;
	}
	res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/entry/login/index.html')
});

app.use(staticPath, express.static('./static'))

module.exports = app;
