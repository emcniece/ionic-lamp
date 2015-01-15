angular.module('starter.services', [])


/*=========================================
=            Spark API Service            =
=========================================*/
.service('SparkAPI', function($localStorage, $http, $q, $ionicLoading){
  return {
    'apiUrl': 'https://api.spark.io/v1/',

    fetch: fetch
  };

  function fetch(path, account, params, template){

    delete $http.defaults.headers.common['Authorization'];
    if( typeof(account) !== 'undefined' && (account) ){
      var userEncoded = Base64.encode(account.email+':'+account.pass);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + userEncoded;
    }

    if( typeof(template) !== 'undefined'){
      template += " <i class='icon ion-loading-c'></i> ";
      $ionicLoading.show({ template: template + ""});
    }

    console.log( 'SparkAPI Send: ', path, params);

    var request = $http({
      method: 'GET',
      params: params,
      url: $localStorage.settings.sparkApiUrl + path
    });

    return( request.then(handleSuccess, handleError));

  } // fetch

  function handleSuccess(response, status){
    $ionicLoading.hide();
    console.log('SparkAPI success: ', response);
    return response.data;
  }

  function handleError(response){
    console.log('SparkAPI error: ', response);
    $ionicLoading.hide();
    if (! angular.isObject( response.data ) || !response.statusText) {
      return( $q.reject( "An unknown error occurred." ) );
    }

    // Otherwise, use expected error message.
    return( $q.reject( response.data.error_description || response.statusText ) );
  }


})


/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
