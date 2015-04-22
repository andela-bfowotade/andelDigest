angular.module('andelfire.services')
  .factory('KbArticles', ['$firebase', 'Refs', '$stateParams',
    function($firebase, Refs, $stateParams) {
      return {
        all: function(cb) {
          if (!cb) {
            return $firebase(Refs.kbAs).$asArray();
          } else {
            Refs.users.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(uid, cb) {
          if (!cb) {
            return $firebase(Refs.kbAs.child(uid)).$asObject();
          } else {
            Refs.kbAs.child(uid).once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        updateLikes: function(getCounts, cb) {
          Refs.kbAs.child($stateParams.kbId).child('likes').push(getCounts, function(error) {
            if (error) {
              cb(error);
            } else {
              cb();
            }
          });
        },
        getArticleLikes: function(kbId, cb) {
          if(!cb) {
            return $firebase(Refs.kbAs.child($stateParams.kbId)).$asObject();
          } else {
            Refs.kbAs.child($stateParams.kbId).child('likes').on('value', function(snap) {
              cb(snap.val());
            });
          }
        }
      }
  }]);
