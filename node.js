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

var Client = require('node-rest-client').Client;
 
var http=require("http");
var https=require("https");
var querystring=require("querystring");
var fs=require('fs');
 
var app = express();
 
// Block the header from containing information
// about the server

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

// Defines the port to run on
app.set('port', process.env.PORT || 3000);
 
// Create a directory called public and then a directory
// named img inside of it and put your logo in there
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
  next();
});


app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
 

 
// Catches the error and logs it and then continues
// down the pipeline
app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

var answers=[];
var question_no=0;
var questions=[
  {question:"What kind of drinker are you?",answers:["Total light weight", "Average", "Heavy weight"]},
   {question:"Do you have a hackathon tomorrow?",answers:["Yes, I make good life choices", "No, what am I? A nerd?", "What's a hackathon?"]},
   {question:"Did you eat before you went out?",answers:["A whole pizza", "Mate I'm eating right now", "No, I like hangovers, and lack all common sense"]},
   {question:"What time do you have to be up?",answers:["Earlier than 9am", "Midday/whenever the world stops spinning", "Structure is capitalism. Viva la resistance"]},
   {question:"How much have you drunk already?",answers:["0-2 pints", "£20 worth, London you heartless b'std", "I've lost the ability to count."]},
   {question:"How epic is this night?",answers:["Mate I'm telling my grandchildren about it", "Alright but I'll pretend it was a good night, and give my friends FOMO regardless ", "Worst thing since Brexit,( oh wait thats Trump)"]},
   {question:"Do you have anything important tomorrow?",answers:["A microsoft interview", "A coursework deadline", "A date with someone, but I'm leading them on a bit and not that invested"]}
];
var realanswers=[
["Light Weight", "Average", "Heavyweight"],
["","",""],
["Something light","Yes, a large dinner", "No, not since lunch"],
["Before 9","Midday","I could stay in bed all day"],
["2 pints or equiv", "4-6 pints or equiv", "I lost count,"],
["Amazing","Alright","Overrated/a let down"],
["Interview","Deadline","Nothing"]
];




