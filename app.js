let app = require('express')()
var url = require('url');
app.get('/aaa', function(req, res, next){
	// console.log(req.url)
	console.log(url.parse(req.url,true).query);
	res.send('bbba');
	res.end();
})

app.listen(8081)
