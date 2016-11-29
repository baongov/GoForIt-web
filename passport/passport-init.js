var User = require('../Lib/User.js');
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// load the auth variables
var configAuth = require('./auth');
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.displayName);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        User.findByFacebookID(user.idFacebook, function(err, user) {
            console.log('deserializing user:',user.displayName);
            done(err, user);
        });
    });


    passport.use('facebook', new FacebookStrategy({
      clientID: '338946946468487',
      clientSecret: '19d912703547fefe5064ad4b5621afec',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findByFacebookID(profile.id, function (err, user) {
        if (user == null){
          var post = {
            idFacebook: profile.id,
            displayName: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
            gender: profile.gender,
            address: null,
            age: null
          }
          User.addNewUser(post, function(result){
            if (result) {
              console.log(post.displayName + ' Registration succesful');
              User.findByFacebookID(profile.id, function(err, user){
                return cb(err, user);
              });
            }
            else {
              console.log('Error in Saving user: ' + username);
            }
          });
        }
        else {
          return cb(err, user);
        }
      });
    }
    ));

};
