angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $http) {


	$scope.data = { 'brightness' : '5' };
	var timeoutId = null;

	$scope.$watch('data.brightness', function() {


        if(timeoutId !== null) return;

        // Not going to ignore this one
        timeoutId = $timeout( function() {

            $timeout.cancel(timeoutId);
            timeoutId = null;

            // Now load data from server
            $http({
			    method: 'POST',
			    url: "https://api.spark.io/v1/devices/53ff71066667574807372567/adjustLamp",
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    console.log('jsoin: ', str, str.join("&"));
			        return str.join("&");
			    },
			    data: {
			    	access_token: "91a7db82bb5d95a1f76b4b30c163093a9fe84937",
			    	args: $scope.data.brightness
			    }
			}).success(function (data) {
				console.log('Response success: ', data);

			});



        }, 1000);


    });

})

.controller('CoresCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
