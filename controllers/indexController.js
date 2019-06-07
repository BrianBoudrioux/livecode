var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    bcrypt = require('bcrypt');


module.exports.home = function(req, res)
{
    if (req.session.user || typeof req.session.passport != 'undefined')
        res.render('index.ejs', {});
    else
        return res.redirect('/login');
};

module.exports.logout = function(req, res)
{
    if (req.session.user)
        req.session.destroy();

    return res.redirect('/login');
}

module.exports.login = function(req, res)
{
    if (req.session.user)
        return res.redirect('/');
    if (req.method !== 'POST') res.render('login.ejs', {});
    else
    {
        if (req.body.email && req.body.password)
        {
            User.find({email: req.body.email}, function(err, user) {
                if (err) res.render('login.ejs', {error: err});
                else if (typeof user[0] == 'undefined') res.render('login.ejs', {error: "Cannot find a user with the specified email"});
                else {
                    bcrypt.compare(req.body.password, user[0].password).then(function(response) {
                        if (response) {
                            req.session.user = user;
                            return res.redirect('/');
                        }
                        else {
                            res.render('login.ejs', {error: "Mot de passe erroner"})
                        }
                    });
                }
            });
        }
        else
            res.render('login.ejs', {error: "You must specify a email and a password"})
    }
};

module.exports.signup = function(req, res)
{
    if (req.session.user)
        return res.redirect('/');
    if (req.method !== 'POST') res.render('signup.ejs', {});
    else
    {
        if (req.body.password === req.body.passwordConfirm)
        {
            User.create({email: req.body.email, password: req.body.password}, function(err, user) {
                if (err) res.render('signup.ejs', {error: err});
                else
                {
                    return res.redirect('/login');
                }
            });
        }
        else
            res.render('signup.ejs', {error: "wrong password"})
    }
};
