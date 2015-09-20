/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./../../controllers/Uploader');


var ProgressComponent = React.createClass({
	render: function(){
		console.log(this.props);
		return (
			<div>Switch statements :) </div>
		);
	}
});

module.exports = ProgressComponent;