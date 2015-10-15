"use strict";

var $ = require('jquery');

var authorized = false;

var Auth = function(){
  var clientId;
  var OAUTH2_SCOPES;
  /** I need to set the authorized but would love to have it hidden somehwer**/
  this.getAuthorized = function(){
    return authorized;
  };

  this.getClientID = function(){
    return clientId = '331947551227-0u2kbgm1kdt0tm4vgefhsoecrrodid2g.apps.googleusercontent.com';
  };

  this.getOAUTH2_SCOPES = function(){
    return OAUTH2_SCOPES = 'https://www.googleapis.com/auth/youtube';
  };
};

Auth.prototype.googleApiClientReady = function(){
  return new Promise((resolve) => {
    gapi.auth.init(() => {
      this.checkAuth().then(function(){
        resolve();
      });
    });
  });
};

Auth.prototype.checkAuth = function(){
  return new Promise((resolve) => {
    gapi.auth.authorize({
	    client_id: this.getClientID(),
	    scope: this.getOAUTH2_SCOPES(),
	    immediate: true
    },
	   (token) => {
	     if (token.access_token) {
         this.loadAPIClientInterfaces();
         authorized = true;
       }
       resolve();    
	  });
  });
};

Auth.prototype.loadAPIClientInterfaces = function() {
	gapi.client.load('youtube', 'v3', function() {});
}

Auth.prototype.handleAuthClick = function(event){
  console.log('within the auth');
  var self = this;
  console.log(self.getClientID());
  console.log(this.getOAUTH2_SCOPES());
  gapi.auth.authorize({
    client_id: self.getClientID(),
    scope: self.getOAUTH2_SCOPES(),
    immediate: false}, function(token){
      if (token.access_token) {
          console.log('Authorized!');
          $('#preAuth').hide();
          $('#postAuth').show();
          self.loadAPIClientInterfaces();
        }else{
          console.log('not Authorized');
        }
    });
  return false;
}

module.exports = Auth;