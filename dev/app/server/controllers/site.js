"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
var Q		= require("q");
exports.home = function (req, res) {
  console.log('getting')
  res.render("index" , {title: 'Home'});
};
	
exports.readBookmarks = function (req , res){
	console.log('in readBookmarks');
	readFile(req).then(inspectFile).then(function(data){
		//data = JSON.stringify(jsonArray);
		//console.log(data);
		res.send(data);
	}).catch(function(err){
		res.render("site/home", {title: 'home', error: err});
	});
};

exports.testy = function(req , res){
	res.send('hey')
};

function readFile(path){
	// need to do something with the path here
	// may need need to set a timeout to read the file? But not sure if that is needed
	console.log('in readfile');
	var deferred = Q.defer();
	fs.readFile(__dirname + "/../data/lasttune.html", 'utf8', function(err, contents) {
		if(err) deferred.reject(err);
		else deferred.resolve(contents);
	});
	return deferred.promise;	
}
	
function inspectFile(dataPromise){
	var deferred = Q.defer();
	console.log('in inspectFile');
	if(dataPromise){
		var $ = cheerio.load(dataPromise);
		var links = $("a");
		var videoId = "";
		var result = [];
		var test = {};
		var intital = 200;
		var count = 0;
		for(var i=0; i < links.length; i++){
			var docHref = $(links[i]).attr("href");
	    	if(docHref.indexOf("youtube")){
	    		videoId = youtubeRegExMatcher(docHref);
	    		if(videoId !== undefined){
	    			result.push(videoId);
	    		}
	    	}
		}

		var playlists = {};
		var amount = Math.round(result.length / 200);
		playlists.total = amount;
		if(result.length <= 200){
		  playlists.playlist1 = result;
		}else{
			var count = 1;
			var testo = 1;
			var vidAmount = 200;
			var start = 0;
			console.log("amount is " + amount);
			for(var i = 1; i <= amount; i++){
				console.log("i is " + i);
				var playlist = "playlist";
				playlist = playlist + count;
				if(vidAmount > result.length){
					console.log('in here!');
					vidAmount = result.length;
					console.log("in the loop vidAmount is " + vidAmount);
				}
				var vids = result.slice(start , vidAmount);
				console.log("after " + i + " vids amount is " + vidAmount);
				console.log("after " + i + " vids length is " + vids.length);
				playlists[playlist] = vids
				count++;
				start = vidAmount;
				vidAmount = 200 * count;
			}
		}
		//console.log(playlists);
		deferred.resolve(playlists);
	}
	else {
		deferred.reject(err);
	}
	return deferred.promise;
}

function youtubeRegExMatcher(href){
	var match;
	var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
	
	match = href.match(regExp);
	if (match&&match[1].length==11){
        return match[1];
    }else {
    	return undefined;
    }
}
	
