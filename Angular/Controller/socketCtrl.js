main.controller("SocketCtrl", function ($scope, $rootScope, socket) {
  console.log('SocketCtrl');
  $scope.message = [];
  $scope.user2 = null;
  $scope.user1 = $rootScope.username;
  console.log($rootScope.username);
  if($rootScope.username=='Ngo Bao'){
    $scope.user2 = 'Lam Thiên';
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
    $rootScope.username = $scope.user1;
    var data = {
      user1: $rootScope.username,
      user2: $scope.user2
    }
    console.log(data);
    socket.emit('sendUserInfo',data);
    socket.emit('getOfflineMsg',data);
  }
});
