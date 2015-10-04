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
  	 var auth = new InitAuth();
  	 auth.googleApiClientReady();
    }
  }, 1000);

  var file;
  var $ = require('jquery');
  var React = require('react');
  var PlaylistDiv = require('./views/PlaylistDiv/PlaylistDiv');

  $('#authorize').click(function(){
    var auth = new InitAuth();
    auth.handleAuthClick();
  });

  var fileUpload = document.getElementById('file-upload');
  var wrap = document.getElementById('wrap');
  fileUpload.onclick = function(){
    //Rest the value on every click
    this.value = null;
  }
  fileUpload.onchange = function(){
    var name = this.value;
    var filename = name.replace(/^.*\\/, "");
    //change this to id
    var inner = document.getElementsByClassName('custom-file-upload')[0];
    inner.innerHTML = filename;
    document.getElementById('createPlaylist').disabled = false;
    document.getElementById('createPlaylist').style.opacity = 1;
  }
  //No need for JQuery here, change this towards the end
  $('#createPlaylist').click(function(e){
    e.preventDefault();
    console.log($('form')[0]);
    var formData = new FormData();
    var input = document.getElementById('file-upload');
    formData.append("uploaded-file" , input.files[0]);
    $.ajax({
    	 type:'POST',
       data: formData,
       url: '/',
       cache: false,
       contentType: false,
       processData: false,
       success:function(response) {	
        //testy(response);
        //for now
        $('#wrap').hide();
        console.log("here?");
        React.renderComponent(<PlaylistDiv videos={response}/>, document.getElementById('playlistContainer'));
       },
       error : function(err){
          console.log('error');
       }
	    });
  });

  function testy(res){
   var obj = Object.keys(res).reduce(function(val, index){
    console.log(index);
   }, {})
   
  }
}(window.gapi));