// We will structure here a series of possible responses
// depending on the URL requested. As we travel through
// the pipeline we will perform needed actions using middleware
// functions. If a response is valid we will display the
// correct view and if not we will handle errors.
 
// This is our projects entry point. If you start the
// server by typing node expresstut.js and then open the
// browser at loclhost:3000 you'll get a 404 error if
// you haven't defined any routes
// Import the express module
var express = require('express');
 
var app = express();
 
// Block the header from containing information
// about the server
app.disable('x-powered-by');
 
// Set up Handlebars
// Create a directory named views and then another named layouts
// in it
// Define main.handlebars as the default layout
// Create these files in the views directory and define the
// HTML in them home.handlebars, about.handlebars,
// 404.handlebars and 500.handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
 
app.engine('handlebars', handlebars.engine);
 
app.set('view engine', 'handlebars');
 
// Required when using POST to parse encoded data
// npm install --save body-parser
app.use(require('body-parser').urlencoded({extended: true}));
 
// Formidable is required to accept file uploads
// npm install --save formidable
//var formidable = require('formidable');
 
// Import credentials which are used for secure cookies
// Install the cookie middleware
// npm install --save cookie-parser
var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));
 
// Defines the port to run on
app.set('port', process.env.PORT || 3000);
 
// Create a directory called public and then a directory
// named img inside of it and put your logo in there
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
 
  // Point at the home.handlebars view
  res.render('home');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});