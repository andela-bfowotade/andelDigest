angular.module('andelfire.services')
  .factory('Swal', ['Refs',
    function(Refs) {
      return {
        success: function(htitle, message, confirmText, closeConfirm, cb) {
          swal({ //swal alert takes a function callback
            title: htitle,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: confirmText,
            closeOnConfirm: closeConfirm,
            allowOutsideClick: false
          }, function(error) {
            if (!error) {
              cb();
            } else {
              cb(error);
            }
          });
        },
        swal_error: function() {
          swal({
            title: 'OOPS!!',
            text: 'An error occured, please try later or check your internet connection',
            type: 'error'
          });
        }
      };
    }
  ]);
