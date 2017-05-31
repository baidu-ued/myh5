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
app.get('/:viewname?/:act', judegLogin, function(req, res, next) {
	res.set('Content-Type', 'text/html');
	if(!req.cookies.username && req.params.act != 'login'){
		res.redirect('/login')
		return;
	}else if(req.params.act == 'login'){
		res.redirect('/edit')
	}
	res.sendFile('/Users/BraisedCakes/Desktop/myh5/src/entry/' + req.params.act + '/index.html')
});

app.use(staticPath, express.static('./static'))

module.exports = app;
