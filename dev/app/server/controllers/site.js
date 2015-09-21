"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
var Q		= require("q");

exports.home = function (req, res) {
  console.log('getting')
  res.render("index" , {title: 'Home'});
};
	
exports.readBookmarks = function (req , res){
  var filePath = __dirname + "/../../../../" + req.file.path;
  readFile(filePath).then(inspectFile).then(function(data){
    res.send(data);
	fs.unlink(filePath);
  }).catch(function(err){
    console.log(err);
	res.render("index", {title: 'home', error: err});
	fs.unlink(filePath);
  });
};


function readFile(path){
  var deferred = Q.defer();
  fs.readFile(path, 'utf8', function(err, contents) {
    if(err){
	  deferred.reject(err);
	}
	else{ 
	  deferred.resolve(contents);
	}
  });
  return deferred.promise;	
}
	
function inspectFile(dataPromise){
  var deferred = Q.defer();
  if(dataPromise){
    var $ = cheerio.load(dataPromise);
	var links = $("a");
	var videoId = "";
	var result = [];
	var count = 0;
	var docHref;
	  for(var i=0; i < links.length; i++){
	    var docHref = $(links[i]).attr("href");
	    if(docHref.indexOf("youtube") !== -1){
	      count ++;
	      videoId = youtubeRegExMatcher(docHref);
	      if(videoId !== undefined){
	    	result.push(videoId);
	      }
	    }
	  }   
	deferred.resolve(createResponse(result));
  }
  else {
    deferred.reject(err);
  }
  return deferred.promise;
}
/**
* Credit to http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
* for the youtubeRegExMatcher
**/
function youtubeRegExMatcher(href){
	var match;
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	
	match = href.match(regExp);
	if (match&&match[2].length==11){
        return match[2];
    }else {
    	return undefined;
    }
}

function createResponse(tunes){
  var playlists = {};
  var vidAmount = 200;
  var totalReturned = 200
  //the amount of playlists we can create
  var amount = Math.round(tunes.length / vidAmount);
  //playlists.total = amount;
  // if songs is less than 200 no need for mad looping
  if(tunes.length <= vidAmount){
    playlists.playlist1 = {};
    playlists.playlist1.vids = tunes;
    playlists.playlist1.total = tunes.length;
    playlists.playlist1.playlistTitle = '';
  }else{
	var count = 1;
	var start = 0;
	//Loop through the amount of playlists we can create
	for(var i = 1; i <= amount; i++){
	  //Create a generic playlist name	
	  var playlist = "playlist";
	  playlist = playlist + count;

	  //We do this when we have E.G 900 tunes
	  if(vidAmount > tunes.length){
	    vidAmount = tunes.length;
		totalReturned = (tunes.length - start);
	  }
	  //slice the array
	  var vids = tunes.slice(start , vidAmount);
	  //add it to the playlist object
	  playlists[playlist] = {};
	  playlists[playlist].vids = vids;
	  playlists[playlist].total = totalReturned;
	  playlists[playlist].playlistTitle = '';
	  //increment count, start and end slice values
	  count++;
	  start = vidAmount;
	  vidAmount = 200 * count;
	}
  }
  return playlists;
}