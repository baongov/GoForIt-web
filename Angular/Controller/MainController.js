main.controller("MainController", function ($scope, $http, $location) {
  $scope.authenticated = false;

  $scope.facebookLogin = function(){
    $location.path('/auth/facebook');
  }

  function checkLoginState(){

  }
  $scope.load = function () {
    $http.get('/auth/loginState').then(function(response)
    {
      $scope.authenticated = response.data.isLogin;
    });
  }
});
