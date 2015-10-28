var React = require('react');
var ApplicationActions = require('../../actions/ApplicationActions');
var ApplicationStore = require('../../stores/ApplicationStore');

var getUploadState = function(){
  return {
    file: ApplicationStore.getFile(),
    validationError: ApplicationStore.getValidationError()
  };
};

var UploadPlaylistComponent = React.createClass({
  
  displayName: "uploadPlaylistComponent",

  visible: 0.5,

  enabled: undefined,

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
  },

  handleChange: function(event){
    if(event.target.files[0].type === 'text/html'){
      ApplicationActions.selectFile(event.target.files[0]);
      this.visible = 1;
      this.enabled = true;
    }else{
      this.enabled = undefined;
      this.visible = 0.5;
      ApplicationActions.fileValidationError();
    }
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
            <p className="error">{this.state.validationError}</p>
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <div className="col-half">
                <label htmlFor="file-upload" className="custom-file-upload">
			             Select File
                </label>
                <input id="file-upload" type="file" name="uploader" onChange={this.handleChange}/>
              </div>
              <div className="col-half">
                <button className="uploadBtn" type="submit" id="createPlaylist" disabled={!this.enabled} style={{opacity: this.visible}}>Upload</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  },
  _onChange: function(){
    if(!ApplicationStore.getCreateDivs()){
      this.setState(getUploadState());
    }else{
      this.componentWillUnmount();
    }
  }
});

module.exports = UploadPlaylistComponent;