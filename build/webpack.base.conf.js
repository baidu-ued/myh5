var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var glob = require('glob');
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

function getEntries(globPath) {
	var files = glob.sync(globPath),
		entries = {};
	files.forEach(function(filepath) {
		// 取倒数第二层(view下面的文件夹)做包名
		var split = filepath.split('/');
		var name = split[split.length - 2];
		entries[name] = './' + filepath;
	});
	return entries;
}
var entries = getEntries('src/page/**/index.js');
var entry = {}
Object.keys(entries).forEach(function(name) {
	// 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
	entry[name] = entries[name];
})
module.exports = {
	entry: entry,
	// output: {
	// 	path: config.build.assetsRoot,
	// 	filename: '[name].js',
	// 	publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	// },
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			include: [resolve('src'), resolve('test')]
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}]
	}
}
