var Youtube = require('youtube-api');

var yTube = (function(){

	var clientId = "264865898842";
	var apiKey = "AIzaSyARvhtCCAwdEGPuOPZYuWBRJCVKZ0hb1Hk";
	var clientSecret = "hGnKI5hbI-tZRrXT_XSZlZfy";
	
	function load(){
		Youtube.authenticate({
   	 		type: "oauth",
   	 		token: apiKey
		});
	}

	function seeStuff(){

		Youtube.channels.list({
  	 		 "part": "id"
 			 , "mySubscribers": true
 			, "maxResults": 50
		}, function (err, data) {
		    console.log(err || data);
		});

	}

	



	return{
		loadStuff: load,
		seeThings: seeStuff
	}

}());

module.exports = yTube;