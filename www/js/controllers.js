angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $http, $ionicLoading) {


    $scope.data = {
      'status': false,
      'brightness' : '0',

      // Core details
      'apiUrl': 'https://api.spark.io/v1/',
      'device': '53ff71066667574807372567',
      'name' : false,
      'acToken': '91a7db82bb5d95a1f76b4b30c163093a9fe84937'
    };

    $scope.onBrightnessChange = function(){

      $ionicLoading.show({
        template: 'Loading...'
      });

      $http({
          method: 'POST',
          url: $scope.data.apiUrl+"devices/" + $scope.data.device + "/adjustLamp",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {
              access_token: $scope.data.acToken,
              args: $scope.data.brightness
          }
        }).success(function (data) {
            console.log('Response success: ', data);

        }).finally(function(){

          $ionicLoading.hide();
        });

    }; // onBrightnessChange

    $scope.doRefresh = function() {

      // Check Brightness
       url = $scope.data.apiUrl + "devices/"+$scope.data.device+"/brightness?access_token="+$scope.data.acToken;
       $http.get( url )
       .success(function(data) {

         if( data.name){
          $scope.data.brightness = data.result;
         }

       });


      var url = $scope.data.apiUrl + "devices/"+$scope.data.device+"?access_token="+$scope.data.acToken;

      $http.get( url )
       .success(function(data) {

         if( data.name){
          $scope.data.name = data.name;
          $scope.data.status = data.connected;
         }

       })
       .finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
       });

       

    }; // doRefresh

})

.controller('CoresCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
