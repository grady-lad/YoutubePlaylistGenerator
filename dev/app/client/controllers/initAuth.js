"use strict";

var $ = require('jquery');

var Auth = function(){
  var clientId;
  var OAUTH2_SCOPES;
  this.getClientID = function(){
    return clientId = '331947551227-0u2kbgm1kdt0tm4vgefhsoecrrodid2g.apps.googleusercontent.com';
  }
  this.getOAUTH2_SCOPES = function(){
    return OAUTH2_SCOPES = 'https://www.googleapis.com/auth/youtube';
  }
};

Auth.prototype.googleApiClientReady = function(){
  var self = this;
  gapi.auth.init(function() {
    window.setTimeout(self.checkAuth.bind(self), 1);
  });
};

Auth.prototype.checkAuth = function(){
  var self = this;
    gapi.auth.authorize({
	  client_id: self.getClientID(),
	  scope: self.getOAUTH2_SCOPES(),
	  immediate: true },
	  function(token){
	    if (token.access_token) {
          console.log('Authorized!');
          $('#loading').hide();
          $('#postAuth').show();
          console.log("here?");
          setTimeout(function(){
          $('#wrap').addClass('test');
        });
          self.loadAPIClientInterfaces();
        }else{
          $('#loading').hide();
          $('#preAuth').show();
          console.log('not Authorized');
        }
	});
};

Auth.prototype.handleAuthResult = function(authResult) {
  console.log('in here?');
  console.log(authResult.error);
  if (authResult && !authResult.error) {
    console.log("ehhhhh");
    // Authorization was successful. Hide authorization prompts and show
	// content that should be visible after authorization succeeds.
	$('#pre-auth').hide();
  $('#post-auth').show();
	this.loadAPIClientInterfaces();
  } else if (authResult && authResult.error) {
    // TODO: Show error
	console.error('Unable to sign in:', authResult.error);
  }
	console.log('hmmm');
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