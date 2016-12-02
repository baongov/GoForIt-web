main.controller("MainController", function ($scope, $http, $location, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.username = null;
  $rootScope.photo = ''
  $scope.facebookLogin = function(){
    $location.path('/auth/facebook');
  }

  function getUsersInfo(listUsers, callback){
    $http.post('/public/getUsersInfo', {params:{listUsers: listUsers}}).then(function(response){
      if (response.data.message == "success"){
        console.log(response.data.users)
        callback(response.data.users);
      }
    });
  }
  $scope.rateDestination = function(rate, idDestination) {
    $http.get('/auth/rateDestination', {params:{rate:rate, idDestination: idDestination}}).then(function(response){
      if (response.data.message != "success"){
        window.alert(response.data.message);
      }
    });
  }
  $scope.updateGoingStatus = function(idDestination) {
    $http.post('/auth/updateGoingStatus', {params:{idDestination: idDestination}}).then(function(response){
      if (response.data.message != "success"){
        window.alert(response.data.message);
      }
    });
  }

  $scope.load = function () {
    $http.get('/auth/loginState').then(function(response)
    {
      $rootScope.authenticated = response.data.isLogin;
      if ($rootScope.authenticated == true){
        $scope.updateGoingStatus(3);
        $rootScope.username = response.data.user.displayName
        $rootScope.imgsrc = response.data.user.photo
      }
    });
    $http.get('/public/destinations').then(function(response)
    {
      $rootScope.listofdestination = response.data;
      console.log(  $rootScope.listofdestination )
    });
  }
});
