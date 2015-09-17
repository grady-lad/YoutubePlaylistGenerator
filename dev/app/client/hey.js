/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./my_upload');
var playlistDivWrapper = React.createClass({
	
	handleClick: function(event) {
		var videos = this.props.data;
		var upload = new Uploader(this.state.value);
		upload.createPlaylist();
		//console.log(upload);
    	/**for(var i=0; i <= videos.length; i++){
    		(function(index){
    			setTimeout(function() {    
    			upload.addToPlaylist(videos[index]);
    				//console.log("the index is " + index);
            	//console.log(videos[y]);
  				}, i * 500);
    		})(i);
    	}**/
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