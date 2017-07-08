let config = require('../config')
let webpack = require('webpack')
let path = require('path')
let webpackConfig = require('./webpack.dev.conf')
let compiler = webpack(webpackConfig)
let app = require('../server/app/index.js')
let devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
})
app.use(devMiddleware)
app.use(hotMiddleware)
