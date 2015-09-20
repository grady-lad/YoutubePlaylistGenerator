/** @jsx React.DOM */
var React = require('react');

var CreatePlaylistComponent = React.createClass({

	handleClick: function(event){
		console.log(this.props);
		this.props.nextStep();
	},

	render: function(){
		return (
			<div><p>Hey you fuck</p>
			<button type="submit" id="create" className="playlistButton" onClick={this.handleClick}>Create Playlist</button>
			</div>
		);
	}
});

module.exports = CreatePlaylistComponent;