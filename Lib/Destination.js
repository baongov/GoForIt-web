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
    var query = connection.query("CREATE VIEW DestinationsView AS\
                                  SELECT *\
                                  FROM Destinations, (\
                                    SELECT idDestination, AVG(rate) AS rate\
                                    FROM UserDesRate\
                                    GROUP BY idDestination) as A\
                                  WHERE Destinations.id = A.idDestination;",
     function(err, result) {
       if(result)
       {
         var query2 = connection.query("DROP VIEW DestinationsView; SELECT * FROM DestinationsView;",
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
