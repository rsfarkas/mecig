/*---------- BASIC SETUP ----------*/
var express = require('express'),
  bodyParser = require('body-parser'),
  app = express();

//Twilio
var accountSid = 'ACc0b166209c936b30763cb48d18f2f912';
var authToken = 'f0cfb25fd3c4b54388c0820f6029a530';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

var emailer = require('./mailer');
var einvite = require('./invite');
// scheduler
var scheduler = require('node-schedule');



// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logErrors);
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

// Express server
app.use(function(req, res, next) {
  // Setup a Cross Origin Resource sharing
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log('incoming request from ---> ' + ip);
  var url = req.originalUrl;
  console.log('### requesting ---> ' + url); // Show the URL user just hit by user
  next();
});

app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'));
/*---------------------------------*/


/*-------------- APP --------------*/


// ROUTERS
app.get('/', function(req, res){
  res.render('index.ejs', {})
});

app.get('/notify', function(req, res){
  console.log('HIT NOTIFY HERE');
  res.render('notify.ejs', {})
});


app.get('/notifydad', function(req, res){
  res.render('notifydad.ejs', {})
});


app.get('/notifyjason', function(req, res){
  res.render('notifyJason.ejs', {})
});

app.get('/profile', function(req, res){
  res.render('profile.ejs', {})
});

app.get('/sync', function(req, res){
  res.render('sync.ejs', {})
});

app.get('/send-email', function(req, res){
  emailer.sendEmail('roxannesfarkas@gmail.com');
  res.send('done send email');
});


app.get('/send-invite', function(req, res){
  einvite.sendEmail('roxannesfarkas@gmail.com');
  res.send('done send invite');
});

app.post('/sms-messaging', function(req, res){
  console.log(req.body);

  var numbers = [];
  var tmp = req.body.recipientNumber;
  var num = "+1" + tmp.replace(/\D+/g, "");
  numbers.push(num);

  console.log(tmp.length);

  console.log('num: ', numbers);
  process.env.TZ = 'America/New_York'
  var date = new Date();
  console.log("" + date.toLocaleTimeString());

  msg = req.body.messageBody;
  var schedDate = new Date(2017, 04, 08, 10, 40, 0);
  console.log("scheduled date " + schedDate.toLocaleTimeString() + schedDate);
  var scheduledDateJob = scheduler.scheduleJob(schedDate, function() {
    console.log("scheduled event fired yay!");
    client.sendMessage({
      to: numbers,
      from: '+17739042150',
      body: msg,
    }, function(err, responseData) {
      if (!err) {
        console.log(responseData.from);
        console.log(responseData.body);
      }
    })
  });
  scheduledDateJob;
  res.redirect('/notify')
});

var PORT = 3000;
app.listen(PORT, function(){
  console.log('Express server is running at ' + PORT);
});
