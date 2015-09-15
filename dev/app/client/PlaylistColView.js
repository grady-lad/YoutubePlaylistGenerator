/** @jsx React.DOM */
var React = require('react');
var playlistCol = React.createClass({


	render: function () {
		var arr = this.props.videos;
		return (
				<div>
					<h1>Enter playlist name below</h1>
					<p>Please make sure the playlist name does not exist</p>
					<input type="text" name="playlistName"></input>
				</div>
			)
	}

});
module.exports = playlistCol;