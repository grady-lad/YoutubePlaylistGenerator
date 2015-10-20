var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthorizationConstants = require('../constants/AuthorizationConstants');

var AuthorizationActions = {
  
  authorizeUser: function(){
    AppDispatcher.handleAction({
      actionType: AuthorizationConstants.AUTHORIZE
    });
  },
  updateAuthorizationStep: function(auth){
    AppDispatcher.handleAction({
      actionType: AuthorizationConstants.AUTHORIZED,
      status: auth
    });
  }
};

module.exports = AuthorizationActions;