/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./my_upload');
var playlistDivWrapper = React.createClass({
	
	handleClick: function(event) {
		var videos = this.props.data;
		var upload = new Uploader();
		//console.log(upload);
    	for(var i=0; i <= videos.length; i++){
    		(function(index){
    			setTimeout(function() {    
    			upload.addToPlaylist(videos[index]);
    				//console.log("the index is " + index);
            	//console.log(videos[y]);
  				}, i * 500);
    		})(i);
    	}
  	},

	render: function(){
		return <div>
			<h1>Enter playlist name below</h1>
			<p>Please make sure the playlist name does not exist</p>
			<input type="text" name="playlistName"></input>
			<button type ="button" onClick={this.handleClick}> Create! </button>
		</div>;
	}
});

var App = React.createClass({
	render: function () {
		var videos = this.props.videos;
		console.log(videos);
		return (
			<ol>
				{Object.keys(videos).map(function(val , index){
					if(val !== 'total'){
						return <playlistDivWrapper key={val} data={videos[val]}/>;
					}
				})}
			</ol>
		);
	}

});
module.exports = App;