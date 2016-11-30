main.controller("SocketCtrl", function ($scope, $rootScope, socket) {
  socket.on('offlineMsg', function(data){
    // Example data:
    // data = [{
    //   user:'A',
    //   message: []
    // }];
  });

  socket.on('receiveMsg', function(data){

  });

  $scope.sendMsg = function(){
    dataSend = {
      user: $rootScope.username,
      userReceive: $scope.userSId,
      message: $scope.message
    }
    socket.emit('chatMsg',dataSend);
  }
});
