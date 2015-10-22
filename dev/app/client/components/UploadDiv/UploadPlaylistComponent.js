var React = require('react');
var ApplicationActions = require('../../actions/ApplicationActions');
var ApplicationStore = require('../../stores/ApplicationStore');
var opacityValue = {
  val: {
    opacity: 0.5
  }
}
var getUploadState = function(){
  return {
    file: ApplicationStore.getFile(),
    buttonOpactiy: opacityValue.val
  };
}

var UploadPlaylistComponent = React.createClass({
  
  displayName: "uploadPlaylistComponent",

  getInitialState: function(){
    return getUploadState();
  },

  componentDidMount: function(){
    ApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(event){
    event.preventDefault();
    ApplicationActions.uploadPlaylistToServer();
    this.componentWillUnmount();
  },

  handleChange: function(event){
    ApplicationActions.selectFile(event.target.files[0]);
    //opacityValue.val.opacity = 1;
    //this.setState({buttonOpactiy: opacityValue.val});
  },

  render: function(){
    return (
      <section id="postAuth">
        <div id="uploadWrapper">
          <div className="bubble">
            <span> Create Playlists </span>
          </div>
          <div className="content">
            <p> This app creates youtube playlists from your bookmarked youtube videos </p>
            <p> In order to create a playlist you must export your bookmarks as a .html file</p>
            <p>Please refer <a href="#">here</a> on how to do so.</p>
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <div className="col-half">
                <label htmlFor="file-upload" className="custom-file-upload">
			             Select File
                </label>
                <input id="file-upload" type="file" name="uploader" onChange={this.handleChange}/>
              </div>
              <div className="col-half">
                <button className="uploadBtn" type="submit" id="createPlaylist" disabled={!this.state.file} style={this.state.buttonOpactiy}>Upload</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  },
  _onChange: function(){
    this.setState(getUploadState());
  }
});

module.exports = UploadPlaylistComponent;