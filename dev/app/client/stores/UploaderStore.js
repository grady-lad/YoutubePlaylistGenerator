var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/ApplicationConstants');
var assign = require('object-assign');
var Uploader = require('./../controllers/Uploader');
var CHANGE_EVENT = 'change';

var _uploadInfo = {};

var UploaderStore = assign({} , EventEmitter.prototype, {

  getUploadStep: function(ref){
    return _uploadInfo[ref].step;
  },

  getUploadedCount: function(ref){
    return _uploadInfo[ref].count;
  },

  getPlaylistUrl: function(ref){
    return _uploadInfo[ref].playlistUrl;
  },

  getPlaylistError: function(ref){
    return _uploadInfo[ref].error;
  },

  emitChange: function(ref) {
    this.emit(CHANGE_EVENT, ref);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  setUploadStep: function(ref, step){
    _uploadInfo[ref].step = step;
  },

  setupUploadInfo: function(ref){
    _uploadInfo[ref]= {
      step: "",
      count: 0
    }
    return _uploadInfo[ref];
  },

  setCreatePlaylistError: function(ref, error){
    _uploadInfo[ref].error = error;
  },

  setPlaylistUrl: function(ref, playlistId){
    _uploadInfo[ref].playlistUrl = "https://www.youtube.com/playlist?list=" + playlistId;
  },

  incrementCount: function(ref){
    _uploadInfo[ref].count++;
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

var createPlaylist = function(plId , plVids, plName){
  var upload = new Uploader(plName);
  var counting = 0;
  //recursivly call the create addtoplaylist until all videos are processed
  upload.createPlaylist().then((playlistId) => {
    
    UploaderStore.setPlaylistUrl(plId, playlistId);

    upload.addToPlaylist(plVids[UploaderStore.getUploadedCount(plId)], function callback(response){
      
      if(!response.error){
        UploaderStore.incrementCount(plId);
        UploaderStore.emitChange(plId);
      }
      if(counting <= plVids.length){
        counting++;
        upload.addToPlaylist(plVids[counting], callback);
      }else{
        UploaderStore.setUploadStep(plId, "SUCCESS");
        UploaderStore.emitChange(plId);
      }
    });

  }).catch((response) => {
    UploaderStore.setCreatePlaylistError(plId, response.error.message);
    UploaderStore.setUploadStep(plId, "ERROR");
    UploaderStore.emitChange(plId);
  });
};

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  
  var action = payload.action;
  
  switch(action.actionType) {
    // Respond to RECEIVE_DATA action
  case ApplicationConstants.UPLOAD_TUNES:
    createPlaylist(action.playlistId, action.playlistVids, action.playlistName);
    break;
  default:
    return true;
  }
  return true;
});

module.exports = UploaderStore;