angular.module('andelfire.controllers')
  .controller('KbCtrl', ['$scope', '$stateParams', '$rootScope', 'Refs', 'KbArticles', 'toastr', '$timeout', '$mdDialog', '$window', 'Swal',
    function($scope, $stateParams,$rootScope, Refs, KbArticles, toastr, $timeout, $mdDialog, $window, Swal) {

      $scope.articles = KbArticles.all();
      if ($stateParams.kbId) {
        $scope.articles.$loaded().then(function() {
          KbArticles.find($stateParams.kbId, function(data) {
            $scope.singleData = data;
            $scope.working = false; //loader scope
            $scope.article = data;
          });
        });
      }

      function is_valid_url(url) {
        return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
      }

      $scope.pushReference = [];
      $scope.spliceRefence = [];
      $scope.article = {};
      $scope.newRefUrl = function() {
        if (is_valid_url($scope.ref_Url)) {
          if ($scope.article.referenceUrls) {
            $scope.article.referenceUrls.push({
              refUrl: $scope.ref_Url
            });
          } else {
            $scope.pushReference.push({
              refUrl: $scope.ref_Url
            });
            $scope.article.referenceUrls = $scope.pushReference;
          }
          $scope.ref_Url = '';

        } else {
          toastr.error('Please Enter A valid Url');
        }
      };

      $scope.toggleList = function(index) {
        $scope.spliceRefence.push($scope.article.referenceUrls[index]);
        $scope.article.referenceUrls.splice(index, 1);
      };

      $('.ref-input').on('focus', function() {
        $('.ref-input').attr('placeholder', 'Type url in here');
      });

      $('.ref-input').keypress(function(e) {
        var key = e.which;
        if (key === 13) {
          $timeout(function() {
            $scope.newRefUrl();
            return false;

          });
        }
      });

      if ($rootScope.currentUser) {
        $scope.last_edited_obj = {
          by: $rootScope.currentUser.google.displayName,
          when: new Date().getTime()
        };
      }

      $scope.SaveKbArticle = function(article) {
        //save article details
        if (!article.push_key) {
          Swal.success(
            "You are about to create an Article",
            "Will you like to go ahead?",
            "Yes, create it!",
            false,
            function(isConfirmed) { //invoke firebase data syncs here
              if (isConfirmed) {
                $scope.push_key = Refs.kbAs.push(article, function(err) {
                  if (!err) {}
                });
                Refs.kbAs.child($scope.push_key.key()).update({
                  push_key: $scope.push_key.key(),
                  owner: $rootScope.activeUser.known_as,
                  referenceUrls: angular.copy($scope.pushReference),
                  picture: $rootScope.activeUser.picture,
                  last_edited: $scope.last_edited_obj,
                  uid: $rootScope.activeUser.uid,
                  timestamp: new Date().getTime()
                }, function(err) {
                  if (err) {
                    Swal.swal_error();
                  }
                });
                $window.location = '/kbarticle/' + $scope.push_key.key();
              }
            });
        } else {
          Swal.success(
            "You are about to edit this Article",
            "Will you like to go ahead?",
            "Yes, edit it!",
            false,
            function(isConfirmed) { //invoke firebase data syncs here
              if (isConfirmed) {
                Refs.kbAs.child($stateParams.kbId).update(article, function(err) {
                  if (!err) {
                    Refs.kbAs.child($stateParams.kbId).update({
                      timestamp: new Date().getTime(),
                      last_edited: $scope.last_edited_obj
                    });
                    swal({
                      title: 'Cool!!',
                      text: 'You have edited this article. Thank you',
                      type: 'success'
                    });
                  } else {
                    Swal.swal_error();
                  }
                });
              }
            });
        }
      };

      $scope.showDialog = showDialog;

      function showDialog($event) {
        var parentEl = angular.element(document.body);

        function DialogController(scope, $mdDialog) {

          scope.closeDialog = function() {
            $mdDialog.hide();
          };
        }
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          templateUrl: '/views/partials/referencePopup.html',
          bindToController: true,
          clickOutsideToClose: true,
          disableParentScroll: false,
          controller: DialogController
        });

      }

      $scope.like_counter = function() {
        KbArticles.updateLikes({
          uid: $rootScope.currentUser.uid
        }, function(err) {
          if (!err) {
            toastr.success('Successfully Liked');
          } else {
            toastr.error('An error occured sorry');
          }
        });
      };

      KbArticles.getArticleLikes($stateParams.kbId, function(data) {
        if (data) {
          _.forEach(data, function(val, key) {
            $scope.fetchLikeOnArticle = val.uid;
            $scope.length_val = _.toArray(data).length;
          });
        }
      });

      /* * * CONFIGURATION VARIABLES * * */
      var disqus_shortname = 'andeldigest';

      /* * * DON'T EDIT BELOW THIS LINE * * */
      (function() {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();

      $scope.tags = [];

    }
  ]);
