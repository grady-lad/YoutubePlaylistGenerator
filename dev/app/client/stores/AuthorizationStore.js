var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthorizationConstants = require('../constants/AuthorizationConstants');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _step = 1;

function changeStep(auth){
  _step = !auth ? 2 : 3;
};

var AuthorizationStore = assign({} , EventEmitter.prototype, {

  getStep: function(key){
  	return _step;
  },

  emitChange: function() {
    console.log(_step);
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  
  var action = payload.action;
  var text;
  
  switch(action.actionType) {
    // Respond to RECEIVE_DATA action
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