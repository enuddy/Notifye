var Mood = require('sentiment');



var mood = (function(){

	function score(sentence, callback){
		var value = Mood(sentence);
		//console.log(value.score);
		var score = value.score;
		callback(score);
	}

	return{
		score: score,
	}

}());


module.exports = mood;