
# 欢迎使用fashion_h5


**fashion_h5**-免费H5页面制作工具-微信H5页面,微信朋友圈会议邀请函,电子贺卡,动态音乐相册,电子微杂志,节日贺卡等,易企秀提供海量H5微场景模板,轻松制作一键生成H5页面。


-------------------
当前版本 v0.0.1
####启动本地MongoDB服务
> **提示：**本项目数据库用的是MongoDB，所以需要先在本地启动MongoDB服务，并且新建一个名为 fashion_h5 的数据库。
``` javascript
// 本机
$ mongod --dbpath ~/data/db
```
####开启服务
``` javascript
node app.js
```
####开发者模式
``` javascript
// 进入backstage目录下
webpack --watch
```
####打开浏览器
浏览器打开 localhost:8080 就可以看到效果啦


----------


## 反馈与建议
- 微博：[@BraisedCakes](http://weibo.com/braisedcakes)
- 邮箱：<braisedcakes@gmail.com>
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
