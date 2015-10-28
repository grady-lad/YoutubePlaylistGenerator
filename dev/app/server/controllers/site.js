"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
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
      total : v.length
    };
    return o;
  }, {});
  return playlists;
};

var youtubeRegExMatcher = function(href){  
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = href.match(regExp);
  
  if(match&&match[2].length === 11){
    return match[2];
  }
  return undefined;
};

var inspectFile = function(dataPromise){
  return new Promise((resolve, reject) => {
    var $;
    var result;
    var videoId;
    var links;
    
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

    if(result.length > 0){
      resolve(createResponse(result));
    }else{
      reject("Sorry your file contained no valid youtube links");
    }
  });
};

var readFile = function(path){
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, contents) {
      if(err){
        reject(err);
      }else{ 
        resolve(contents);
      }
    });
  });
};

exports.home = function (req, res) {
  res.render("index" , {title: 'Home'});
};
	
exports.readBookmarks = function (req , res){
  var filePath = __dirname + "/../../../../" + req.file.path;
  readFile(filePath).then(inspectFile).then(function(data){
    res.send(data);
    fs.unlink(filePath);
  }).catch(function(err){
    res.status(500).send({error: err});
    fs.unlink(filePath);
  });
};
