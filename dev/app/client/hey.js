/** @jsx React.DOM */
var React = require('react');
var Uploader = require('./my_upload');

var playlistDivWrapper = React.createClass({
	
	getInitialState: function(){
		return {showing: true, count: 0, loading: false};
	},

	handleClick: function(event) {
		var videos = this.props.data.vids;
		console.log(this.props.data.vids);
		var self = this;
		var count = 0;
		var upload = new Uploader(this.state.value);
		this.setState({showing: false});
		/**upload.createPlaylist().then(function(playlistId){ 
    		upload.addToPlaylist.call(self ,videos[0] , videos , playlistId, upload);	
		});**/
		
  	},

  	handleChange: function(event) {
    	this.setState({value: event.target.value});
    	this.setState({loading: true})
  	},
  	
	render: function(){
		return ( 
			this.state.showing
			? <div className="createDiv">
			   	<h2> Enter a name for your Playlist</h2>
				<p>Please make sure the playlist name does not exist</p>
				<input type="text" name="plName" onChange={this.handleChange}/>
	 			<button type="submit" id="create" className="playlistButton" onClick={this.handleClick}>Create Playlist</button>
				</div>
			: null
		);
	}
	/**<div className="playlistLoader">
	<p> Successfully created {this.state.count} of {this.props.data.total} videos</p>
	</div> **/
});

var App = React.createClass({
	render: function () {
		var videos = this.props.videos;
		return (
			<div>
				<section className="playlistDiv" key={val}>
				{Object.keys(videos).map(function(val , index){
					return (
						<playlistDivWrapper key={val} data={videos[val]}/>
					);
				})}
				</section>
			</div>
		);
	}

});


var status = React.createClass({
	render: function(){
		return (
			<div>
				<p> We will display the status</p>
			</div>
		);
	}
})
module.exports = App;