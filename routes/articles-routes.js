var async = require('async'),
  Firebase = require('firebase');

module.exports = function(app, rootRef) {
  var kbAsRef = rootRef.child('articles');
  app.get('/api/v1/articles', function(req, res) {
    kbAsRef.once('value', function(snap) {
      var articles = snap.val();
      var result = [];
      if (articles) {
        async.each(Object.keys(articles), function(articleId, cb) {
          var article = {
            uid: articleId,
            push_key: articles[articleId].push_key,
            timestamp: articles[articleId].timestamp,
            article: articles[articleId].article
          };
          result.push(article);
          cb();
        }, function(err) {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json(result);
        });
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.get('/api/v1/articles/:id', function(req, res) {
    var articleId = req.params.id;
    if (articleId) {
      kbAsRef.child(articleId).once('value', function(snap) {
        if (snap.val()) {
          var article = {
            uid: articleId,
            push_key: snap.val().push_key,
            timestamp: snap.val().timestamp,
            article: snap.val().article
          };
          res.status(200).json(article);
        } else {
          res.status(404).json({
            error: 'No article found at node `' + articleId + '`'
          });
        }
      });
    } else {
      res.status(400).json({
        error: 'No article Id was passed'
      });
    }
  });
};
