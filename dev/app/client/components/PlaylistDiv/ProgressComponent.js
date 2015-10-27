var React = require('react');
var UploaderStore = require('./../../stores/UploaderStore');
var UploaderActions = require('./../../actions/UploaderActions');
var SuccessComponent = require('./SuccessComponent');
var ErrorComponent = require('./../Errors/PlaylistError');
//RENAME THIS FILE
var getChangedState = function(ref){
  return{
    step: UploaderStore.getUploadStep(ref),
    count: UploaderStore.getUploadedCount(ref),
    url: UploaderStore.getPlaylistUrl(ref),
    error: UploaderStore.getPlaylistError(ref)
  }
}
var ProgressComponent = React.createClass({

  shouldComponentUpdate: function(){
    return true;
  },
  
  getInitialState: function() {
    return UploaderStore.setupUploadInfo(this.props.videos.plId);
  },

  componentDidMount: function(){
    UploaderStore.addChangeListener(this._onChange);
    UploaderActions.uploadPlaylistToYoutube(this.props.videos.plId, this.props.videos.data.vids , this.props.playlistName);
  },
  
  render: function(){
    return (
      <div>
          {(() => {
            switch (this.state.step) {
            case "SUCCESS":
              return <SuccessComponent data={this.state.url}/>;
            case "ERROR":
              return <ErrorComponent error={this.state.error} plId={this.props.videos.plId}/>
            default:
              return(
                  <div>
                  <p>LOADING HERE</p>
                  <p> Successfully added {this.state.count} out of {this.props.videos.data.total} videos</p>
                  </div>
                ); 
            }
          })()} 
      </div>
	 );
  },

  _onChange: function(param){
    if(param === this.props.videos.plId){
      this.setState(getChangedState(this.props.videos.plId));
    }
  }

});


module.exports = ProgressComponent;