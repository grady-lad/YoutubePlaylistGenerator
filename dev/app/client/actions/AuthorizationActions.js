var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthorizationConstants = require('../constants/AuthorizationConstants');

var AuthorizationActions = {
  
  updateAuthorizationStep: function(auth){
	AppDispatcher.handleAction({
  	  actionType: AuthorizationConstants.AUTHORIZED,
  	  status: auth
  	});
  }
};

module.exports = AuthorizationActions;