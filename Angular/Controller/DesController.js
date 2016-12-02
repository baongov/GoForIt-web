main.controller("DesController", function ($scope, $http, $location, $rootScope) {
  $scope.idDestination = 2;
  $scope.load = function () {
    $http.post('/public/getDesInfo', {params:{idDestination: $scope.idDestination}}).then(function(response){
      $scope.desInfo = response.data;
      $scope.going = $scope.desInfo.going.split(',');

    });
  }
});
