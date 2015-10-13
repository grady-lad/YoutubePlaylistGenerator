"use strict";
(function(gapi){
  /** Need to add some polling fucntionality that checks that the google api
      function is loaded, but this is IEFF. **/
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
  var ReactDOM = require('react-dom');
  var PlaylistDiv = require('./views/PlaylistDiv/PlaylistDiv');
  
  $('#authorize').click(function(){
    var auth = new InitAuth();
    auth.handleAuthClick();
  });

  var fileUpload = document.getElementById('file-upload');
  var wrap = document.getElementById('wrap');
  fileUpload.onclick = function(){
    //Reset the value on every click
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
        $('#wrap').hide();
        ReactDOM.render(<PlaylistDiv videos={response}/>, document.getElementById('playlistContainer'));
       },
       error : function(err){
          console.log('error');
       }
	    });
  });

}(window.gapi));