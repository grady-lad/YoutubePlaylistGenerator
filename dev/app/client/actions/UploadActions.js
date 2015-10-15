var AppDispatcher = require('../dispatcher/AppDispatcher');
var UploadConstants = require('../constants/UploadConstants');

var UploadActions = {
  
  uploadPlaylistToServer: function(file){ 	
	AppDispatcher.handleAction({
  	  actionType: UploadConstants.UPLOAD_PLAYLISTS,
  	  playlistsHtml: file
  	});
  }
};

module.exports = UploadActions;