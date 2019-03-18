/** Appel des dépendances et des packages externes */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./routes.js');

/* Initialisation : */
var app = express();

app.use(express.static(__dirname + '/public')); //Dossier des données statics
app.use(morgan('dev')); //color output for development usage
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //type de l'application

app.use(router);

//Utilisation du port 8080 : 
app.listen(8080);
console.log("on utilise le port 8080");
