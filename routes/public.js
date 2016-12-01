var express = require('express');
var Destination = require('../Lib/Destination');
var router = express.Router();

router.get('/destinations', function(req, res, next) {
  Destination.findAllDes(function(error, rows){
    res.send(rows);
  });
});

module.exports = router;
