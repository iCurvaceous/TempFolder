//CONFIG---------------------------------------------------

var assert = require('assert');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var methodOverride = require("method-override");
var port = 5000;
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var {ensureAuthenticated} = require('./helpers/auth');

//Passportjs Config
//require('./config/passport')(passport);

//gets rid of warning for Mongoose
mongoose.Promise = global.Promise;

//connect to mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/gameentries",{
    useMonogoClienct:true
})
.then(function(){console.log("MongoDB Connected.")})
.catch(function(err){console.log(err)});

//sets up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//Functions needed to run body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup Express
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//---------------------------------------------------------


// MAIN ROUTES -----------------------------------------

//Route to index
router.get('/', ensureAuthenticated, function(req,res){
    res.render('index');
});

router.get('/home', function(req,res){
    res.render('home');
});

router.get('/about', function(req,res){
    res.render('about');
});

router.get('/account', function(req,res){
    res.render('account');
});

router.get('/register', function(req,res){
    res.render('register');
});

router.get('/forgotpass', function(req,res){
    res.render('forgotpass');
});

router.get('/report', function(req,res){
    res.render('report');
});

router.get('/tasks', function(req,res){
    res.render('tasks');
});

router.get('/admin', function(req,res){
    res.render('admin');
});

router.get('/contact', function(req,res){
    res.render('contact');
});

router.get('/help', function(req,res){
    res.render('help');
});

router.get('/project', function(req,res){
    res.render('project');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect();
});
//------------------------------------------------------


//routes for PATHS--------------------------------------

app.use('/', router);
//NOTE: To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(__dirname+'/views'));

//------------------------------------------------------


//ERROR HANDLER-----------------------------------------

//starts server
app.listen(port, function(){
    console.log("Server is running on Port " + port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  //--------------------------------------------------