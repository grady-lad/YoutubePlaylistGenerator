"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
var Q		= require("q");
var _ = require("lodash");

var createResponse = function(tunes){
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

var youtubeRegExMatcher = function(href){  
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = href.match(regExp);
  
  if(match&&match[2].length === 11){
    return match[2];
  }
  return undefined;
}

var inspectFile = function(dataPromise){
  var deferred = Q.defer();
  var $;
  var result;
  var videoId;
  
  if(dataPromise){
    
    $ = cheerio.load(dataPromise); 
    links = $("a"); 

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
  }else{
    deferred.reject(err);
  }
  return deferred.promise;
}

var readFile = function(path){
  var deferred = Q.defer();
  fs.readFile(path, 'utf8', function(err, contents) {
    if(err){
      deferred.reject(err);
    }else{ 
      deferred.resolve(contents);
    }
  });
  return deferred.promise;  
}

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
    res.render("index", {title: 'home', error: err});
    fs.unlink(filePath);
  });
};



