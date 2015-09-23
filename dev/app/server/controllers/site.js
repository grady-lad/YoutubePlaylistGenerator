"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
var Q		= require("q");
var _       = require("lodash");
//var Promise = require("promise");

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
    var $ = cheerio.load(dataPromise),
		links = $("a"),
		result,
		videoId,
		result;

	result = _.map(links ,function(link){
		return link.attribs.href;
	}).filter(function(href){
		return href.indexOf("youtube") !== -1;
	}).map(function(video){
		videoId = youtubeRegExMatcher(video);
	    if(typeof videoId !== undefined){
	   	  return videoId;
	    }
	});

	deferred.resolve(createResponse(result));
  }
  else {
    deferred.reject(err);
  }
  return deferred.promise;
}
/**
* Credit to:
* http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
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
 // Figure chunk amount and create x amount of chunks(playlists)
 var vidAmount = tunes.length < 200 ? tunes.length : 200;
 var videos = _.chunk(tunes, vidAmount);
 
 //reduce the array of chunks into an object. 
 var playlists = videos.reduce(function(o , v, i){
   var playlist = "playlist" + (i + 1);
   o[playlist] = {
     vids : v,
     total : v.length,
      playlistTitle: ""
   };
   return o;
 }, {});
  return playlists;
}