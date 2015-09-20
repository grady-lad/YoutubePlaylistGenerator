/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./../../controllers/Uploader');
var CreatePlaylistComponent = require('./CreatePlaylistComponent');
var ProgressComponent = require('./ProgressComponent');


var PlaylistsWrapper = React.createClass({


  //Used to create inital variables for our view
  getInitialState: function(){
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
  	console.log(this.props);
  	switch (this.state.step) {
  		case 1: 
  		  return <CreatePlaylistComponent nextStep={this.nextStep}/>
  		case 2:
  		  return <ProgressComponent/>
  	}
  }
  /** Need to move this into the progress component
  handleClick: function(event) {
    var videos = this.props.data.vids;
	var self = this;
	var upload = new Uploader(this.state.value);
	var counting = 0;
	//recursivly call the create addtoplaylist until all videos are processed
	//Note: Need to add better error handling.
	upload.createPlaylist().then(function(playlistId){ 
	  upload.addToPlaylist(videos[self.state.count], function callback(response){

	  	if(!response.error){
	  		self.setState({count: self.state.count + 1});
	  	}
		if(counting < videos.length){
		  counting++;
		  upload.addToPlaylist(videos[self.state.count], callback);
		}else{
		  return;
		}
	  });
	});
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  	
  //render: function(){
    //return ( 
	  //this.state.showing
	    //? <div className="createDiv">
		  //  <h2> Enter a name for your Playlist</h2>
			//<p>Please make sure the playlist name does not exist</p>
			//<input type="text" name="plName" onChange={this.handleChange}/>
	 		//<button type="submit" id="create" className="playlistButton" onClick={this.handleClick}>Create Playlist</button>
		  //</div>
		//: null
	//);
  //}**/
});



module.exports = PlaylistsWrapper;