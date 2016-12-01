main.controller("SocketCtrl", function ($scope, $rootScope, socket) {
  console.log('SocketCtrl');
  $scope.message = [];
  $scope.user2 = null;
  $scope.user1 = null;
  $rootScope.username= null;
  socket.on('offlineMsg', function(data){
    console.log('offlineMsg');
    if(data){
      $scope.message = data.split(',');
      console.log($scope.message);
      $scope.$apply();
    }
  });

  socket.on('receiveMsg', function(data){
    console.log('receiveMsg');
    console.log(data);
    $scope.message.push(data);
    $scope.$apply();
  });

  $scope.sendMsg = function(){
    dataSend = {
      user1: $scope.user1,
      user2: $scope.user2,
      message: $scope.messageSend
    }
    socket.emit('chatMsg',dataSend);
  }
  $scope.start = function(){
    $rootScope.username = $scope.user1;
    var data = {
      user1: $rootScope.username,
      user2: $scope.user2
    }
    socket.emit('sendUserInfo',data);
    socket.emit('getOfflineMsg',data);
  }
});
