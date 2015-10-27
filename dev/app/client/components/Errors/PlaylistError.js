var React = require('react');
var PlaylistActions = require('./../../actions/PlaylistActions');
var PlaylistError = React.createClass({

  handleClick: function(){
  	console.log(this.props);
    PlaylistActions.retryCreatePlaylist(this.props.plId);
  },
  render: function(){
    return (
  		<div className="error">
        <p> Sorry could not create Playlist due to the following error:</p>
        <p>{this.props.error}</p>
        <button type="submit" id="create" className="createPlaylist" onClick={this.handleClick}>Try Again</button>
  		</div>
  	);
  }
});

module.exports = PlaylistError;