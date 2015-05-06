var articleRoutes = require('./articles-routes');

module.exports = function (app, config, rootRef) {
  articleRoutes(app, rootRef);
  
  app.get('/*', function(req, res){
    res.sendFile("index.html", {root:'./public'});
  });
};