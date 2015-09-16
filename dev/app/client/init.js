/** @jsx React.DOM */
"use strict";
(function(gapi){
  /** Bit of a hack at the moment but will have to keep polling
    until gapi is defined so I can work with google. Ideally I will have
    to have a global function as an entry point which can talk to the external
    script, but need to figure out the gulpify process. Maybe it is wrapping a
    function around it and hiding it from the global space**/
  var InitAuth = require('./controllers/initAuth');
    setTimeout(function(){
    if(gapi){
      console.log("in here?");
  	 var auth = new InitAuth();
  	 auth.googleApiClientReady();
    }
  }, 1000);

  var file;
  var $ = require('jquery');
  var React = require('react');
  var App = require('./hey');
  var PlaylistComponent = require('./PlaylistColView');

  $('#authorize').click(function(){
    var auth = new InitAuth();
    auth.handleAuthClick();
    console.log('clickity click');
  });


  $('#createPlaylist').click(function(e){
    e.preventDefault();
    var formData = new FormData($('form')[0]);
    $.ajax({
    	 type:'POST',
       data: formData,
       url: '/',
       cache: false,
       contentType: false,
       processData: false,
       success:function(response) {
        console.log('clicked');
        //var playlistAmount = Math.round((response.length / 200)); 	
        React.renderComponent(<App videos={response}/>, document.getElementById('example'));
        //createPlaylistViews(response);
        console.log(response);
        },
        error : function(err){
          console.log('error');
        }
	    });
  });
}(window.gapi));