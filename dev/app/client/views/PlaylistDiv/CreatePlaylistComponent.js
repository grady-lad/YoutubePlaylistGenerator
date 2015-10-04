/** @jsx React.DOM */
var React = require('react');

var CreatePlaylistComponent = React.createClass({

  handleClick: function(event){
  	//console.log("in here?");
  	console.log(this.props);
	this.props.nextStep();
  },

  handleChange: function(event) {
    this.props.videos.data.playlistTitle = event.target.value;
  },

  render: function(){
    return ( 
	  <div className="createDiv">
      <div className="bubble">
	      <span> Enter a name for your Playlist</span>
      </div>
      <div className="playlistContent">
        <div className="instructions">
		      <p>Please make sure the playlist name does not exist</p>
        </div>
		    <input type="text" name="plName" className="playlistNameInput" placeholder ="Enter name here" onChange={this.handleChange}/>
	   	  <button type="submit" id="create" className="createPlaylist" onClick={this.handleClick}>Create Playlist</button>
      </div>
	  </div>	
	);
  }
});

module.exports = CreatePlaylistComponent;