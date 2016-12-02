var express = require('express');
var Destination = require('../Lib/Destination');
var User = require('../Lib/User');
var router = express.Router();

router.get('/destinations', function(req, res, next) {
  Destination.findAllDes(function(error, rows){
    res.send(rows);
  });
});

router.post('/getUsersInfo', function(req, res, next) {
  var listUsers = req.body.params.listUsers;
  console.log(listUsers)
  User.getUsersInfo(listUsers, function(error, rows){
    res.send({message:"success", users:rows});
  });
});

router.post('/getDesInfo', function(req, res, next) {
  console.log(req.body.params.idDestination);
  Destination.findById(req.body.params.idDestination ,function(error, rows){
    console.log(rows)
    res.send(rows);
  });
});

module.exports = router;
