var vine = require("node-vine");

var node = (function(){
	
	function popular()
	{
		vine.popular(function(err, response) {
			var arrayLength = response.records.length;
			for (var i = 0; i < arrayLength; i++)
			{
				console.log(response.records[i].videoUrl)
			}
		});
	}

	return{
		seePopular: popular,
	}
}());

module.exports = node;