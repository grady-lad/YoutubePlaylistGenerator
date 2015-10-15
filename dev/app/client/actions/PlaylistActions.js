var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlaylistConstants = require('../constants/PlaylistConstants');

var PlaylistActions = {
  
  setupPlaylistDivs: function(obj){
	AppDispatcher.handleAction({
  	  actionType: PlaylistConstants.SETUP_PLAYLIST_DIVS,
  	  playlists: obj
  	});
  },

  showLoadingDiv: function(data){
  	AppDispatcher.handleAction({
  	  actionType: PlaylistConstants.SHOW_LOADING,
  	  title: data
  	});
  }
};

module.exports = PlaylistActions;