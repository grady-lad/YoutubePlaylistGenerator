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
	    <h2> Enter a name for your Playlist</h2>
		<p>Please make sure the playlist name does not exist</p>
		<input type="text" name="plName" onChange={this.handleChange}/>
	 	<button type="submit" id="create" className="playlistButton" onClick={this.handleClick}>Create Playlist</button>
	  </div>	
	);
  }
});

module.exports = CreatePlaylistComponent;