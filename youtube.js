var Youtube = require("/node_modules/youtube-api");

var clientId = "264865898842";
var apiKey = "AIzaSyABvI1U9OSlUF6OAkX_DqcStLx3co";


Youtube.authenticate({
    type: "oauth"
  , token: apiKey
});

Youtube.channels.list({
    "part": "id"
  , "mySubscribers": true
  , "maxResults": 50
}, function (err, data) {
    console.log(err || data);
});