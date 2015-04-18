angular.module('andelfire.services')
  .factory('KbArticles', ['$firebase', 'Refs',
    function($firebase, Refs) {
      return {
        all: function(cb) {
          if(!cb) {
            return $firebase(Refs.kbAs).$asArray();
          }
          else {
            Refs.users.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(uid, cb) {
          if(!cb) {
            return $firebase(Refs.kbAs.child(uid)).$asObject();
          }
          else {
            Refs.kbAs.child(uid).once('value', function(snap) {
              cb(snap.val());
            });
          }
        }
      };
    }
  ]);
