var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose'),
    User = mongoose.model('User');

passport.use(new FacebookStrategy({
     clientID: 'nope',
     clientSecret: 'ehehe',
     callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
         User.findOrCreate(profile, function(err, user) {
             if (err) { return done(err); }

             done(null, user);
         });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
