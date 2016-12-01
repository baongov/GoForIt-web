main.controller("MainController", function ($scope, $http, $location, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.username = null;
  $rootScope.photo = ''
  $scope.facebookLogin = function(){
    $location.path('/auth/facebook');
  }

  function checkLoginState(){

  }
  $scope.load = function () {
    $http.get('/auth/loginState').then(function(response)
    {
      $rootScope.authenticated = response.data.isLogin;
      if ($rootScope.authenticated == true){
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
