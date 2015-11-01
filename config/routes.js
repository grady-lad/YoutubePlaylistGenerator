var site = require('../dev/app/server/api/site');


module.exports = function(app){
  app.get("/" , site.home);
  app.post("/", site.readBookmarks);
};