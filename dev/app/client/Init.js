(function(gapi){
  "use strict";
  /** Need to add some polling fucntionality that checks that the google api
      function is loaded, but this is IEFF. **/
  var ReactDOM = require('react-dom');
  var React = require('react'); 
  var ApplicationActions = require('./actions/ApplicationActions');
  var InitAuth = require('./controllers/initAuth');
  var PlaylistApp = require('./components/PlaylistApp');
  var count = 0;
  var polling = setInterval(function(){
    if(gapi){
      InitAuth.googleApiClientReady().then(function(authResult){
        ApplicationActions.checkAuthorized(authResult);
        clearInterval(polling);
      });
    }else if(count > 4){
      ApplicationActions.noGAPI();
      clearInterval(polling);
    }
    count++;
  }, 1000);
  ReactDOM.render(<PlaylistApp/>, document.getElementById('initialContent'));
}(window.gapi));