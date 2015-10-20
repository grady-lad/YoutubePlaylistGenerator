var React = require('react');
var formData = new FormData();
var UploadActions = require('../../actions/UploadActions');
var PlaylistStore = require('../../stores/PlaylistStore');
var getUploadState = function(){
  return {
    file: PlaylistStore.getFile()
  };
}

var UploadPlaylistComponent = React.createClass({
  
  getInitialState: function(){
    return getUploadState();
  },

  componentDidMount: function(){
    PlaylistStore.addChangeListener(this._onChange);
  },

  handleClick: function(){
    UploadActions.uploadPlaylistToServer(formData);
  },

  handleChange: function(event){
    formData.append("uploaded-file" , event.target.files[0]);
    this.setState({file : formData});
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
            <form encType="multipart/form-data">
              <div className="col-half">
                <label htmlFor="file-upload" className="custom-file-upload">
			             Select File
                </label>
                <input id="file-upload" type="file" name="uploader" onChange={this.handleChange}/>
              </div>
              <div className="col-half">
                <button className="uploadBtn" onClick={this.handleClick} type="submit" id="createPlaylist" disabled={!this.state.file}>Upload</button>
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