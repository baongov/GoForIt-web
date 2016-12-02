var express = require('express');
var router = express.Router();
var Destination = require('../Lib/Destination');
var User = require('../Lib/User');

module.exports = function(passport){
  //sends successful login state back to view(angular)
	router.get('/success',function(req,res){
		res.send({state: 'success', user: req.user ? req.user: null});
	});

	//send failure login state back to view(angular)
	router.get('/failure',function(req,res){
		res.send({state: 'failure',user:null,message:"Invalid username or password"});
	});

	router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
	// handle the callback after facebook has authenticated the user
	router.get('/facebook/callback',
	     passport.authenticate('facebook', {
	         successRedirect : '/',
	         failureRedirect : '/'
	     }));
	router.get('/loginState', function(req, res){
		if (req.isAuthenticated())
			res.send({'isLogin':true, 'user': {'displayName': req.user.displayName, 'photo': req.user.photo}})
		else
			res.send({'isLogin':false})
	});

	router.get('/profile', function(req, res){

	});

	router.get('/rateDestination', isLoggedIn, function(req, res){
		var data = req.body.params;
		Destination.CheckRatedUser(req.user.id, data.idDestination, function(error, result){
			if(result){
				res.send({message:"You rated"});
			} else {
				res.send({message:"success"});
			}
		});
	});

	router.post('/updateGoingStatus', isLoggedIn, function(req, res){
		var data = req.body.params;
		Destination.UpdateNotifyUser(req.user.id, data.idDestination, function(error, result){
			if(result){
				res.send({message:"success"});
			} else {
				res.send({message:"false"});
			}
		});
	});
	function isLoggedIn(req, res, next) {

	     // if user is authenticated in the session, carry on
	     if (req.isAuthenticated())
	         return next();

	     // if they aren't redirect them to the home page
	     res.redirect('/');
	 }
  return router;
}
