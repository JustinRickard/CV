/// <reference path="../../../../DefinitelyTyped/requirejs/require.d.ts" />

// var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser: any = require('body-parser');
var express: any = require('express');

var app: any = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html'}));
app.use(cookieParser('JrSecret7'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.set('view engine', 'jade');

var sess;

app.get('/', checkAuth, function(req, res) {
	res.render('main');
});

// Routes

// Unit tests
app.get('/tests', function(req, res) {
	res.render('tests');
});

//Login
app.get('/login', function(req, res) {
	sess=req.session;

	res.render('login');
});

app.post('/login', function(req, res) {
	// TODO: Create database of users
    console.log('Log in attempt: ' + JSON.stringify(req.body));
    console.log(' -> Body: ' + JSON.stringify(req.body))

    var session = req.session;
    var post = req.body;
    if (post.username === 'justin' && post.password === 'jr') {

        session.username = req.body.username;
        session.maxAge = (1 * 60 * 60 * 1000);  // Set session expiry to 1 hour

        res.redirect('/');
    }
    else {
        redirectToLogin(res);
    }
});

// Logout
app.get('/logout', function(req, res) {
	req.session = null;
	redirectToLogin(res);
});

// Register
app.get('/register', function(req, res) {
    res.render('register')
});

app.post('/register', function(req, res) {
	res.render('main');
});

// Forgotten password
app.get('/forgottenPassword', function (req, res) {
	res.render('forgottenPassword');
});

app.post('/forgottenPassword', function(req, res) {
	res.render('main');
});

// API
app.get('/GetAll', function(req, res) {
	res.send('Hello World!');
});

app.listen(3000, function() {
	console.log('JustinRickard app listening on port 3000!');
});

function checkAuth(req, res, next) {
	var session = req.session;
	console.log('Authorising request...: ' + JSON.stringify(session));
	var now: Date = new Date();
	if (!session || !session.username || session.expires < now) {
		console.log('Redirecting to login page')
		redirectToLogin(res);
	} else {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		next();
	}
}

function redirectToLogin(res) {
	res.render('login');
}