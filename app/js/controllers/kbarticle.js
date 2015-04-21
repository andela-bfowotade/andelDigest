angular.module('andelfire.controllers')
  .controller('KbCtrl', ['$scope', '$stateParams', 'Users', '$rootScope', 'Refs', 'KbArticles', 'toastr', '$timeout',
    function($scope, $stateParams, Users, $rootScope, Refs, KbArticles, toastr, $timeout) {

      $scope.articles = KbArticles.all();
      if ($stateParams.kbId) {
        $scope.articles.$loaded().then(function() {
          KbArticles.find($stateParams.kbId, function(data) {
            $scope.singleData = data;
            $scope.article = data;
          });
        });
      };

      function is_valid_url(url) {
        return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
      }

      $scope.pushReference = [];
      $scope.spliceRefence = [];
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

      $scope.last_edited_obj = {
        by: $rootScope.activeUser.known_as,
        when: new Date().getTime()
      }

      $scope.SaveKbArticle = function(article) {
        //save article details
        if (!article) {
          $scope.push_key = Refs.kbAs.push(article, function(err) {
            if (!err) {}
          });

          Refs.kbAs.child($scope.push_key.key()).update({
            push_key: $scope.push_key.key(),
            referenceUrls: angular.copy($scope.pushReference),
            picture: $rootScope.activeUser.picture,
            last_edited: $scope.last_edited_obj,
            timestamp: new Date().getTime()
          }, function(err) {
            if (!err) {
              swal({
                title: 'Cool!!',
                text: 'Knowledge Article has been created. Thank you',
                type: 'success',
              });
            } else {
              swal({
                title: 'OOPS!!',
                text: 'An error occured, please try later or check your internet connection',
                type: 'error'
              });
            }
          });
        } else {
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
              swal({
                title: 'OOPS!!',
                text: 'An error occured, please try later or check your internet connection',
                type: 'error'
              });
            }
          });
        };
      };

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

    }
  ]);
