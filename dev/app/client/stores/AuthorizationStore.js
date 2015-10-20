var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthorizationConstants = require('../constants/AuthorizationConstants');
var InitAuth = require('../controllers/initAuth');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _step = 1;
var _authorized = false;


var changeStep = function(auth){
  _step = !auth ? 2 : 3;
};

var authorizeUser = function(){
  return new Promise((resolve) => { 
    InitAuth.handleAuthClick().then((result) => {
      changeStep(result);
      resolve();
    }).catch(() => {
      //Do not know what to do with the error handling here?
    })
  });
};

var AuthorizationStore = assign({} , EventEmitter.prototype, {

  getStep: function(){
    return _step;
  },

  getAuthortized: function(){
    return _authorized;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
    console.log("changed emitted");
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
  case AuthorizationConstants.AUTHORIZE:
    authorizeUser().then(function(){
      AuthorizationStore.emitChange();
    });
    break;
  case AuthorizationConstants.AUTHORIZED:
    changeStep(action.status);
    AuthorizationStore.emitChange();
    break;
  default:
    return true;
  }
  return true;

});

module.exports = AuthorizationStore;