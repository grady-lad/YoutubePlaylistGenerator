var Uploader = function(playlistId, channelId){
  this.playlistId = playlistId;
  this.channelId = channelId;
}

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
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: 'Test Playlist',
        description: 'A private playlist created with the YouTube API'
      },
      status: {
        privacyStatus: 'private'
      }
    }
  });
  request.execute(function(response) {
    var result = response.result;
    if (result) {
      playlistId = result.id;
      $('#playlist-id').val(playlistId);
      $('#playlist-title').html(result.snippet.title);
      $('#playlist-description').html(result.snippet.description);
    } else {
      $('#status').html('Could not create playlist');
    }
  });
}

// Add a video ID specified in the form to the playlist.
Uploader.prototype.addVideoToPlaylist = function() {
  addToPlaylist($('#video-id').val());
}

// Add a video to a playlist. The "startPos" and "endPos" values let you
// start and stop the video at specific times when the video is played as
// part of the playlist. However, these values are not set in this example.
Uploader.prototype.addToPlaylist = function(id, startPos, endPos) {
  var details = {
    videoId: id,
    kind: 'youtube#video'
  }
  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: 'PLiZ5SOHHmiC-c4uAzO-Re_CR_CUYkupQn',
        resourceId: details
      }
    }
  });
  request.execute(function(response) {
    console.log(JSON.stringify(response.result));
  });
}

module.exports = Uploader;