"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      getUserByUsename: function(username, callback){
        var query = {
          where: {
            username: username
          }
        };
        User.findOne(query).then(callback);
      }
      // associate: function(models){
      //   User.belongsToMany(models.Gateway, {through: 'UserGateways'});
      // }
    },
    tableName: 'user'
  });
  return User;
};
