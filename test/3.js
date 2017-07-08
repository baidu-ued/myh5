const { promisify } = require('util')
// var fn = promisify(() => {
// 	console.log(arguments)
// 	setTimeout(function() {
// 		arguments[0](null, true)
// 	}, 1000)
// });
// (async() => {
// 	console.log(await fn(1, 2));
// 	// console.log(obj);
// })()

var find = {
	name : 'black',
	type : undefined
}
for(const attr in find){
	if(typeof find[attr] == 'undefined'){
		delete find[attr]
	}
}
console.log(find)
