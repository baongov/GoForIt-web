// make some function
var models = require('../models');
var saveOfflineMsg = function(user,msg){

}

var setStatus = function(user){

}

var getOfflineMsg = function(user, callback){

}

var setUserSId = function(username, userSId){
  console.log('setUserSId');
  console.log(userSId);
  models.User.getUserByUsename(username, function(user){
    console.log(user);
    user.sId = userSId;
    user.save();
  });
}
// create function for on connection
module.exports = function(socket){
  var userSId = socket.id;
  var user = null;

  socket.on('sendUserInfo', function(data){
    user = data.user1;
    console.log(user);
    setUserSId(user,userSId);
    // getOfflineMsg(user, function(msg){
    //   if(msg){
    //     socket.to(userSId).emit('offlineMsg',msg);
    //   }
    // });
  });

  socket.on('getOfflineMsg', function(data){
    console.log(data);
    models.Msg.getOfflineMsg(data.user1, data.user2, function(msg){
      if(msg.offlineMsg){
        socket.emit('offlineMsg',msg.offlineMsg);
      }
    });
  });

  socket.on('chatMsg', function(data){
    console.log(data);
    console.log(userSId);
    console.log(socket.id);
    models.Msg.saveOfflineMsg(data.user2, data.user1, data.message);
    socket.emit('receiveMsg', data.user1+':'+data.message);
    models.User.getUserByUsename(data.user2, function(user){
      console.log(user);
      if(user.sId){
        socket.to(user.sId).emit('receiveMsg', data.user1+':'+data.message);
      }
    });
  });

  socket.on('disconnect', function(){
    userSId = null;
    setUserSId(user,userSId);
  });
}
