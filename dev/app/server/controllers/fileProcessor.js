"use strict";
var fs = require("fs");
var cheerio = require("cheerio");
var _ = require("lodash");

function promisify(fn){
  return function (){
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      return fn.apply(null, args.concat((err, contents) => {
        if(err) {
          return reject(err);
        }
        return resolve(contents);
      }));
    });
  }
}

let readDir = promisify(fs.readFile);


function getHtmlTags(content, tagType) {
  return cheerio.load(content)(tagType);
}

function isYoutube(urlLink) {
  return urlLink.indexOf('youtube') !== -1;
}

function calculateMaxVidAmount(videolist, amount) {
  return videolist.length < amount ? videolist.length : amount;
}

function validateVideoLength(vid){
  return vid&&vid.length === 11
}

function createChunks(content, amount) {
  console.log("here?")
  return new Promise((resolve) =>{
    resolve ._chunk(content , amount);
  })
}

/**function createPlaylistObject(arrOfVids) {
  return arrOfVids.reduce((obj, arr, index) => {
    obj['playlist' + (index + 1)] = {
      vids : arr,
      total : arr.length
    };
    return obj;
  }, {})
}**/

function one() {
  return readDir(__dirname + '/../data/lasttune.html', 'utf8');
}

/**
Tell the computer what you want.
I want to read a file.
I want to get all hmtltags based on the arguments.
I want to check if urls contain youtube links.
I want to get all the valid video id of the youtubelinks.
I want to create arrays of my video array.
I want to convert that array into an object.
**/

function not(fn) {
  return function(val) {
    return !fn(val);
  }
}

function containsYoutube(urlList) {
  return urlList.filter((urlItem) => {
    return urlItem.indexOf('youtube') !== -1;
  })
}

function processHrefsFromFile(filePath){
  return readDir(filePath, 'utf8')
  .then((htmlString) => {
    return _.map(getHtmlTags(htmlString, 'a'), (link) => {
      return link.attribs.href;
    })
  })
}

function getYoutubeVideoIds(hrefList){
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  return hrefList.map((href) => {
    return href.match(regExp)[2];
  }).filter((videoIds) => {
    return videoIds.length === 11;
  });
}


function createPlaylistObject(playlistArrays) {
  return playlistArrays.reduce((obj, arr, index) => {
    obj['playlist' + (index + 1)] = {
      vids : arr,
      total : arr.length
    };
    return obj;
  }, {})
}

function api(){
  return processHrefsFromFile(__dirname + '/../data/lasttune.html').then((hrefList) => {
    return getYoutubeVideoIds(containsYoutube(hrefList));
  }).then((youtubeArray) => {
    return _.chunk(youtubeArray, calculateMaxVidAmount(youtubeArray.length, 200))
  }).then((playlistArrays) => {
    return createPlaylistObject(playlistArrays);
  }).catch((err) => {
    console.log(err);
  })
}

api().then((contents) => {
  console.log(contents)
})
