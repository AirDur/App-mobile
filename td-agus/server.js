//Express: infrastructure pour appli web
var express  = require('express');
//Nunjucks : moteur de template Node.JS
var nunjucks = require('nunjucks');
//Mongoose : ODM pour MongoDB et Node.JS
var mongoose = require('mongoose');
//Morgan : Logger, crée les logs
var morgan = require('morgan');
//BodyParser : Intergiciel pour les requêtes HTTP (req.body)
var bodyParser = require('body-parser');

Liste = require('./models/model.Liste');
Users = require('./models/model.Users');
Tache = require('./models/model.Tache');

//DataLayer :
var dataLayer = require('./dataLayer');

/* Initialisation : */
var app = express();

app.use(morgan('dev')); //color output for development usage
// Parser : 
app.use(bodyParser.json());     //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({'extended':'true'}));  //to support URL-encoded bodies
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //type de l'application

app.use('/Tache', require('./routes/routes.Tache'));
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

dataLayer.init(function(){
  console.log('Initialisation du dataLayer');
  app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});