'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
main.factory('socket', function ($rootScope) {
  var socket = io.connect();
  socket.on('connect', function(){
    console.log('connected');
    // var data = {
    //   user1: $rootScope.username,
    //   user2: $scope.user2
    // }
    // socket.emit('sendUserInfo',data);
    // socket.emit('getOfflineMsg',data);
  });
  return socket;
});
