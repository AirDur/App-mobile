/** Appel des dépendances et des packages externes */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

Liste = require('./models/model.Liste');
Users = require('./models/model.Users');

/* Initialisation : */
var app = express();

app.use(morgan('dev')); //color output for development usage
// Parser : 
app.use(bodyParser.json());     //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({'extended':'true'}));  //to support URL-encoded bodies
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //type de l'application

app.use('/Liste', require('./routes/routes.Liste'));
app.use('/', require('./routes/routes.Users'));
// Raccourcis dossier : 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use('/images', express.static(__dirname + '/images'));
app.use('/public', express.static(__dirname + '/public'));

nunjucks.configure(__dirname + '/public', {
  autoescape: true,
  express: app
});

app.listen(process.env.PORT || 8080, function(){
console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});