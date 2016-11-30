'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  socket.on('connect', function(){
    var data = {
      user: $rootScope.username
    }
    socket.emit('sendUserInfo',data);
  });
  return socket;
});
