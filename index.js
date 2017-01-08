console.log("Twitter bot started.");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

// change keyword to the word that you would like to search for
var keyword = "puppy";

start(keyword);
setInterval(start, 1000*60*10);

function start(criteria){
	
	T.get('search/tweets', { q: criteria, count: 10 }, followAndRetweet);
}

function followAndRetweet(err, data, response){
	var tweets = data.statuses;
	if(tweets != null){

		for(var i = 0; i < tweets.length; i++){

			if(!tweets[i].retweeted){
				retweetID(tweets[i].id_str);
				followUserId(tweets[i].user.screen_name);
			}else{
				console.log("Retweeted this already.");
			}
		}
	}
	else
		console.log("No tweets were found with the keyword " + keyword);		
}

function retweetID(tweet_id){
	T.post('statuses/retweet/:id', { id: tweet_id }, function (err, data, response) {
  		if(err != null)
  			console.log("Retweet error is " + err);
  		else
  			console.log("Retweeting id " + tweet_id);
	})
}

function followUserId(screenName){
	T.post('friendships/create', {screen_name: screenName}, function (err, data, response) {
  	if(err != null)
  		console.log("Follow user error. Error is " + err);
  	else
  		console.log("Following " + screenName);
	})

}

