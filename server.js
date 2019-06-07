var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    User = require('./models/user'),
    passport = require('passport'),
    passportConfig = require('./config/passport');

const app = express();
const session = require('express-session');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: 'xfsergezrgergerg',
  resave: false,
  saveUninitialized: true,
}));

var indexRoutes = require('./config/routes/index');

app.use('/', indexRoutes);

// Connect to DB
mongoose.connect('mongodb://localhost/testbdd',  { useNewUrlParser: true });
var db = mongoose.connection;
mongoose.set('useCreateIndex', true);





app.listen(3000, function() {
    console.log('connected on port 3000');
});
