var express = require('express'),
    app = express();

//var youtube = require('./youtube.js');
var vine = require('./vine.js');

// Handle Get Request
app.get('/', function(req, res){
	// get stuff from request
	// req
	
	// DO STUFF
	//youtube.loadStuff();
	//youtube.seeThings();
	vine.seePopular();


	// return stuff to client
    res.send('Hello World, HOW DO YOU WORK');
});

app.get('/stuff.json', function(req, res){
    res.json({"what" : "Hello World!" });
});


app.listen(3000, 'localhost');
console.log("listening at port 3000 and localHost?");
