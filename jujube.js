var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
  .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

var userInfo = [{name: "zhangym", password: "password1"},
  {name: "hanf", password: "password2"},
  {name: "admin", password: "jujube666"}
];
var credentials = require('./server/credentials.js');
var serverLib = require('./server/lib.js');


app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());
var fortuneCookies = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

app.get('/', function (req, res) {
  console.log(req.session.loginInfo)
  if (!serverLib.checkLoginTimeOut(req.session.loginInfo)) {
    res.redirect('/login');
  } else {
    res.render('home');
  }
});

app.get('/login', function (req, res) {
  res.render('login', {layout: 'login'});
});

app.post('/loginPost', function (req, res) {
  for (var i = 0; i < userInfo.length; i++) {
    if (userInfo[i].name === req.body.username && userInfo[i].password === req.body.password) {
      req.session.loginInfo = "success-"+ new Date().valueOf();
      res.send({success: true, state: '200'});
      return;
    }
    if (userInfo[i].name === req.body.username && userInfo[i].password !== req.body.password) {
      res.send({success: true, state: '201', errorMessage: '密码错误'});
      return;
    }
  }
  res.send({error: 'error descript'});
});


// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});


