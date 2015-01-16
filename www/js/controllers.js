angular.module('starter.controllers', ['ngStorage'])

.controller('DashCtrl', function($scope, $localStorage, $timeout, $http, $ionicLoading, Lamp) {


    $scope.data = {
      'status': false,
      'brightness' : '0',

      // Core details
      //'apiUrl': 'https://api.spark.io/v1/',
      //'device': '53ff71066667574807372567',
      'name' : false,
      //'acToken': '91a7db82bb5d95a1f76b4b30c163093a9fe84937'
    };

    $scope.onBrightnessChange = function(){

      Lamp.setBrightness($scope.data.brightness);

    }; // onBrightnessChange

    $scope.doRefresh = function() {

      // Check Brightness
      Lamp.getStatus()
        .success(function(data) {

          if( data.name){
            $scope.data.name = data.name;
            $scope.data.status = data.connected;
          }

          return false;

        }); // getStatus

      Lamp.getBrightness()
        .success(function(data){

          if( data.name){
            $scope.data.brightness = data.result;
          }

        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });



    }; // doRefresh

    $scope.toggleLamp = function(){
      var newLevel = 0;
      if( $scope.data.brightness === 0){
        newLevel = 255;
      }

      $scope.data.brightness = Lamp.setBrightness(newLevel);

      return newLevel;

    }; // toggleLamp

})

.controller('CoresCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
