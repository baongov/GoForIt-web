var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/promo', function(req, res, next) {
  res.render('promo', { title: 'Express' });
});

router.get('/go', function(req, res, next) {
  res.render('go', { title: 'Express' });
});

router.get('/gotogether', function(req, res, next) {
  res.render('go', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  res.render('Profile', { title: 'Profile' });
});

router.get('/chat', function(req, res){
  res.render('chat');
});

module.exports = router;
