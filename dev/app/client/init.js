/** @jsx React.DOM */



/** Bit of a hack at the moment but will have to keep polling
    until gapi is defined so I can work with google. Ideally I will have
    to have a global function as an entry point which can talk to the external
    script, but need to figure out the gulpify process. Maybe it is wrapping a
    function around it and hiding it from the global space**/
setTimeout(function(){
  if(gapi){
  	var InitAuth = require('./controllers/initAuth');
  	var auth = new InitAuth();
  	auth.googleApiClientReady();
  }
}, 1000);

$ = require('jquery');
var React = require('react');
var App = require('./hey');
var PlaylistComponent = require('./PlaylistColView');
console.log(App);
$('#createPlaylist').click(function(){
	$.ajax({
    	type:'POST',
        data:'hey',
        url: '/',
        cache: false,
        success:function(response) {
          var playlistAmount = Math.round((response.length / 200)); 	
          React.renderComponent(<App videos={response}/>, document.getElementById('example'));
        	createPlaylistViews(response);
        },
        error : function(err){
        	console.log('error');
        }
	});
});


function createPlaylistViews(videos){
   //React.renderComponent(<PlaylistComponent videos={videos}/>, document.getElementById('playlistContainer'));
}