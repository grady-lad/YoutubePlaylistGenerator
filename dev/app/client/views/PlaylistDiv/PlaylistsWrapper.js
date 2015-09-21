/** @jsx React.DOM */
var React = require('react');
var CreatePlaylistComponent = require('./CreatePlaylistComponent');
var ProgressComponent = require('./ProgressComponent');


var PlaylistsWrapper = React.createClass({
  //Used to create inital variables for our view
  getInitialState: function(){
    //console.log(this.props);
    return {
      showing: true,
      count: 0,
      loading: false,
      step: 1
  	};
  },

  nextStep: function() {
  	this.setState({
  		step : this.state.step + 1
  	});
  },

  render: function(){
  	switch (this.state.step) {
  		case 1: 
  		  return <CreatePlaylistComponent nextStep={this.nextStep} videos={this.props}/>
  		case 2:
  		  return <ProgressComponent nextStep={this.nextStep} videos={this.props}/>
  	}
  }
});

module.exports = PlaylistsWrapper;