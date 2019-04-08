// IMPORTS :
//Express: infrastructure pour appli web
//BodyParser : Intergiciel pour les requêtes HTTP (req.body)
//Nunjucks : moteur de template Node.JS
//Mongoose : ODM pour MongoDB et Node.JS
//Morgan : Logger, crée les logs
var express  = require('express');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//Modèles mongoose :
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

// PATHS :

nunjucks.configure(__dirname + '/public', {
  autoescape: true,
  express: app
});

app.use('/Tache', require('./routes/routes.Tache'));
app.use('/Liste', require('./routes/routes.Liste'));
app.use('/', require('./routes/routes.Users'));
// Raccourcis dossier : 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use('/images', express.static(__dirname + '/images'));
app.use('/public', express.static(__dirname + '/public'));


dataLayer.init(function(){
  console.log('Initialisation du dataLayer');
  app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});