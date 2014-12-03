
var express = require('express'),
    app = express();
var fs = require('fs');	
var Promise = require('promise');
var vine = require('./vine.js');
var twit = require('./twitterV2.js');
var mood = require('./mood.js');

// Handle Get Request
app.get('/', function(req, res){
	// get stuff from request

	servePage(res, './index.html');
});

/*
	This will get the score of the mood
	of the query sent it.
*/
app.get('/mood', function (req, res){
	console.log("Mood was succesfully called");
	mood.score(req.query.arr, function(data){
		var dat = data + ""; // need "" or it breaks.
		res.send(dat);
	});
});


/*
	This will get a public tweet based off the 
	tag input.
*/
app.get('/twitter', function(req, res){
	var name = req.query.arr[0];
	console.log("Twitter Search: " + name);
	
	twit.search(name, function(text, hashtags){
		console.log("text is: " + text);
		res.send(text);
	});
	
});

app.get('/geoloc', function(req, res){
	var lon = req.query.arr[0];
	var lat = req.query.arr[1];
	var mlon = req.query.arr[2];
	var mlat = req.query.arr[3];

	// we won't actually execute the code due to the error the package we installed always throws.
	//twit.geosearch(lon, lat, mlon, mlat, req.query.arr[4], function(data){
		console.log("Location: " + lon + " , " + lat);
	//});
});


app.get('/vineArray', function(req, res){
	var returnTags = [];
	getVideos(returnTags, res, req , sendVideos);
});



app.get('/formstuff', function(req, res){
	var returnTags = [];
	getVideos(returnTags, res, req , sendVideos);
});

app.get('/searchFromDay', function (req, res){
	twit.since(req.query.arr[0], req.query.arr[1], function(text){
		res.send(text);
	});
});

function servePage(res, page)
{
	var index;
	fs.readFile(page, function (err, data) {
    if (err) {
        throw err;
    }
		index = data;
		
		res.setHeader("Content-Type", "text/html");
		res.send(index);
		
	});
}



/*
	getVideos makes the calls to vine.js to get
	the video's location. Once we have completed our
	list call the callback in order to send it back to the user.
*/
function getVideos(returnTags, res, req, callBack)
{
		for (var i = 0 ; i < req.query.arr.length; i++)
		{
			vine.getVid(req.query.arr[i], function(x){
				returnTags.push(x);
				if (returnTags.length == req.query.arr.length)
				{
					callBack(returnTags, res);
				}
			});
		}
}

/*
	This is the magic that sends to stupid links to the 
	site. Promises work so anti-intuitivly in JS. 
	LIKE SERIOUSLY, why can't i just make these functions then 
	have in my main thing
	getVideos().then(sendVideos);
	or something similar, async sucks.
*/
function sendVideos(returnTags, res)
{
	res.send(returnTags);
}




app.listen(3000);
console.log("listening at port 3000");
