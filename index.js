console.log("Twitter bot started.");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
start();
setInterval(start, 1000*60*10);
function start(){
	T.get('search/tweets', { q: 'giveaway since:2016-12-30', count: 100 }, followAndRetweet);
}

function followAndRetweet(err, data, response){
	var tweets = data.statuses;
	for(var i = 0; i < tweets.length; i++){

		if(!tweets[i].retweeted){
			console.log(tweets[i].user.name);
			retweetID(tweets[i].id_str);
			followUserId(tweets[i].user.screen_name);
		}else{
			console.log("Retweeted this already.");
		}
	}

}

function retweetID(tweet_id){
	T.post('statuses/retweet/:id', { id: tweet_id }, function (err, data, response) {
  	console.log("Retweet error is " + err);
	})
}

function followUserId(screenName){
	T.post('friendships/create', {screen_name: screenName}, function (err, data, response) {
  	console.log("Following " + screenName);
  	console.log("Follow user error is " + err);
	})

}

