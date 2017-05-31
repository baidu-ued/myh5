let app = require('express')()


function aaa(req, res, next){
	console.log(111);
	next();
}
app.get('/aaa', function(req, res, next){
	console.log('aafffa')
	res.send('bbba')
	res.end()
})

app.get('/api/login', function(req, res, next){
	res.send({
		a : 1
	})
	// res.redirect('/aaa');
	// res.end();
	// next();
})
app.get('/',function(req, res, next){
	// console.log('bbb')
	// res.redirect('/aaa');
	// return;
	// res.send('bbb')
	res.sendFile('/Users/BraisedCakes/Desktop/myh5/index.html')
	// res.end();
})


app.listen(8080)
