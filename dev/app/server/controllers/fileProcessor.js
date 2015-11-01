"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
var _ = require("lodash");

var youtubeRegExMatcher = function(href){  
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = href.match(regExp);
  
  if(match&&match[2].length === 11){
    return match[2];
  }
  return undefined;
};

var createResponse = function(tunes){
 // Figure chunk amount and create x amount of chunks(playlists)
  var vidAmount = tunes.length < 200 ? tunes.length : 200;
  var videos = _.chunk(tunes, vidAmount);
 
 //reduce the array of chunks into an object. 
  var playlists = videos.reduce((o , v, i) => {
    let playlist = "playlist" + (i + 1);
    o[playlist] = {
      vids : v,
      total : v.length
    };
    return o;
  }, {});
  return playlists;
};

exports.inspectFile = function(dataPromise){
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

exports.readFile = function(path){
  console.log("reading the file");
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