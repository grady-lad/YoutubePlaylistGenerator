/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./my_upload');
var playlistDivWrapper = React.createClass({
	
	handleClick: function(event) {
		var videos = this.props.data;
		var count = 0;
		var upload = new Uploader(this.state.value);
		console.log("we are creating " + videos.length + " videos in this playlist");
		upload.createPlaylist().then(function(){
			/** @params 1st video, the array, counter**/	 
    		upload.addToPlaylist(videos[0] , videos , 0);	
		});
		
  	},

  	handleChange: function(event) {
    	this.setState({value: event.target.value});
  	},
  	/**
  	** //<input type="text" name="playlistName"></input>
			//<button type ="button" onClick={this.handleClick}> Create! </button>
  	**/
	render: function(){
		return <section className="playlistDiv">
			<h2> Enter a name for your Playlist</h2>
			<p>Please make sure the playlist name does not exist</p>
			<input type="text" name="plName" onChange={this.handleChange}/>
	 		<button type="submit" id="create" className="playlistButton" onClick={this.handleClick}>Create Playlist</button>
		</section>;
	}
});

var App = React.createClass({
	render: function () {
		var videos = this.props.videos;
		console.log(videos);
		return (
			<div>
				{Object.keys(videos).map(function(val , index){
					if(val !== 'total'){
						return <playlistDivWrapper key={val} data={videos[val]}/>;
					}
				})}
			</div>
		);
	}

});
module.exports = App;