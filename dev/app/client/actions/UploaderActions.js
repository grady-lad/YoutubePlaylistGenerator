var AppDispatcher = require('../dispatcher/AppDispatcher');
var ApplicationConstants = require('../constants/ApplicationConstants');

var UploaderActions = {
  
  uploadPlaylistToYoutube: function(playlistId, playlistVids, playlistName){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.UPLOAD_TUNES,
      playlistId: playlistId,
      playlistVids: playlistVids,
      playlistName: playlistName
    });
  }
};

module.exports = UploaderActions;