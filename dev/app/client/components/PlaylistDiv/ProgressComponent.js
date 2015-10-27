var React = require('react');
var UploaderStore = require('./../../stores/UploaderStore');
var UploaderActions = require('./../../actions/UploaderActions');
var SuccessComponent = require('./SuccessComponent');
//RENAME THIS FILE
var getChangedState = function(ref){
  return{
    step: UploaderStore.getUploadStep(ref),
    count: UploaderStore.getUploadedCount(ref),
    url: UploaderStore.getPlaylistUrl(ref)
  }
}
var ProgressComponent = React.createClass({

  shouldComponentUpdate: function(){
    return true;
  },
  
  getInitialState: function() {
    return UploaderStore.setupUploadInfo(this.props.videos.names);
  },

  componentDidMount: function(){
    UploaderStore.addChangeListener(this._onChange);
    UploaderActions.uploadPlaylistToYoutube(this.props.videos.names, this.props.videos.data.vids , this.props.names);
  },
  
  render: function(){
    return (
      <div>
          {(() => {
            switch (this.state.step) {
            case "SUCCESS":
              return <SuccessComponent data={this.state.url}/>;
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
    if(param === this.props.videos.names){
      this.setState(getChangedState(this.props.videos.names));
    }
  }

});


module.exports = ProgressComponent;