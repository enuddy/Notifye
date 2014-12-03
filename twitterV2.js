var Twit = require('twit');

var twit = new Twit({
		consumer_key: 'WHyRO7p3gQmMST2Qqah4oR3Zz',
		consumer_secret: '30uAt79YAIIO7wG05I10bX1lDOIfhvvV0HgAglt9Ck1N1nvr5b',
		access_token: '2881725773-FyOJltDuROXKhUTA4fa2qew699Sb6j9y2zYsnFl',
		access_token_secret: 'BpxKUrYsKG38tmqZAfHhaM4gBpaNahK7LN0h8S6nHViSz'
	});



var twittr = (function(){


	/*
		text = data.statuses[element].text;
		data.entities.hashtags[0]
		
		
		//
		// filter the public stream by the latitude/longitude bounded box of San Francisco
		//
		var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

		var stream = T.stream('statuses/filter', { locations: sanFrancisco })

		stream.on('tweet', function (tweet) {
		  console.log(tweet)
		})

	
	*/
	function search(tag, callback){
		var text;
		var hashTags = [];
		twit.get('search/tweets', {q: tag, count: 5}, function(err, data, res){
			if (data.statuses[0] !== undefined)
			{
				text = data.statuses[0].text;
				
				for (var i = 0; i < 5; i++)
				{
					var tweet = data.statuses[i];
					if (tweet.entities.hashtags.length > 0)
						hashTags.push(tweet.entities.hashtags[0]);
				}
				callback(text, hashTags);
			}
		});
		
	}
	
	
	function geoSearch(tag, lat, lon, mlat, mlon, callback){
		var area = [lat, lon, mlat, mlon];
		
		var stream = twit.stream('statuses/filter', { locations: area });
		
		stream.on('tweet', function (tweet) {
			//console.log(tweet)
		})
		
		// stream should be set now. Go geolocating
		
	}
	
	
	function since(tag, date, callback){
	
		var d = tag + " since:" + date;
		twit.get('search/tweets', { q: d, count: 1 }, function(err, data, response) {
			if (data.statuses[0] !== undefined)
			{
				var text = data.statuses[0].text;
				console.log("Tweet found from since method.");
				callback(text);
			}
		})
	}
	
	
	

	return{
		search: search,
		geosearch: geoSearch,
		since: since,
	}

}());


module.exports = twittr;