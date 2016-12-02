var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'GOFORITDB'
});

exports.findByFacebookID = function(idFacebook, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE idFacebook = '" + idFacebook + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
     console.log(query.sql);
  });
}

exports.findById = function(id, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE id = '" + id + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
    console.log(query.sql);
  });
}

exports.addNewUser = function(post , callback){
  pool.getConnection(function(err, connection) {
    //Check whether added user exists

    //Return error for exist user

    //Add new user into database

    var query = connection.query('INSERT INTO Users SET ?', post, function(err, result) {
       connection.release();
       callback(result);
     });
    console.log(query.sql);
  });
}

exports.getUsersInfo = function(users, callback){
  pool.getConnection(function(err, connection) {
    console.log("users: " + users)
    var query = connection.query("SELECT * FROM UserPublicView WHERE id IN (" + users.toString()+ ");", function(err, rows){
      connection.release();
      callback(null, rows);
    });
    console.log(query.sql)
  });
}
