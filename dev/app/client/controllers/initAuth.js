function Auth(){
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
	  immediate: false },
	  function(token){
	    if (token.access_token) {
          console.log('Authorized!');
          self.loadAPIClientInterfaces();
        }else{
          console.log('not Authorized');
        }
	});
};

Auth.prototype.handleAuthResult = function(authResult) {
  console.log(authResult.error);
  if (authResult && !authResult.error) {
    console.log("ehhhhh");
    // Authorization was successful. Hide authorization prompts and show
	// content that should be visible after authorization succeeds.
	//$('.pre-auth').hide();
    //$('.post-auth').show();
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

module.exports = Auth;