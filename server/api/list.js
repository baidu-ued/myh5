let dbHandel = require('../db/handel.js')
let app = require('../../build/dev-server.js')




let get = (req, res)=> {
	let obj = req.query
	let myh5 = dbHandel.getModel('myh5')
	let type = String(obj.type) || 'news'
	let length = Number(obj.length) || 12
	let page = Number((obj.page - 1) * length)

	var readFile1 = ()=> {
		return new Promise((resolve, reject) =>{
			myh5.count({
				type : type
			}, (err, docs)=>{
				resolve(docs)
			})
		});
	};
	var readFile2 = () =>{
		return new Promise((resolve, reject)=> {
			myh5.where({
				// type: type
			}).skip(page).limit(length).exec((err, docs)=>  {
				resolve(docs)
			})
		});
	};
	var asyncReadFile = async ()=>  {
		var count = await readFile1();
		var data = await readFile2();
		res.send({
			status: 1,
			msg: '获取成功',
			data: {
				data: data,
				pageNum : Math.ceil(count / length)
			}
		})
	};
	asyncReadFile()
}
let add = (req, res)=> {
	let myh5 = dbHandel.getModel('myh5');
	(async ()=>{
		let count = await getCount(myh5);

		new myh5({
			work_id : ++count,
			data : {}
		}).save();

		res.send({
			msg : '创建成功'
		})


	})();
}
/**
 * 获取所有图片数
 * @param collection
 * @return 成功返回总数
 */
let getCount = (collection) => {
	return new Promise((resolve, reject) => {
		resolve(collection.count());
	})
}


app.get('/api/list/get', get); //获取页面数据
app.get('/api/list/add', add); //获取页面数据
