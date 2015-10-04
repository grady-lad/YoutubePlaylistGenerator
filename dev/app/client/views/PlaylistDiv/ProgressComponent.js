/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./../../controllers/Uploader');

var ProgressComponent = React.createClass({
  
  getInitialState: function(){
    return {
      showing: true,
      count: 0,
      total: this.props.videos.data.total
  	};
  },
  
  render: function(){

    return (
	  <div>
	    <h1> Loding image here </h1>
	    <p> Successfully added {this.state.count} of {this.state.total}</p>
	  </div>
	);
  },

  componentDidMount: function(){
  	console.log(this.props);
  	var videos = this.props.videos.data.vids;
  	var playlistTitle = this.props.videos.data.playlistTitle;
	var self = this;
	var upload = new Uploader(playlistTitle);
	var counting = 0;
	//recursivly call the create addtoplaylist until all videos are processed
	//Note: Need to add better error handling.
	/**upload.createPlaylist().then(function(playlistId){ 
	  upload.addToPlaylist(videos[self.state.count], function callback(response){
	  	if(!response.error){
	  		self.setState({count: self.state.count + 1});
	  	}
		if(counting < videos.length){
		  counting++;
		  console.log(response);
		  upload.addToPlaylist(videos[self.state.count], callback);
		}else{
		  return;
		}
	  });
	});**/
  }
});

module.exports = ProgressComponent;