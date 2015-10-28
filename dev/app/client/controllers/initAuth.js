/*global gapi*/

"use strict";
var Auth ={
  
  authorized: false,

  getAuthorized : function(){
    return this.authorized;
  },

  getClientID: function(){
    return '331947551227-0u2kbgm1kdt0tm4vgefhsoecrrodid2g.apps.googleusercontent.com';
  },

  getOAUTH2_SCOPES: function(){
    return 'https://www.googleapis.com/auth/youtube';
  },

  setAuthorized: function(authResult){
    this.authorized = authResult;
  },

  googleApiClientReady: function(){
    return new Promise((resolve) => {
      gapi.auth.init(() => {
        this.checkAuth().then(function(result){
          resolve(result);
        });
      });
    });
  },

  checkAuth: function(){
    return new Promise((resolve) => {
      gapi.auth.authorize({
        client_id: this.getClientID(),
        scope: this.getOAUTH2_SCOPES(),
        immediate: true
      },
      (token) => {
        if (token.access_token) {
          this.loadAPIClientInterfaces().then((result) => {
            resolve(result);
          });
        }else{
          resolve(this.authorized);
        }  
      });
    });
  },

  loadAPIClientInterfaces: function() {
    return new Promise((resolve) => {
      gapi.client.load('youtube', 'v3',() => {
        this.setAuthorized(true);
        resolve(this.authorized);
      });
    });
  },

  handleAuthClick: function(){
    return new Promise((resolve, reject) =>{
      gapi.auth.authorize({
        client_id: this.getClientID(),
        scope: this.getOAUTH2_SCOPES(),
        immediate: false } ,(token) => {
          if (token.access_token) {
            this.loadAPIClientInterfaces().then(function(result){
              resolve(result);
            });
          }
        });
    });
  }
};

module.exports = Auth;