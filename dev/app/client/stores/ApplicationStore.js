var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/ApplicationConstants');
var InitAuth = require('../controllers/initAuth');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _step = {
  status: "LOADING"
};
var _authorized = false;
var _playlists;
var _file;


var changeStep = function(stepValue){
  _step.status = stepValue
};

var authorize = function(){
  return new Promise((resolve) => { 
    InitAuth.handleAuthClick().then((result) => {
      resolve(result);
    }).catch(() => {
      //Do not know what to do with the error handling here?
    })
  });
};

var setPlaylistFile = function(selectedFile){
  _file = selectedFile;
}

var fetchPlaylistsFromServer = function(){
  return new Promise((resolve) => {
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    formData.append("uploaded-file" , _file);
    xhr.onload = function(){
      if(this.status === 200){
        _playlists = JSON.parse(this.response);
        resolve();
      }
    };
    xhr.open('POST', '/', true);
    xhr.send(formData);
  });
};

var ApplicationStore = assign({} , EventEmitter.prototype, {

  getStep: function(){
    return _step.status;
  },

  getAuthortized: function(){
    return _authorized;
  },

  getPlaylists: function(){
    return _playlists;
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

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  
  var action = payload.action;
  
  switch(action.actionType) {
    // Respond to RECEIVE_DATA action
  case ApplicationConstants.AUTHORIZECHECK:
    if(action.status){
      changeStep("AUTHORIZED");
      ApplicationStore.emitChange();
    }else{
      changeStep("UNAUTHORIZED");
      ApplicationStore.emitChange();
    }
    break;

  case ApplicationConstants.AUTHORIZEATTEMPT:
    authorize().then((auth) => {
      if(auth){
        changeStep("AUTHORIZED");
        ApplicationStore.emitChange();
      }
    })
    break;

  case ApplicationConstants.CREATE_PLAYLIST_FILE:
    console.log("in the switch");
    setPlaylistFile(action.file);
    ApplicationStore.emitChange();
    break;

  case ApplicationConstants.UPLOAD_PLAYLISTS:
    fetchPlaylistsFromServer().then(() => {
      changeStep("CREATEPLAYLISTDIVS");
      ApplicationStore.emitChange();
    });
    break;
  default:
    return true;
  }
  return true;

});

module.exports = ApplicationStore;