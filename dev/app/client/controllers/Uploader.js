"use strict";
var Uploader = function(playlistTitle){
  this.playlistTitle = playlistTitle;
  this.playlistId = "";
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
  /**Need Better Error handling Here**/
  return new Promise(function(resolve, reject){
    request.execute(function(response) {
      var result = response.result;
      if (result) {
        self.playlistId = result.id
        resolve(result.id);
      } else {
      console.log('Could not create playlist');
      reject();
      }
    });
  });
}

// Add a video to a playlist.
Uploader.prototype.addToPlaylist = function(id, callback) {
  var self = this
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
  /** Need better error handling here**/
  /** Also need to wrap this in a promise**/
  request.execute(function(response) {
    if(response){
      callback(response);
    } else{
      callback(undefined);
    }
  });
}

module.exports = Uploader;