var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ApplicationConstants = require('../constants/ApplicationConstants');

var CHANGE_EVENT = 'change';
var _playlistInfo = {};


var changePlaylistStep = function(stepValue, ref){
  _playlistInfo[ref].step = stepValue;
};

var changePlaylistTitle = function(changedTitle, ref){
  _playlistInfo[ref].title = changedTitle;
};

var PlaylistStore = assign({} , EventEmitter.prototype, {

  getPlaylistStep: function(ref){
    return _playlistInfo[ref].step;
  },

  getPlaylistTitle: function(ref){
    return _playlistInfo[ref].title;
  },

  getPlaylistId: function(ref){
    return _playlistInfo[ref].id;
  },

  getCount: function(ref){
    return _playlistInfo[ref].count;
  },

  setupPlaylist: function(ref){
    _playlistInfo[ref]= {
      id: ref,
      title: "Create Playlist",
      step: ""
    };
    return _playlistInfo[ref];
  },

  emitChange: function(ref) {
    this.emit(CHANGE_EVENT, ref);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  
  var action = payload.action;
  
  switch(action.actionType) {
  case ApplicationConstants.CREATE_STORE:
    PlaylistStore.setupPlaylist(action.ref);
    PlaylistStore.emitChange(action.ref);
    break;
  case ApplicationConstants.UPLOAD_TO_YOUTUBE:
    changePlaylistTitle(action.title, action.ref);
    changePlaylistStep(('PROGRESS'), action.ref);
    PlaylistStore.emitChange(action.ref);
    break;
  case ApplicationConstants.RETRY_PLAYLIST:
    PlaylistStore.setupPlaylist(action.ref);
    PlaylistStore.emitChange(action.ref);
    break;
  default:
    return true;
  }
  return true;
});

module.exports = PlaylistStore;