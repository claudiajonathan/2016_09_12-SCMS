var db = null;
// var lat = 43.07493;
// var longi = -89.381388;

angular.module('jsconfuy.controllers', [])

.controller('AppCtrl', function($scope,$cordovaSQLite,Kirim) {
  console.log('AppCtrl')
  // function initialize() {
        
  // setInterval(function(){
  // Kirim.index().success(function(data){

  //     // $scope.users=data;
  //     console.log('kirim data');
  //     console.log(data)
  //   }).error(function(error){
  //     console.log(error)
  //   })
  //   },200)
  // db = window.sqlitePlugin.openDatabase({name: 'coba.db', location: 'default'}, function(q){
  //   q.transaction(function(tx){

  //   },function(err)
  //     console.log("Open database error : "+JSON.stringify(err));
  //   });
  // });
  // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS kec (km)");
})

// $scope.insert = db.executeSql("SELECT * FROM kec",[],function(resultSet){
//   console.log()
// })

.controller('SpeakersCtrl', function($scope) {

})

.controller('VenueCtrl', function($scope, $ionicLoading, $compile) {
  $scope.initialize = function() {
    try{
      var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
    console.log('ok');
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);


    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
  catch(err){
    console.log(err);
  }
  }
  //google.maps.event.addDomListener(window, 'load', initialize);

  
})

  // //map with venue position
  // $scope.position = {
  //   lat: -34.892589,
  //   lng: -56.194638
  // };

  // $scope.$on('mapInitialized', function(event, map) {
  //   $scope.map = map;
  // });
// })

.controller('AgendaCtrl', function($scope) {

})

.controller('EventCtrl', function($scope, $stateParams) {
  $scope.eventId = $stateParams.eventId;
 })

.controller('KecepatanCtrl',['$scope','AmbilKecepatan','Kirim','KirimKec',function($scope,AmbilKecepatan,Kirim,KirimKec){
  $scope.title='KECEPATAN';
  console.log('KECEPATAN')
  setInterval(function(){
      KirimKec.index().success(function(data){
      $scope.users=data;
      console.log('KirimKec');
      console.log(data)
    }).error(function(error){
      console.log(error)
    })
    },5000)

  // setInterval(function(){
  //     AmbilKecepatan.index().success(function(data){
  //     $scope.users=data;
  //     console.log('AmbilKecepatan');
  //     console.log(data)
  //   }).error(function(error){
  //     console.log(error)
  //   })
  //   },1000)

}])

.controller('AlkoholCtrl',['$scope','AmbilAlkohol','Notif',function($scope,AmbilAlkohol,Notif){
  $scope.title='KADAR ALKOHOL';
  $scope.alkohol=0;
  console.log('alkohol');
  // $scope.showAlertBerhasil = function() {
  //  var alertPopup = $ionicPopup.alert({
  //    title: 'Berhasil Luar',
  //    template: 'OK'
  //  });
  //   alertPopup.then(function(res) {
  //    console.log('Thank you for not eating my delicious ice cream cone');
  //  })
  // }


//   Notif.index().success(function(data){
//     console.log(data)
//     console.log('notif')
//   //   $scope.showAlertBerhasil = function() {
//   //  var alertPopup = $ionicPopup.alert({
//   //    title: 'Berhasil',
//   //    template: 'OK'
//   //  });
//   //  //  alertPopup.then(function(res) {
//   //  //   console.log('Thank you for not eating my delicious ice cream cone');
//   //  // })
//   // }
//   }).error(function(error){
//   //   $scope.showAlertGagal = function() {
//   //  var alertPopup = $ionicPopup.alert({
//   //    title: 'Gagal',
//   //    template: error
//   //  });
//   //   console.log(error)
//   // }
// })
// function initialize() {
        navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Pos app', pos);

          var lat = pos.coords.latitude;
          var longi = pos.coords.longitude;
          
          console.log(lat, longi)
          console.log('ini appp')

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
    // }
  setInterval(function(){
      AmbilAlkohol.index().success(function(data){
      $scope.users=data;
      console.log(lat,longi,'alkohol')
      if($scope.users.output.attribute.alkohol==3){
        Notif.index().success(function(data){

        }).error(function(error){
          
        })
        console.log('data==3')
      }
      console.log('ok');
      console.log(data)
    }).error(function(error){
      console.log(error)
    })
    },1000)
}])

