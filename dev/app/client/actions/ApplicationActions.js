var AppDispatcher = require('../dispatcher/AppDispatcher');
var ApplicationConstants = require('../constants/ApplicationConstants');

var ApplicationActions = {
  
  noGAPI: function(){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.GAPIFAILED,
      status: "NOGAPI"
    });
  },

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

  fileValidationError: function(){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.FILE_VALIDATION_ERROR,
      error: 'We only accept .html files'
    });
  },

  selectFile: function(selected){
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