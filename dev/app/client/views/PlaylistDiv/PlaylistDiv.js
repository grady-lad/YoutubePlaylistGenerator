/** @jsx React.DOM */
var React = require('react');
var PlaylistsWrapper = require('./PlaylistsWrapper');


var PlaylistDiv = React.createClass({
  // bug in this code
  render: function () {
    var videos = this.props.videos;
    var playlistId = this.props.playlistId;
	  return (
	    <div id="aulone" className="group">
		  {Object.keys(videos).map(function(val , index){
		    return (
			  <section className="col span_1_of_3" key={val}>
			    <PlaylistsWrapper key={val} data={videos[val]}/>
			  </section>
			);
		  })}
		</div>
	  );
	}
});

module.exports = PlaylistDiv;