app.get('/:question', function(req, res){
  var no=parseInt(req.params.question);
  console.log("no="+ no);
  var viewy="";
     // Disable caching for content files
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);



    //get results
     if(question_no==questions.length){
          var result=0;
          var client = new Client();
          console.log(answers);
          console.log(parseInt(answers[0][0])+ parseInt(answers[0][1]));
          console.log(realanswers[parseInt(answers[0][0])][parseInt(answers[0][1])]);
          var api_key="3DTOVqmNP4oOdfztAvFVVS73Q7kD+qaQtwG4GIKmeadFKZTMxZaTX4YwpY3sZrX7OtFlEX9aBJB0EPsFRtU+hg==";
          var data_in='{'+

        ' "Inputs": {'+

                '"input1":'+
                '{'+
                   ' "ColumnNames": ["Timestamp", "What drinker type are you?", "Did  you eat before you went out?", "What time did you have to be up?", "How much did you drink that night?", "How epic was the night out?", "Did you have anything important the next day?", "Overall scale 1-10 how worth it was your hangover, given the night?"],'+
                   ' "Values": [ [ "",' +realanswers[parseInt(answers[0][0])][parseInt(answers[0][1])]+','+ realanswers[parseInt(answers[1][0])][parseInt(answers[1][1])]+','+ realanswers[parseInt(answers[2][0])][parseInt(answers[2][1])]+','+ realanswers[parseInt(answers[3][0])][parseInt(answers[3][1])]+','+ realanswers[parseInt(answers[4][0])][parseInt(answers[4][1])]+','+ realanswers[parseInt(answers[5][0])][parseInt(answers[5][1])]+', "0" ], [ "",'+ realanswers[parseInt(answers[0][0])][parseInt(answers[0][1])]+','+ realanswers[parseInt(answers[1][0])][parseInt(answers[1][1])]+','+ realanswers[parseInt(answers[2][0])][parseInt(answers[2][1])]+','+ realanswers[parseInt(answers[3][0])][parseInt(answers[3][1])]+','+ realanswers[parseInt(answers[4][0])][parseInt(answers[4][1])]+','+ realanswers[parseInt(answers[5][0])][parseInt(answers[5][1])]+', "0" ], ]'+
                '},        },'+
            '"GlobalParameters": {'+
'}'+
    '}';
              var data_in2={

        "Inputs": {

                "input1":
                {
                   "ColumnNames": ["Timestamp", "What drinker type are you?", "Did  you eat before you went out?", "What time did you have to be up?", "How much did you drink that night?", "How epic was the night out?", "Did you have anything important the next day?", "Overall scale 1-10 how worth it was your hangover, given the night?"],
                    "Values": [ [ "2017-02-05T06:17:26+00:00",realanswers[parseInt(answers[0][0])][parseInt(answers[0][1])-1], realanswers[parseInt(answers[1][0])][parseInt(answers[1][1])-1], realanswers[parseInt(answers[2][0])][parseInt(answers[2][1])-1],realanswers[parseInt(answers[3][0])][parseInt(answers[3][1])-1],realanswers[parseInt(answers[4][0])][parseInt(answers[4][1])-1], realanswers[parseInt(answers[5][0])][parseInt(answers[5][1])-1], "0" ], [ "2017-02-05T06:17:26+00:00", realanswers[parseInt(answers[0][0])][parseInt(answers[0][1])-1], realanswers[parseInt(answers[1][0])][parseInt(answers[1][1])-1], realanswers[parseInt(answers[2][0])][parseInt(answers[2][1])-1], realanswers[parseInt(answers[3][0])][parseInt(answers[3][1])-1],realanswers[parseInt(answers[4][0])][parseInt(answers[4][1])-1], realanswers[parseInt(answers[5][0])][parseInt(answers[5][1])-1],"0" ], ]
                },        },
            "GlobalParameters": {
}
    };
    //var body=JSON.parse("");
          var datastring=JSON.stringify(data_in2);
          var path="/workspaces/f31f74ea1fa54144aaa948612bc79a90/services/9f1f562cd4554eca853a2c47e63c17e4/execute?api-version=2.0&details=true";
          var method='POST';
          var host="europewest.services.azureml.net";
          // set content-type header and data as json in args parameter 
          var args = {
              data: JSON.stringify(data_in2),
              headers: {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}
          };
          var headers= {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)};
          var options={host:host, port:443, path:path, method:'POST', headers:headers};
          var reqPost=https.request(options,function(res2){
            console.log(res2);
            res2.on('data',function(d){
               
               console.log(d.toString());
               var object=JSON.parse(d.toString());
               console.log(object["Results"]["output1"]["value"]["Values"][0][7]);
               var result=object["Results"]["output1"]["value"]["Values"][0][7];
               var instruction="";
               if(result>7){
                  instruction="Go on my son, party your butt off!";
               }else{
                 if(result>4){
                   instruction="Maybe...... One more drink. ;) Treat yo'self."
                 }else{
                   instruction="This is terrible, why are you even out? This is ridiculous! But ya know while your here YOLO";
                 }
               }
                res.render('results', {resulty:instruction});
            });
          });
          reqPost.write(datastring);
          reqPost.end();
          reqPost.on('error',function(e){
            console.error(e);
            res.render('results', {resulty:"Somethin, done goofed"});
          });

          

/*
          client.post("https://europewest.services.azureml.net/workspaces/f31f74ea1fa54144aaa948612bc79a90/services/9f1f562cd4554eca853a2c47e63c17e4/execute?api-version=2.0&details=true", args, function (data, response) {
              // parsed response body as js object 
              console.log(data);
              // raw response 
              console.log(response);
          });
          */

/*
          // registering remote methods 
client.registerMethod("postMethod", "http://remote.site/rest/json/method", "POST");
 
client.methods.postMethod(args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});
*/

       

       //everything else
     }else{

  if(question_no==0){
     // Point at the options-drinker.handlebars view
     //if first question
     viewy='options-drinker';
     console.log("homepage");
  
  }else{
    viewy='options';
    console.log("nothomepage");
     
  }
   console.log("loading");
   console.log(question_no);
   console.log(questions[question_no].question);
   console.log(questions[question_no].answers[0]);
      console.log(questions[question_no].answers[1]);
         console.log(questions[question_no].answers[2]);
    res.render(viewy,{
      
       question:questions[question_no].question,
       answer1:questions[question_no].answers[0],
       answer2:questions[question_no].answers[1],
       answer3:questions[question_no].answers[2]
     });
     }
     
});



//handles question responses, then rediects to questions
//unless final question or hackathon answered so redirect to result
app.post('/:question/:answer',function(req,res){
  if(parseInt(question_no)!=1){
    answers.push([parseInt(question_no), parseInt(req.params.answer)]);
  }
  question_no=question_no+1;
  var nextpage=parseInt(req.params.question)+1;
  var redirectAddr='/'+String(nextpage);
  console.log("redirect"+redirectAddr);
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    res.redirect(302,redirectAddr);
    
});

app.get('/:question/:answer',function(req,res){
  var question_no=parseInt(req.params.question);
    if(req.params.question=="0"){
    res.render('options-drinker',{
       question:questions[question_no].question,
       answer1:questions[question_no].answers[0],
       answer2:questions[question_no].answers[1],
       answer3:questions[question_no].answers[2]
     });       
    }else{
      if(req.params.question=="1" && req.params.answer=="1" ){
         res.render('results', {resulty:"HACKATHON?!?! NO TIME FOR DRINKING, CODE IS LIFE"});
      }else{
        res.render('options',{
          question:questions[question_no].question,
          answer1:questions[question_no].answers[0],
          answer2:questions[question_no].answers[1],
          answer3:questions[question_no].answers[2]
        });  
    }
    }
});

app.get('/:question/:answer',function(req,res, next){
  next();
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});

