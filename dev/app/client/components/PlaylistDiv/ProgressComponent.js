var React = require('react');
var Uploader = require('./../../controllers/Uploader');


var creatingPlaylist = function(title, videos) {
  var upload = new Uploader(title);
  var counting = 0;
 
   //recursivly call the create addtoplaylist until all videos are processed
   //Note: Need to add better error handling.
  upload.createPlaylist().then((playlistId) => {
    this.props.setPLID(playlistId);
    upload.addToPlaylist(videos[this.state.count], function callback(response){
      this.state.count = !response.error ? this.nextVideo() : this.state.count;
      if(counting < 5){
        counting++;
        upload.addToPlaylist(videos[counting], callback.bind(this));
      }else{
        this.props.nextStep();
        return;
      }
    }.bind(this));
  });
}

var ProgressComponent = React.createClass({
  
  getInitialState: function() {
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
    creatingPlaylist.call(this, this.props.videos.data.playlistTitle, this.props.videos.data.vids);
  },

  nextVideo: function(){
    this.setState({
      count : this.state.count + 1
    });
  }
});


module.exports = ProgressComponent;