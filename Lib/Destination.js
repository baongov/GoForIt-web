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
    var query = connection.query("DROP VIEW DestinationsView; "+
                                  "CREATE VIEW DestinationsView AS " +
                                  "SELECT * " +
                                  "FROM Destinations, (" +
                                  " SELECT idDestination, AVG(rate) AS rate, SUM(joined) AS joined, SUM(notify) AS notify " +
                                  " FROM UserDesInteract " +
                                  " GROUP BY idDestination) as A " +
                                  "WHERE Destinations.id = A.idDestination;",
     function(err, result) {
       if(1)
       {
         var query2 = connection.query("SELECT * FROM DestinationsView;",
         function(err, rows){
           connection.release();
           callback(null,rows);
         });
         console.log(query2.sql);
       }
       else {
         connection.release();
         callback('error', null);
       }
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
    console.log(query)
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
    console.log(query)
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
    console.log(query);
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
        connection.release();
    });
  });
}

exports.UpdateJoinedUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query2;
          if (rows.length == 0)
          {
            query2 = connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", joined = 1;", function(error, result){
              callback(null, result);
            });
          }
          else {
            query2 = connection.query("UPDATE UserDesInteract SET joined = 1 WHERE idUser = " + idUser + " , idDestination = " + idDestination + ";", function(error, result){
              callback(null, result);
            });
          }
        console.log(query2)
        connection.release();
    });
    console.log(query)
  });
}

exports.UpdateNotifyUser = function(idUser, idDestination, callback){
  pool.getConnection(function(err, connection) {
    var query = connection.query("SELECT * FROM UserDesInteract WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";",
      function(err, rows){
        var query2;
          if (rows.length == 0)
          {
            query2 = connection.query("INSERT INTO UserDesInteract SET idUser = " + idUser + " , idDestination = " + idDestination + ", notify = 1 ;", function(error, result){
              callback(null, result);
            });
          }
          else {
            var value; if (rows[0].notify == 1) value = 0; else value == 1;
            query2 = connection.query("UPDATE UserDesInteract SET notify = " + value + " WHERE idUser = " + idUser + " AND idDestination = " + idDestination + ";", function(error, result){
              callback(null, result);
            });
          }
        console.log(query2)
        connection.release();
    });
    console.log(query2)
  });
}
