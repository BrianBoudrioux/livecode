var express = require('express');
var router = express.Router();
var indexController = require('../../controllers/indexController');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

router.route('/')
    .get(indexController.home);
router.route('/login')
    .get(indexController.login)
    .post(indexController.login);
router.route('/signup')
    .get(indexController.signup)
    .post(indexController.signup);
router.route('/logout')
    .get(indexController.logout);
router.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
router.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

module.exports = router;
