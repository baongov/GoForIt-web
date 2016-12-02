"use strict";

module.exports = function(sequelize, DataTypes) {
  var Msg = sequelize.define('Msg', {
    user1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    msg: {
      type: DataTypes.STRING,
      allowNull: true
    },
    offlineMsg: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      getOfflineMsg: function(user1, user2, callback){
        var query = {
          where: {
            user1: user1,
            user2: user2
          }
        };
        Msg.findOne(query).then(function(msg){
          if(msg) callback(msg);
          else {
            query = {
              where: {
                user1: user2,
                user2: user1
              }
            };
            Msg.findOne(query).then(function(msg){
              if(msg) callback(msg);
              else {
                var data = {
                  user1: user1,
                  user2: user2,
                }
                Msg.create(data);
                callback(data);
              }
            });
          }
        });
      },
      saveOfflineMsg: function(user1, user2, message){
        var query = {
          where: {
            user1: user1,
            user2: user2
          }
        };
        Msg.findOne(query).then(function(msg){
          if(msg){
            var newMsg = msg.offlineMsg + user2+':'+message+',';
            msg.offlineMsg = newMsg;
            msg.save();
          }
          else {
            query = {
              where: {
                user1: user2,
                user2: user1
              }
            };
            Msg.findOne(query).then(function(msg){
              if(msg){
                var newMsg = msg.offlineMsg + user2+':'+message+',';
                msg.offlineMsg = newMsg;
                msg.save();
              }
              else {
                var data = {
                  user1: user1,
                  user2: user2,
                  offlineMsg: user2+':'+message+','
                }
                Msg.create(data);
              }
            });
          }
        });
      }
      // associate: function(models){
      //   User.belongsToMany(models.Gateway, {through: 'UserGateways'});
      // }
    },
    tableName: 'msg'
  });
  return Msg;
};
