var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'GOFORITDB'
});

exports.findById = function(id, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query( "SELECT * FROM Users WHERE id = '" + id + "'", function(err, rows) {
       connection.release();
       callback(null,rows[0]);
     });
    console.log(query.sql);
  });
}

exports.findAllDes = function(callback){
  pool.getConnection(function(err, connection) {
     var query = connection.query("SELECT * FROM DestinationsView;", function(err, rows){
       connection.release();
       callback(null,rows);
     });
     console.log(query.sql)
  });
}

exports.CheckJoinedUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + " ;",
      function(err, rows){
        connection.release();
        if (rows.length != 0 && rows[0].joined == 1)
          callback(null, true);
        else {
          callback(null, false);
        }
    });
    console.log(query.sql)
  });
}

exports.CheckRatedUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        connection.release();
        if (rows.length != 0 && rows[0].rate != 0)
          callback(null, true);
        else {
          callback(null, false);
        }
    });
    console.log(query.sql)
  });
}

exports.CheckNotifyUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        connection.release();
        if (rows.length != 0 && rows[0].notify == 1)
          callback(null, true);
        else {
          callback(null, false);
        }
    });
    console.log(query.sql);
  });
}

exports.UpdateRateUser = function(idUser, idDestination, rate, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query2;
          if (rows.length == 0)
          {
            query2 = connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", rate = " + value + ";",
            function(error, result){
              callback(null, result);
            });
          }
          else {
            query2 = connection.query("UPDATE UserDesInteract SET rate = " + value + " WHERE idUser = " + idUser + " , idDestination = " + idDestination + ";",
            function(error, result){
              callback(null, result);
            });
          }
        console.log(query2);
        connection.release();
    });
    console.log(query);
  });
}

exports.UpdateJoinedUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query2;
          if (rows.length == 0)
          {
            query2 = connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", joined = 1, notify = 1;", function(error, result){
              callback(null, result);
            });
          }
          else {
            query2 = connection.query("UPDATE UserDesInteract SET joined = 1 WHERE idUser = " + idUser + " , idDestination = " + idDestination + ";", function(error, result){
              callback(null, result);
            });
          }
        console.log(query2.sql)
        connection.release();
    });
    console.log(query.sql)
  });
}

exports.UpdateNotifyUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query2;
          if (rows.length != 0) {
            console.log(rows[0]);
            var value; if (rows[0].notify != 1) value = 1; else value = 0;
            /*query2 = connection.query("UPDATE UserDesInteract SET notify = " + value + " WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";", function(error, result){
              callback(null, value);
            });*/
          } else {
            query2 = connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", joined = 1, notify = 1 ;", function(error, result){
              callback(null, result);
            });
          }
        console.log(query2.sql)
        connection.release();
    });
    console.log(query.sql)
  });
}

exports.CheckNotifyUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        connection.release();
        if (rows.length != 0 && rows[0].notify == 1)
          callback(null, true);
        else {
          callback(null, false);
        }
    });
    console.log(query.sql);
  });
}

exports.findNotifyUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        connection.release();
        if (rows.length != 0 && rows[0].notify == 1)
          callback(null, true);
        else {
          callback(null, false);
        }
    });
    console.log(query.sql);
  });
}
