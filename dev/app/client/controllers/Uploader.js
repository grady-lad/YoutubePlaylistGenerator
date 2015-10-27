var Uploader = function(playlistTitle){
  "use strict";
  this.playlistTitle = playlistTitle;
  this.playlistId = "";
};

// Create a private playlist.
Uploader.prototype.createPlaylist = function() {
  "use strict";
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
  return new Promise((resolve, reject) => {
    request.execute((response) => {
      var result = response.result;
      if (result) {
        this.playlistId = result.id;
        resolve(result.id);
      } else {
        reject(response);
      }
    });
  });
};

// Add a video to a playlist.
Uploader.prototype.addToPlaylist = function(id, callback) {
  "use strict";
  var details = {
    videoId: id,
    kind: 'youtube#video'
  };
  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: this.playlistId,
        resourceId: details
      }
    }
  });
  request.execute(function(response) {
    if(response){
      callback(response);
    } else{
      callback(undefined);
    }
  });
};

module.exports = Uploader;