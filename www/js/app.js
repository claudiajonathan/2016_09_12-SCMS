// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('jsconfuy', [
  'ionic', 
  'jsconfuy.controllers',
  'jsconfuy.directives',
  'ngMap',
  'ngRoute',
  'ngCordova'
  ])

.run(function($ionicPlatform) {
  // $ionicPlatform.ready(function() {
  //   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  //   // for form inputs)
  //   if (window.cordova && window.cordova.plugins.Keyboard) {
  //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //     cordova.plugins.Keyboard.disableScroll(true);

  //   }
  //   if (window.StatusBar) {
  //     // org.apache.cordova.statusbar required
  //     StatusBar.styleDefault();
  //   }
  // });

    // backgroundGeolocation.getLocations(
    //   function (locations) {
    //     console.log(locations);
    //   }
    // );
   $ionicPlatform.ready(function() {
      //  var callbackFn = function(location) {
      //   console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);

      //   // Do your HTTP request here to POST location to your server.
      //   // jQuery.post(url, JSON.stringify(location));

      //   /*
      //   IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      //   and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      //   IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      //   */
      //   backgroundGeolocation.finish();
      // };

      // var failureFn = function(error) {
      //   console.log('BackgroundGeolocation error');
      // };

      // // BackgroundGeolocation is highly configurable. See platform specific configuration options
      // backgroundGeolocation.configure(callbackFn, failureFn, {
      //     desiredAccuracy: 10,
      //     stationaryRadius: 20,
      //     distanceFilter: 30,
      //     interval: 60000
      // });

      // // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
      // backgroundGeolocation.start();

      // // If you wish to turn OFF background-tracking, call the #stop method.
      // // backgroundGeolocation.stop();



    // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal.init("d8fcc33a-0135-4644-bd98-2627003e7741",
                                 {googleProjectNumber: "1042941850403"},
                                 notificationOpenedCallback);
  
  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);
  });
})

.config(function($stateProvider, $urlRouterProvider,$routeProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.tab', {
    url: '/tab',
    views:{
      'menuContent':{
        templateUrl: 'templates/tabs.html',
      }
    }    
  })
  .state('app.tab.kecepatan',{
    url:'/kecepatan',
    views:{
      'kec':{
        templateUrl:'templates/kecepatan.html',
        controller: 'KecepatanCtrl'
      }
    }
  })
  .state('app.tab.alkohol',{
    url:'/alkohol',
    views: {
      'alkohol':{
        templateUrl:'templates/alkohol.html',
        controller:'AlkoholCtrl'
      }
    }
  })
  .state('app.tab.posisi',{
    url:'/posisi',
    views: {
      'posisi':{
        templateUrl:'templates/posisi.html',
        controller:'PosisiCtrl'
      }
    }
  })
$urlRouterProvider.otherwise('/app/tab/kecepatan');
});