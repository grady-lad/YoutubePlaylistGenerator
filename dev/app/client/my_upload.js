"use strict";
var Uploader = function(playlistTitle){
  this.playlistTitle = playlistTitle;
  this.playlistId = "";
}

var $ = require('jquery');

// After the API loads, call a function to enable the playlist creation form.
Uploader.prototype.handleAPILoaded = function() {
  enableForm();
}

// Enable the form for creating a playlist.
Uploader.prototype.enableForm = function() {
  $('#playlist-button').attr('disabled', false);
}

// Create a private playlist.
Uploader.prototype.createPlaylist = function() {
  var self = this;
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: this.playlistTitle,
        description: 'A private playlist created with the YouTube API'
      },
      status: {
        privacyStatus: 'private'
      }
    }
  });
  return new Promise(function(resolve, reject){
    request.execute(function(response) {
      var result = response.result;
      if (result) {
        self.playlistId = result.id
        console.log(result.id);
        console.log(result.snippet.title);
        console.log(result.snippet.description);
        resolve();
      } else {
      console.log('Could not create playlist');
      reject();
      }
    });
  });
}

// Add a video ID specified in the form to the playlist.
Uploader.prototype.addVideoToPlaylist = function() {
  addToPlaylist($('#video-id').val());
}

// Add a video to a playlist. The "startPos" and "endPos" values let you
// start and stop the video at specific times when the video is played as
// part of the playlist. However, these values are not set in this example.
Uploader.prototype.addToPlaylist = function(id, videos, count) {
  if(count < videos.length){
  var self = this;
  var details = {
    videoId: id,
    kind: 'youtube#video'
  }
  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: self.playlistId,
        resourceId: details
      }
    }
  });
  request.execute(function(response) {
    if(response){
      count++;
      console.log(response);
      self.addToPlaylist(videos[count] , videos, count);
    }
  });
  }else{
    return;
  }
}

Uploader.prototype.testy = function(){
  var self = this;
  for(var i=0; i <= 200; i++){
    (function(index){
      setTimeout(function() {      
        console.log("testing the worker method");        
      }, i * 500);
    })(i);
  }
}

module.exports = Uploader;