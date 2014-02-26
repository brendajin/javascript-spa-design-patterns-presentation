var express 		= require('express'),
http 				= require('http'),
app 				= express(),
server 				= http.createServer(app),
NodeApplication 	= [];

//function for heroku
process.env.PWD = process.cwd();


app.configure(function(){
	//public directory for static server
	app.use(express.static(__dirname + '/public'));
	//ignore favicon
	app.use(express.favicon(process.env.PWD + '/public/favicon.ico'));
});

// Index Page
app.get('/', function(req, res) {
	res.render('index');
});

// Current Tests MCOM
app.get("/:page", function(req, res) {
	switch(req.params.page) {
		case 'MCOMA': 
			res.render('0225A');
			break;
		case 'MCOMB': 
			res.render('0225B');
			break;
		case '':
			res.render('index');
			break;
		default:
			res.render(req.params.page);
	}
})

var port = process.env.PORT || 2500;
app.listen(port, function() {
  console.log("LISTENING ON PORT: "+port);
});