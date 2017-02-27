# myh5

> myh5

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

安装sass
node-sass
sass-loader
webpack.base.conf.js,  module.rules新增
{
	test: /\.(scss|sass)$/,
	loader: 'style-loader!css-loader!sass-loader'
}

连接数据库失败，可能是hosts文件有问题，hosts开头设置为
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1    localhost
```
255.255.255.255    broadcasthost
::1             localhost
fe80::10    localhost
```
```
mongoose
保存
new User({
	user_name: obj.user_name,
	password: obj.password
}).save();

删除
// 	myh5.remove(function(err,docs){//删除id为4的记录
//      console.log(docs);
//      console.log('remove success');
// });
```
