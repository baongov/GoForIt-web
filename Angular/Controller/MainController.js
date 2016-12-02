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
      }
    });
  }
  $scope.updateGoingStatus = function(idDestination) {
    $http.post('/auth/updateGoingStatus', {params:{idDestination: idDestination}}).then(function(response){
      if (response.data.message != "success"){
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
        window.sessionStorage.setItem('user',response.data.user.displayName);
        $rootScope.imgsrc = response.data.user.photo
        console.log($rootScope.username);
      }
    });
    $http.get('/public/destinations').then(function(response)
    {
      $rootScope.listofdestination = response.data;
      console.log(  $rootScope.listofdestination )
    });
  }
});

main.controller("SocketCtrl", function ($scope, $rootScope, socket) {
  console.log('SocketCtrl');
  $scope.message = [];
  $scope.user2 = null;
  $scope.user1 = window.sessionStorage.getItem('user');
  console.log($scope.user1);
  if($scope.user1=='Ngo Bao'){
    $scope.user2 = 'Lu Kai';
  }
  socket.on('offlineMsg', function(data){
    console.log('offlineMsg');
    if(data){
      $scope.message = data.split(',');
      console.log($scope.message);
      $scope.$apply();
      var objDiv = document.getElementById("chatbody");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });

  socket.on('receiveMsg', function(data){
    console.log('receiveMsg');
    console.log(data);
    $scope.message.push(data);
    $scope.$apply();
    var objDiv = document.getElementById("chatbody");
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  $scope.sendMsg = function(){
    dataSend = {
      user1: $scope.user1,
      user2: $scope.user2,
      message: $scope.messageSend
    }
    socket.emit('chatMsg',dataSend);
    $scope.messageSend = '';
  }
  $scope.start = function(usr){
    $scope.user2 = usr;
    var data = {
      user1: $scope.user1,
      user2: $scope.user2
    }
    console.log(data);
    socket.emit('sendUserInfo',data);
    socket.emit('getOfflineMsg',data);
  }
});
