var express = require('express');
var nodejsx = require('node-jsx');
var multer = require('multer');
//var exphbs  = require('express-handlebars');


module.exports = function(app){
  var hbConfig = {
    layoutsDir: __dirname + "/../dev/app/views/layouts",
    defaultLayout: "main.html" 
  };
  nodejsx.install();
  app.set('view engine', 'html');
  app.engine('html', require('express-handlebars')(hbConfig));
  app.set("views", __dirname + "/../dev/app/views");
	
  app.use(express.static(__dirname + "/../build"));
  app.use(multer({dest: './uploads', rename: function (fieldname, filename) {
    return filename+Date.now();
  }}).single('uploaded-file'));
};