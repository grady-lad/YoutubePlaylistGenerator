var React = require('react');

var LoadingSpinner = React.createClass({
  // bug in this code
  render: function () {
	  return (
	    <div id="loading"></div>
	  );
	}
});

module.exports = LoadingSpinner;