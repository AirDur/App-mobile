/** Appel des dépendances et des packages externes */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Initialisation : 
var app = express();

//color output for development usage : 
app.use(morgan('dev')); 

//init parser : 
app.use(bodyParser.json());     //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({'extended':'true'}));  //to support URL-encoded bodies
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //type de l'application

var dataLayerListe = require(__dirname + '/model/dataLayer.Liste.js');

// Start the application after the connexion to Database established : 
dataLayerListe.init(function() {
    console.log('init');
    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
});

// Dossiers : 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

var routerListe = require(__dirname + '/route/route.Liste');
app.use(routerListe);
