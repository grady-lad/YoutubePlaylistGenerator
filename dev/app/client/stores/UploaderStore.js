var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UploaderConstants = require('../constants/UploaderConstants');
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
    console.log(ref + " url is " + _uploadInfo[ref].playlistUrl);
    return _uploadInfo[ref].playlistUrl;
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

  setPlaylistUrl: function(ref, playlistId){
    _uploadInfo[ref].playlistUrl = "https://www.youtube.com/playlist?list=" + playlistId;
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

var createPlaylist = function(plId , plVids, plName){
  var upload = new Uploader(plName);
  var counting = 0;
   //recursivly call the create addtoplaylist until all videos are processed
   //Note: Need to add better error handling.
  upload.createPlaylist().then((playlistId) => {
    UploaderStore.setPlaylistUrl(plId, playlistId);
    upload.addToPlaylist(plVids[_uploadInfo[plId].count], function callback(response){
      if(!response.error){
        _uploadInfo[plId].count++;
        UploaderStore.emitChange(plId);
      }
      if(counting <= 2){
        counting++;
        upload.addToPlaylist(plVids[counting], callback);
      }else{
        UploaderStore.setUploadStep(plId, "SUCCESS");
        UploaderStore.emitChange(plId);
      }
    });
  });
};

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  
  var action = payload.action;
  
  switch(action.actionType) {
    // Respond to RECEIVE_DATA action
  case UploaderConstants.UPLOAD_TUNES:
    createPlaylist(action.playlistId, action.playlistVids, action.playlistName);
    break;
  default:
    return true;
  }
  return true;

});

module.exports = UploaderStore;