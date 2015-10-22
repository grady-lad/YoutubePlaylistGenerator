var AppDispatcher = require('../dispatcher/AppDispatcher');
var ApplicationConstants = require('../constants/ApplicationConstants');

var ApplicationActions = {
  
  checkAuthorized: function(auth){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.AUTHORIZECHECK,
      status: auth
    });
  },

  authorizeUser: function(){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.AUTHORIZEATTEMPT
    });
  },

  selectFile: function(selected){
    console.log("withtin the select file method of the actions");
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.CREATE_PLAYLIST_FILE,
      file: selected
    });
  },

  uploadPlaylistToServer: function(){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.UPLOAD_PLAYLISTS
    });
  }
};

module.exports = ApplicationActions;