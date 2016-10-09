/// <reference path="../DefinitelyTyped/requirejs/require.d.ts" />
/// <reference path="./src/resources/home/HomeUiText.ts" />
/// <reference path="./src/shared/models/Enums.ts" />
/// <reference path="./src/shared/models/ExperienceItem.ts" />
/// <reference path="./src/shared/models/Job.ts" />

var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser: any = require('body-parser');
var express: any = require('express');

import {HomeUiText, IHomeUiText} from './src/resources/home/HomeUiText';
import {Job, IJob} from './src/shared/models/Job';
import {ExperienceItem, IExperienceItem} from './src/shared/models/ExperienceItem';
import {TechnologyType} from './src/shared/models/Enums'

var app: any = express();
var homeUiText = new HomeUiText();

app.use(express.static('./src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html'}));
app.use(cookieParser('JrSecret7'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.set('view engine', 'ejs');
app.set('views', './src/server/views/pages');

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
	Home:		'home',
	CV:			'cv',
	UnitTests:	'tests',
	Login:		'login',
	Register:	'register',
	SetPassword: 'set_password',
	ForgottenPassword: 'forgotten_password',
}

var sess;

app.get(Routes.Home, function(req, res) {
	res.render(Pages.Home, {
		UiText: homeUiText,
		Routes: Routes
	});
});

// Routes

app.get(Routes.CV, function(req, res) {
	res.render(Pages.CV, {
		Jobs: JSON.stringify(GenerateJobs()),
		Experience: JSON.stringify(GetExperience())
	});
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

function GetExperience(): IExperienceItem[] {
	return 	[
		{
			Type: TechnologyType.Server,
			Name: "C#",
			Years: 4
		},
		{
			Type: TechnologyType.Server,
			Name: "ASP.NET Web API",
			Years: 2
		},
		{
			Type: TechnologyType.Server,
			Name: "ASP.NET MVC",
			Years: 3
		},
		{
			Type: TechnologyType.Server,
			Name: "ASP.NET Web Forms",
			Years: 2
		},
		{
			Type: TechnologyType.Server,
			Name: "Node JS",
			Years: 1
		},
		{
			Type: TechnologyType.Server,
			Name: "PowerShell",
			Years: 3
		},
		{
			Type: TechnologyType.Server,
			Name: "N Unit",
			Years: 3
		},
		{
			Type: TechnologyType.Server,
			Name: "iTextSharp",
			Years: 2
		},
		{
			Type: TechnologyType.Database,
			Name: "Sql Server",
			Years: 4
		},
		{
			Type: TechnologyType.Database,
			Name: "MySQL",
			Years: 1
		},
		{
			Type: TechnologyType.Database,
			Name: "MongoDB",
			Years: 0
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "TypeScript",
			Years: 3
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "Knockout",
			Years: 2
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "Angular 1",
			Years: 2
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "Angular 2",
			Years: 0
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "React",
			Years: 0
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "Jasmine",
			Years: 2
		},
		{
			Type: TechnologyType.FrontEnd,
			Name: "Mocha",
			Years: 0
		},
	]
}

function GenerateJobs(): Array<IJob> {

	var jobs = new Array<IJob>();

	var uni_start = new Date(2005, 8, 1);
	var uni_headline = "Loughborough University";
	var uni_title = "Computer Science (BSc)";
	var uni_imageUrl = "../images/loughborough_university.jpg";

	var fidessa1_start = new Date(2008, 8, 1);
	var fidessa1_headline = "Fidessa";
	var fidessa1_title = "Trading Platform Engineer";
	var fidessa1_imageUrl = "../images/fidessa.jpg";

	var fidessa2_start = new Date(2012, 8, 1);
	var fidessa2_headline = "Fidessa";
	var fidessa2_title = "FIX Connectivity Engineer";
	var fidessa2_imageUrl = "../images/fidessa.jpg";

	var accesso_start = new Date(2013, 5, 1);
	var accesso_headline = "accesso";
	var accesso_title = "Software Developer";
	var accesso_imageUrl = "../images/accesso.png";

	var adc_start = new Date(2014, 8, 1);
	var adc_headline = "a&dc";
	var adc_title = "Software Developer";
	var adc_imageUrl = "../images/adc.png";

	var uni = new Job(uni_headline, uni_title, uni_start, fidessa1_start, false, uni_imageUrl);
	var fid1 = new Job(fidessa1_headline, fidessa1_title, fidessa1_start, fidessa2_start, false, fidessa1_imageUrl);
	var fid2 = new Job(fidessa2_headline, fidessa2_title, fidessa2_start, accesso_start, false, fidessa2_imageUrl);
	var accesso = new Job(accesso_headline, accesso_title, accesso_start, adc_start, false, accesso_imageUrl);
	var adc = new Job(adc_headline, adc_title, adc_start, new Date(), false, adc_imageUrl);

	jobs.push(uni);
	jobs.push(fid1);
	jobs.push(fid2);
	jobs.push(accesso);
	jobs.push(adc);
	
	return jobs;
}