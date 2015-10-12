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
	    <p>LOADING HERE</p>
	    <p> Successfully added {this.state.count} out of {this.state.total} videos</p>
	  </div>
	);
  },

  componentDidMount: function(){
  	var videos = this.props.videos.data.vids;
  	var playlistTitle = this.props.videos.data.playlistTitle;
	var self = this;
	var upload = new Uploader(playlistTitle);
	var counting = 0;
	//recursivly call the create addtoplaylist until all videos are processed
	//Note: Need to add better error handling.
	upload.createPlaylist().then(function(playlistId){
	  upload.addToPlaylist(videos[self.state.count], function callback(response){
	  	self.state.count = !response.error ? self.nextVideo() : self.state.count;
	  	console.log(self.state.count);
		if(counting < videos.length){
		  counting++;
		  upload.addToPlaylist(videos[counting], callback);
		}else{
		  return;
		}
	  });
	});
  },

  nextVideo: function(){
    this.setState({
  		count : this.state.count + 1
  	});
  }
});

module.exports = ProgressComponent;