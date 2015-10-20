(function(gapi){
  "use strict";
  /** Need to add some polling fucntionality that checks that the google api
      function is loaded, but this is IEFF. **/
  var ReactDOM = require('react-dom');
  var React = require('react'); 

  var AuthorizationActions = require('./actions/AuthorizationActions');
  var AuthorizationStore = require('./stores/AuthorizationStore');
  var InitAuth = require('./controllers/initAuth');
  
  var LoadingSpinner = require('./components/common/LoadingSpinner');
  var PreAuth = require('./components/Authorization/PreAuth');
  var UploadPlaylistComponent = require('./components/UploadDiv/UploadPlaylistComponent');
 
  var getChangedState = function(){
    return {
      step: AuthorizationStore.getStep()
    };
  }
  var PlaylistApp = React.createClass({
    getInitialState: function(){
      return getChangedState();
    },
    componentDidMount: function(){
      AuthorizationStore.addChangeListener(this._onChange);
    },

    render: function(){
      return (
        <div className="PlaylistAppContainer">
          {(() => {
            switch(this.state.step){
            case 1:
              return <LoadingSpinner/>;
            case 2:
              return <PreAuth/>
            case 3:
              return <UploadPlaylistComponent/>
            default:
              return true;
            }
          })()}
        </div>
      );
    },
    _onChange: function(){
      this.setState(getChangedState());
    }
  });
  setTimeout(function(){
    if(gapi){
      InitAuth.googleApiClientReady().then(function(authResult){
        AuthorizationActions.updateAuthorizationStep(authResult);
      });
    }
  }, 1000);

  ReactDOM.render(<PlaylistApp/>, document.getElementById('initialContent'));

}(window.gapi));