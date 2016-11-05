var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
  .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());
var fortuneCookies = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];
var userInfo = [{name: "zhangym", password: "password1"},
  {name: "hanf", password: "password2"},
  {name: "admin", password: "jujube666"}
];

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  res.render('login', {layout: 'login'});
});

app.post('/loginPost', function (req, res) {
  for (var i = 0; i < userInfo.length; i++) {
    if (userInfo[i].name === req.body.username && userInfo[i].password === req.body.password) {

      res.send({success: true, state: '200'});
      break;
    }
    if (userInfo[i].name === req.body.username && userInfo[i].password !== req.body.password) {
      res.send({success: true, state: '201', errorMessage: '密码错误'});
      break;
    }
  }
  if (i == userInfo.length) {
    res.send({error: 'error descript'});
  }
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
