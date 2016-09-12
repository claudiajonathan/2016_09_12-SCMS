angular.module('jsconfuy.directives', [])

.directive('map', function($ionicLoading) {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      
      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      function initialize() {
        navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Got pos', pos);
          console.log('directive')

          // var lat = pos.coords.latitude;
          // var longi = pos.coords.longitude;
          var lat = -5.3798715;
          var longi = 105.2800402;
          console.log(lat, longi)
          var mapOptions = {
            center: new google.maps.LatLng(lat, longi),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);
          
          var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(lat, longi),
                map: map,
                title: "My Location"
          });

          $ionicLoading.hide();

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
   
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});