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
    var query = connection.query("DROP VIEW DestinationsView; \
                                  CREATE VIEW DestinationsView AS\
                                  SELECT *\
                                  FROM Destinations, (\
                                    SELECT idDestination, AVG(rate) AS rate, SUM(joined) AS joined, SUM(notify) AS notify\
                                    FROM UserDesInteract\
                                    GROUP BY idDestination) as A\
                                  WHERE Destinations.id = A.idDestination;",
     function(err, result) {
       if(result)
       {
         var query2 = connection.query("SELECT * FROM DestinationsView;",
         function(err, rows){
           connection.release();
           callback(null,rows);
         });
       }
       else {
         connection.release();
         callback('error', null);
       }
     });
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
  });
}

exports.UpdateRateUser = function(idUser, idDestination, rate, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query =
          if (rows.length == 0)
          {
            connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", rate = " + value + ";", funtion(error, result){
              callback(null, result);
            });
          }
          else {
            connection.query("UPDATE UserDesInteract SET rate = " + value + " WHERE idUser = " + idUser + " , idDestination = " + idDestination + ";", funtion(error, result){
              callback(null, result);
            });
          }
        connection.release();
        }
    });
  });
}

exports.UpdateJoinedUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query =
          if (rows.length == 0)
          {
            connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", joined = 1;", funtion(error, result){
              callback(null, result);
            });
          }
          else {
            connection.query("UPDATE UserDesInteract SET joined = 1 WHERE idUser = " + idUser + " , idDestination = " + idDestination + ";", funtion(error, result){
              callback(null, result);
            });
          }
        connection.release();
        }
    });
  });
}

exports.UpdateNotifyUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query =
          if (rows.length == 0)
          {
            connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", notify = 1 ;", funtion(error, result){
              callback(null, result);
            });
          }
          else {
            var value = if (rows[0].notify == 1) 0 else 1
            connection.query("UPDATE UserDesInteract SET notify = " + value + " WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";", funtion(error, result){
              callback(null, result);
            });
          }
        connection.release();
        }
    });
  });
}
