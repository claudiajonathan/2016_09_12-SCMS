angular.module('app.controllers', ['app.services'])
    .controller('AppCtrl', function ($scope, $log, Settings) {
        $log.info('AppCtrl Sukses');
        $scope.settings = Settings;
    })
.controller('CuacaCtrl', function ($scope, $log, $ionicLoading, $ionicPlatform, $cordovaGeolocation, Location, Cuaca, Settings) {
    $log.info('CuacaCtrl Created');
  
    $ionicPlatform.ready(function () {
    if (Location.lat == 0) {
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          Location.lat = position.coords.latitude;
          Location.long = position.coords.longitude;
          getCuaca();
      }, function (err) {
          // error
        });
    }
  });
  
    $scope.haveData = false;
    $ionicLoading.show({
      template: 'Memuat...'
    });
 
    function getCuaca() {
      $scope.haveData = false;
      $ionicLoading.show({
        template: 'Memuat...'
      });
      Cuaca.getWeatherAtLocation(Location.lat, Location.long).then(function (resp) {
        $log.info(resp);
        $scope.current = resp.data.currently;
        $scope.highTemp = Math.ceil(resp.data.daily.data[0].temperatureMax);
        $scope.lowTemp = Math.floor(resp.data.daily.data[0].temperatureMin);
        $scope.currentTemp = Math.ceil($scope.current.temperature);
        $scope.haveData = true;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      }, function (error) {
        alert('Tidak dapat memuat data prakiraan cuaca terbaru.');
        $log.error(error);
      });
    }
 
    //getCuaca();
 
    $scope.doRefresh = function () {
      getCuaca(); 
    }
  
    $scope.$watch(function () {
      return Settings.units
    }, function (newVal, oldVal) {
      if (newVal !== oldVal) {
        getCuaca();
      }
    });
  });