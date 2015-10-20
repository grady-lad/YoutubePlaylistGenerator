var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PlaylistConstants = require('../constants/PlaylistConstants');
var UploadConstants = require('../constants/UploadConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _playlists = {};
var _file = null;

var loadProductData = function(data) {
  _title = data;
}

var fetchPlaylists = function(file){
  var xhr = new XMLHttpRequest();
 
  xhr.open('POST', '/', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(file);
}

var PlaylistStore = assign({}, EventEmitter.prototype, {

  getTitle: function(key){
    return _playlists[key].title;
  },

  getFile: function(){
    return _file;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {

  case UploadConstants.UPLOAD_PLAYLISTS:
    fetchPlaylists(action.playlistsHtml);
    break;
  // Respond to RECEIVE_DATA action
  case PlaylistConstants.SETUP_PLAYLIST_DIVS:
    _playlists = action._playlists;
    break;

  case PlaylistConstants.SHOW_LOADING:
    loadProductData(action.title);
    PlaylistStore.emitChange();
    break;
  default:
    return true;
  }
  return true;
});

module.exports = PlaylistStore;
