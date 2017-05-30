// require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var path = require('path')
var express = require('express')
var webpack = require('webpack')

var webpackConfig = require('./webpack.dev.conf')
var app = express()

var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
})

app.use(devMiddleware)
app.use(hotMiddleware)
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(express.static('src'));
app.use('/dbimg', express.static('server/dbimg'));
// 路由
app.get('/:viewname?/:act', function(req, res, next) {

	var viewname = req.params.viewname ? req.params.viewname + '.html' : 'index.html';
	console.log(viewname)
	var filepath = path.join(compiler.outputPath, viewname);
	console.log(filepath)
	// 使用webpack提供的outputFileSystem
	compiler.outputFileSystem.readFile(filepath, function(err, result) {
		if (err) {
			// something error
			return next(err);
		}
		res.set('content-type', 'text/html');
		res.send(result);
		res.end();
	});
});

app.use(staticPath, express.static('./static'))

module.exports = app;
