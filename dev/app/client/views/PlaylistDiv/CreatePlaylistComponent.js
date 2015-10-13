var React = require('react');

var CreatePlaylistComponent = React.createClass({

  handleClick: function(event){
  	//console.log("in here?");
	this.props.nextStep();
  this.props.setTitle(this.props.videos.data.playlistTitle);
  },

  handleChange: function(event) {
    this.props.videos.data.playlistTitle = event.target.value;
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