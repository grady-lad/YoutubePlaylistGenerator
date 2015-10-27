var AppDispatcher = require('../dispatcher/AppDispatcher');
var ApplicationConstants = require('../constants/PlaylistConstants');

var PlaylistActions = {

  setupStore: function(keyRef){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.CREATE_STORE,
      ref: keyRef
    });
  },
  
  uploadTunesToYoutube: function(selectedTitle ,id){
    AppDispatcher.handleAction({
      actionType: ApplicationConstants.UPLOAD_TO_YOUTUBE,
      title: selectedTitle,
      ref: id
    });
  }
};

module.exports = PlaylistActions;