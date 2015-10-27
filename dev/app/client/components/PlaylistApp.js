"use strict";

var React = require('react'); 
var ApplicationStore = require('../stores/ApplicationStore');
var LoadingSpinner = require('./common/LoadingSpinner');
var PreAuth = require('./Authorization/PreAuth');
var UploadPlaylistComponent = require('./UploadDiv/UploadPlaylistComponent');
var PlaylistsWrapper = require('./PlaylistDiv/PlaylistsWrapper');
var NoGapiError = require('./Errors/NoGapiError');
var vids;

var getChangedState = function(){
  return {
    step: ApplicationStore.getStep(),
    playlists: ApplicationStore.getPlaylists() 
  };
}
var PlaylistApp = React.createClass({
  getInitialState: function(){
    return getChangedState();
  },
  componentDidMount: function(){
    ApplicationStore.addChangeListener(this._onChange);
  },

  render: function(){
    vids = this.state.playlists;
    return (
      <div className="PlaylistAppContainer">
        {(() => {
          switch(this.state.step){
          case "LOADING":
            return <LoadingSpinner/>;
          case "UNAUTHORIZED":
            return <PreAuth/>
          case "AUTHORIZED":
            return <UploadPlaylistComponent/>
          case "CREATEPLAYLISTDIVS":
            return (
              <div id="aulone" className="group">
                {Object.keys(vids).map(function(val){
                  return (
                    <section className="col span_1_of_3" key={val}>
                      <PlaylistsWrapper key={val} plId={val} data={vids[val]}/>
                    </section>
                  );
                })}
              </div>
            )
          case "NOGAPI":
            return <NoGapiError/>
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

module.exports = PlaylistApp;