var React = require('react');
var CreatePlaylistComponent = require('./CreatePlaylistComponent');
var ProgressComponent = require('./ProgressComponent');
var PlaylistStore = require('../../stores/PlaylistStore');


var getChangedState = function(ref){
  return {
    step: PlaylistStore.getPlaylistStep(ref),
    title: PlaylistStore.getPlaylistTitle(ref)
  };
}

var PlaylistsWrapper = React.createClass({
  
  displayName: 'playlistWrapper',

  shouldComponentUpdate: function(){
    return true;
  },

  getInitialState: function(){
    return PlaylistStore.setupPlaylist(this.props.plId);
  },
  
  componentDidMount: function(){
    PlaylistStore.addChangeListener(this._onChange);
  },

  render: function(){
    return(
     <div className="createDiv">
        <div className="bubble">
          <span>{this.state.title}</span>
        </div>
        <div className="playlistContent">
          {(() => {
            switch (this.state.step) {
            case "PROGRESS":
              return <ProgressComponent videos={this.props} playlistName={this.state.title}/>
            default:
              return <CreatePlaylistComponent plId={this.props.plId} videos={this.props}/>;
            }
          })()} 
        </div>
     </div>
     );
  },
  _onChange: function(param){
    if(param === this.props.plId){
      this.setState(getChangedState(this.props.plId));
    }
  }

});

module.exports = PlaylistsWrapper;