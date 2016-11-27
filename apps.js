var express = require('express');
var exphbs  = require('express-handlebars');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

/////////DATABASE LOGIN CONNECTION/////////
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chalk'
});
connection.connect();
connection.query("SELECT * FROM users", function(err, rows, fields) {
  if (err) {
  	console.error(err);
  	return;
 }
 else
 {
 	db = rows;
 }
});
////////////////////////////////////////

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/register',function(req,res) {
	res.render('register');
});
app.get('/dashboard',function(req,res) {
	res.render('dashboard');
});
app.get('/save', function(req,res) {
	res.render('save');
});
app.get('/redirect', function(req,res) {
	res.render('login');
})
app.get('/db', function(req,res) {

	res.send(JSON.stringify(db));
});

app.post('/save', function(req,res) {
	var counter = 0;
	var regEmail = req.body.regEmail;
	var regPass = req.body.regPass;
	var regConfPass = req.body.regConfPass;
	var errorval = req.body.hack;

	if (regPass != regConfPass) {
		//('#modal').modal('show');
		counter = 1;
	}
	if (regPass.length < 8) {
		//('#modal').modal('show');
		counter = 1;
	}
	if (regEmail.length < 3) {
		//('#modal').modal('show');
		counter = 1;
	}
	if (regEmail.length < 1 && regPass < 1 && regConfPass < 1) {
		//('#modal').modal('show');
		counter = 1;
	}



	var user = {
		username: regEmail,
		password: regPass
	}
	
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'chalk'
	});
	connection.connect();
	 
	connection.query("INSERT into users set ?", user , function(err, rows, fields) {
	  if (err) {
	  	console.error(err);
	  	return;
	 }
	  console.log("Success!");
	  res.render('redirect');
	  var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chalk'
});
connection.connect();
connection.query("SELECT * FROM users", function(err, rows, fields) {
  if (err) {
  	console.error(err);
  	return;
 }
 else
 {
 	db = rows;
 }
});
	});
/////refresh datab





});



app.listen(8080)