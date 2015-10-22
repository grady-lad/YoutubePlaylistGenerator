var React = require('react');
var ApplicationActions = require('../../actions/ApplicationActions');

var PreAuth = React.createClass({
  
  handleClick: function(){
    console.log("clicked?");
    ApplicationActions.authorizeUser();  
  },

  render: function() {
    return (
      <section id="preAuth">
        <div className="content">
  				<h1> Welcome to the YoutubePlaylist Generator</h1>
          <p id="eh"> This website needs authorization from google to continue </p>
          <button id="authorize" onClick={this.handleClick}>Authorize</button>
        </div>
      </section>
    );
  }
});

module.exports = PreAuth;
