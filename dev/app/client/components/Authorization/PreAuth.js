var React = require('react');

var PreAuth = React.createClass({
  // bug in this code
  render: function () {
	  return (
	    <section id="preAuth">
		  <h1> Welcome to the YoutubePlaylist Generator</h1>
  		  <p id="eh"> This website needs authorization from google to continue </p>
    	  <button id="authorize">Authorize</button>
		</section>
	  );
	}
});

module.exports = PreAuth;
