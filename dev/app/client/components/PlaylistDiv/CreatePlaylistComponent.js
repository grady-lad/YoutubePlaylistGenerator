var React = require('react');
var PlaylistActions = require('../../actions/PlaylistActions');
var createdTitle = "";
var CreatePlaylistComponent = React.createClass({

  handleClick: function(){
    PlaylistActions.uploadTunesToYoutube(createdTitle, this.props.plId); 
  },

  handleChange: function(event) {
    createdTitle = event.target.value
  },

  render: function(){
    return (
      <div className="instructions">
        <p>Please make sure the playlist name does not exist</p>
        <input type="text" name="plName" className="playlistNameInput" placeholder ="Enter name here" onChange={this.handleChange}/>
        <button type="submit" id="create" className="createPlaylist" onClick={this.handleClick}>Create Playlist</button>
      </div>
	);
  }
});

module.exports = CreatePlaylistComponent;
