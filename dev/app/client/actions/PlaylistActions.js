var AppDispatcher = require('../dispatcher/AppDispatcher');
var ApplicationConstants = require('../constants/ApplicationConstants');

var PlaylistActions = {

  uploadTunesToYoutube: function(selectedTitle ,id){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.UPLOAD_TO_YOUTUBE,
      title: selectedTitle,
      ref: id
    });
  },

  retryCreatePlaylist: function(id){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.RETRY_PLAYLIST,
      ref: id
    });
  }
};

module.exports = PlaylistActions;