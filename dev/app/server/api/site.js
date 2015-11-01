var fileProcessor = require('../controllers/fileProcessor');
var fs = require('fs');

exports.home = function (req, res) {
  res.render("index" , {title: 'Home'});
};
	
exports.readBookmarks = function (req , res){
  var filePath = __dirname + "/../../../../" + req.file.path;
  fileProcessor.readFile(filePath).then(fileProcessor.inspectFile).then((data) => {
    console.log("in the then");
    res.send(data);
    fs.unlink(filePath); 
  }).catch(function(err){
    console.log("in the err");
    console.log(err);
    res.status(500).send({error: err});
    fs.unlink(filePath);
  }); 
};