.controller('PosisiCtrl',function($scope,$state,$cordovaGeolocation,$ionicLoading,NgMap) {

  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
  
  $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      function initialize() {
        navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Got pos', pos);

          // var lat = pos.coords.latitude;
          // var longi = pos.coords.longitude;
          
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

          console.log('ini map')

          // $scope.loading.hide();
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





//   console.log('ok')
//   var options = {timeout: 10000, enableHighAccuracy: true};
 
//   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
//     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
//     var mapOptions = {
//       center: latLng,
//       zoom: 15,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
 
//     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
//   }, function(error){
//     console.log("Could not get location");
//   });
//   //Wait until the map is loaded
// google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
//   var marker = new google.maps.Marker({
//       map: $scope.map,
//       animation: google.maps.Animation.DROP,
//       position: latLng
//   });      
 
//  });
// });


// //-------------------------------------------------------------------------------------//
//   console.log('tes')
//   NgMap.getMap().then(function(map) {
//     console.log(map.getCenter());
//     console.log('markers', map.markers);
//     console.log('shapes', map.shapes);
//   });

//   google.maps.event.addDomListener(window, 'load', function() {
//         var myLatlng = new google.maps.LatLng(-5.387612, 105.283628);
 
//         var mapOptions = {
//             center: myLatlng,
//             zoom: 16,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
 
//         var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
//         navigator.geolocation.getCurrentPosition(function(pos) {
//             map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//             var myLocation = new google.maps.Marker({
//                 position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
//                 map: map,
//                 title: "My Location"
//             });
//         });
 
//         $scope.map = map;
//         console.log('posisi')
//     });
})


.service('AmbilAlkohol',['$http',function($http){
  this.index=function(){
    // return $http.get('http://api.geeknesia.com/api/attribute/alkohol?api_key=5bded85a649741f55578c6dc39731be8');
    return $http.get('http://api.geeknesia.com/api/attribute/alkohol?api_key=59dc4d4f92f9f03fafe5d60493aeb369');
  }
}])

.service('AmbilKecepatan',['$http',function($http){
  this.index=function(){
    // return $http.get('http://api.geeknesia.com/api/attribute/alkohol?api_key=5bded85a649741f55578c6dc39731be8');
    // return $http.get('http://api.geeknesia.com/api/attribute/alkohol?api_key=5bded85a649741f55578c6dc39731be8');
    return $http.get('http://api.geeknesia.com/api/attribute/kec?api_key=6a0068c2007618209909b20d8ea5905b');
  }
}])

.service('Notif',['$http',function($http){
  this.index=function(){
    return $http({
      method: "POST",
      url: "https://onesignal.com/api/v1/notifications",
      data: {
        app_id: "d8fcc33a-0135-4644-bd98-2627003e7741",
        contents: {"en": "Coba Notif"},
        headings: {"en": "SCMS"},
        included_segments: ["All"]
      },
      headers: {
        'Authorization': 'Basic MWJhYjgwOTYtYTg1MC00ZWVlLWI1ZmUtNTMxZjUyZGM4ZGIy'
      }
    });
  }
}])
// angular.module('starter.controllers', [])

// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })

// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
.service('Kirim',['$http',function($http){
  var lat=1;
  var longi=1;
  this.index=function(){
    navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Pos app', pos);

          lat = pos.coords.latitude;
          longi = pos.coords.longitude;
          
          console.log(lat, longi)
          console.log('ini appp')

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
    console.log('http://api.geeknesia.com/api/data?api_key=59dc4d4f92f9f03fafe5d60493aeb369&attributes={"lat":'+lat+',"lon":'+longi+'}')
    // return $http.get('http://api.geeknesia.com/api/attribute/alkohol?api_key=5bded85a649741f55578c6dc39731be8');
    return $http.get('http://api.geeknesia.com/api/data?api_key=59dc4d4f92f9f03fafe5d60493aeb369&attributes={"lat":'+lat+',"lon":'+longi+'}');
  }
}])

.service('KirimKec',['$http',function($http){
  var latt1 = 1;
  var lonn1 = 1;
  var latt2 = 1;
  var lonn2 = 1;
  var lat = 0;
  var longi = 0;
  this.index=function(){
    latt1=lat;
    lonn1=longi;
    navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Pos app', pos);

          lat = pos.coords.latitude;
          longi = pos.coords.longitude;
          
          console.log(lat, longi)
          console.log('ini appp')

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
    
    function distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180
      var radlat2 = Math.PI * lat2/180
      var theta = lon1-lon2
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist
    }

    // document.writeln(distance(-5.3874768, 105.2842030, -5.3868367, 105.2834694, 'K'));

    var kec = distance(latt1, lonn1, lat, longi, 'K');
    console.log("sebelum kali 720 ",kec);
    kec = kec * 720;
    console.log("sesudah kali 720 ",kec);
    kec = Math.round(kec * 100) / 100;  
    // kec = kec.toString().replace(".", ",")
    console.log(kec);
    console.log("latt1: ",latt1);
    console.log("lonn1: ",lonn1);
    console.log("lat: ",lat);
    console.log("longi: ",longi);
    return $http.get('http://api.geeknesia.com/api/data?api_key=6a0068c2007618209909b20d8ea5905b&attributes={"lat":'+lat+',"lon":'+longi+',"kec":'+kec+'}');
  }
}])
function ganti() {
        var x = document.getElementById("txt_kec").value;
        console.log("Ganti: "+x);
        localStorage.setItem("x",x);
        // localStorage.getItem("x");
        //document.getElementById("demo").innerHTML = "You selected: " + x;
    }

function ambil(){
  // http://api.geeknesia.com/api/data?api_key=api_key&attributes=data
  // document.getElementById("cobaaja").value=(localStorage.getItem("x"));
  // console.log(localStorage.getItem("x"))
  Kirim.index().success(function(data){
      $scope.users=data;
      console.log('kirim');
      console.log(data)
    }).error(function(error){
      console.log(error)
    })
}


