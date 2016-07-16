/// <reference path="../../../../DefinitelyTyped/requirejs/require.d.ts" />
/// <reference path="../../../resources/home/HomeUiText.ts" />

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

app.set('view engine', 'ejs');

var Routes = {
	Home: 		'/',
	CV: 		'/cv/',
	LiveChat: 	'/livechat',
	Assessment: '/assessment',
	UnitTests: 	'/tests',
	Login: 		'/login',
	Logout: 	'/logout',
	Register:	'/register',
	ForgottenPassword: '/forgottenPassword'
}

var Pages = {
	Home:		'pages/home',
	CV:			'pages/main',
	UnitTests:	'pages/tests',
	Login:		'pages/login',
	Register:	'pages/register',
	SetPassword:	'pages/set_password',
	ForgottenPassword: 'pages/forgotten_password',

}

var HomeUiText: IHomeUiText = new  HomeUiText2();

var sess;

app.get(Routes.Home, function(req, res) {

    // console.log ("UiText :" + JSON.stringify(HomeUiText));
    // console.log("Routes :" + JSON.stringify(Routes));

	res.render(Pages.Home, {
		UiText: HomeUiText,
		Routes: Routes
	});
});

// Routes

app.get(Routes.CV, function(req, res) {
	res.render(Pages.CV);
});

// Unit tests
app.get(Routes.UnitTests, function(req, res) {
	res.render(Pages.UnitTests);
});

//Login
app.get(Routes.Login, function(req, res) {
	sess=req.session;

	res.render(Pages.Login);
});

app.post(Routes.Login, function(req, res) {
	// TODO: Create database of users
    console.log('Log in attempt: ' + JSON.stringify(req.body));
    console.log(' -> Body: ' + JSON.stringify(req.body))

    var session = req.session;
    var post = req.body;
    if (post.username === 'justin' && post.password === 'jr') {

        session.username = req.body.username;
        session.maxAge = (1 * 60 * 60 * 1000);  // Set session expiry to 1 hour

        res.redirect(Routes.Home);
    }
    else {
        redirectToLogin(res);
    }
});

// Logout
app.get(Routes.Logout, function(req, res) {
	req.session = null;
	redirectToLogin(res);
});

// Register
app.get(Routes.Register, function(req, res) {
    res.render(Pages.Register)
});

app.post(Routes.Register, function(req, res) {
	res.render(Pages.SetPassword);
});

// Forgotten password
app.get(Routes.ForgottenPassword, function (req, res) {
	res.render(Pages.ForgottenPassword);
});

app.post(Routes.ForgottenPassword, function(req, res) {
	// Send email reset link
	// res.render('main');
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
	res.render(Pages.Login);
}