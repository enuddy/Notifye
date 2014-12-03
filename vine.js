var vine = require("node-vine");

/*

var t = new Twitter(){


}

*/



var node = (function(){

	function getVidWithTag(videoTags, callback)
	{
		var tagName = videoTags.trim();
		console.log("Finding video with tag: " + tagName);
		
		vine.tags(tagName, function(err, response){
			if (err){
				console.log("couldn't find tag");
				// do nothing.
			}
			else{
				if (response === undefined) return;
				if (response.records[0] === undefined)
				{
					return;
					// do nothing.
				}
				else{
					var x = response.records[0].videoUrl;
					callback(x);
				}
			}
		});
			
	} // end of getVidWithTag functions


	
	return{
		getVid: getVidWithTag,
	}
}());

module.exports = node;