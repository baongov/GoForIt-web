// make some function
var saveOfflineMsg = function(user,msg){

}

var setStatus = function(user){

}

var getOfflineMsg = function(user, callback){

}

var setUserSId = function(user, userSId){

}
// create function for on connection
module.exports = function(socket){
  var userSId = socket.id;
  var user = null;

  socket.on('sendUserInfo', function(data){
    user = data.user;
    setUserSId(user,userSId);
    getOfflineMsg(user, function(msg){
      if(msg){
        socket.to(userSId).emit('offlineMsg',msg);
      }
    });
  });

  socket.on('chatMsg', function(data){
    saveOfflineMsg(data);
  });

  socket.on('disconnect', function(){
    userSId = null;
    setUserSId(user,userSId);
  });
}
