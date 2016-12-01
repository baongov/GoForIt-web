var express = require('express');
var router = express.Router();

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

	function isLoggedIn(req, res, next) {

	     // if user is authenticated in the session, carry on
	     if (req.isAuthenticated())
	         return next();

	     // if they aren't redirect them to the home page
	     res.redirect('/');
	 }
  return router;
}
