var userRoutes = require('./users-routes'),
 articleRoutes = require('./articles-routes');

module.exports = function (app, config, rootRef) {
  userRoutes(app, rootRef);
  articleRoutes(app, rootRef);
  
  app.get('/*', function(req, res){
    res.sendFile("index.html", {root:'./public'});
  });
};