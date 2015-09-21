/** @jsx React.DOM */
var React = require('react');
var PlaylistsWrapper = require('./PlaylistsWrapper');


var PlaylistDiv = React.createClass({
  
  render: function () {
    var videos = this.props.videos;
    var playlistId = this.props.playlistId;
	  return (
	    <div>
		  {Object.keys(videos).map(function(val , index){
		    return (
			  <section className="playlistDiv" key={val}>
			    <PlaylistsWrapper key={val} data={videos[val]}/>
			  </section>
			);
		  })}
		</div>
	  );
	}
});

module.exports = PlaylistDiv;