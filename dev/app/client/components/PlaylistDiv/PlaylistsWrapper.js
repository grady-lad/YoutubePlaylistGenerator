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
    return PlaylistStore.setupPlaylist(this.props.names);
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
              return <ProgressComponent videos={this.props} names={this.state.title}/>
            default:
              return <CreatePlaylistComponent names={this.props.names} videos={this.props}/>;
            }
          })()} 
        </div>
     </div>
     );
  },
  _onChange: function(param){
    if(param === this.props.names){
      this.setState(getChangedState(this.props.names));
    }
  }

});

module.exports = PlaylistsWrapper;