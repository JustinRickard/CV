/// <reference path="scripts/external/DefinitelyTyped/requirejs/require.d.ts" />
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render('main');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.post('/login', function (req, res) {
    res.redirect('/');
});
app.post('/logout', function (req, res) {
    res.render('login');
});
app.get('/register', function (req, res) {
    res.render('register');
});
app.post('/register', function (req, res) {
    res.render('main');
});
app.get('/forgottenPassword', function (req, res) {
    res.render('forgottenPassword');
});
app.post('/forgottenPassword', function (req, res) {
    res.render('main');
});
app.get('/GetAll', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('JustinRickard app listening on port 3000!');
});
