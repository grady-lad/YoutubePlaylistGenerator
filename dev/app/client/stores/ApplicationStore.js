var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/ApplicationConstants');
var InitAuth = require('../controllers/initAuth');
var assign = require('object-assign');

var _step = {
  status: "LOADING"
};

var _authorized = false;
var _playlists;
var _file;
var _validationError = '';
var _createDivs = false;
var CHANGE_EVENT = 'change';

var changeStep = function(stepValue){
  _step.status = stepValue
};

var setValidationError = function(error){
  _validationError = error;
};

var setCreateDivs = function(){
  _createDivs = true;
};

var authorize = function(){
  return new Promise((resolve) => { 
    InitAuth.handleAuthClick().then((result) => {
      resolve(result);
    });
  });
};

var setPlaylistFile = function(selectedFile){
  _file = selectedFile;
}

var fetchPlaylistsFromServer = function(){
  return new Promise((resolve, reject) => {
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    formData.append("uploaded-file" , _file);
    xhr.addEventListener('load', function(){
      if(xhr.status === 200){
        _playlists = JSON.parse(xhr.response);
        resolve();
      }else{
        reject(JSON.parse(xhr.response));
      }
    });
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

  getCreateDivs: function(){
    return _createDivs;
  },

  getValidationError: function(){
    return _validationError;
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

  case ApplicationConstants.GAPIFAILED:
    changeStep(action.status);
    ApplicationStore.emitChange();
    break;
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

  case ApplicationConstants.FILE_VALIDATION_ERROR:
    setValidationError(action.error);
    ApplicationStore.emitChange();
    break;

  case ApplicationConstants.CREATE_PLAYLIST_FILE:
    setPlaylistFile(action.file);
    setValidationError("");
    ApplicationStore.emitChange();
    break;

  case ApplicationConstants.UPLOAD_PLAYLISTS:
    fetchPlaylistsFromServer().then(() => {
      changeStep("CREATEPLAYLISTDIVS");
      setCreateDivs();
      ApplicationStore.emitChange();
    }).catch((err) => {
      setValidationError(err.error);
      ApplicationStore.emitChange();
      ApplicationStore.getValidationError();
    });
    break;
  default:
    return true;
  }
  return true;

});

module.exports = ApplicationStore;