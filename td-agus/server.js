/** Appel des dépendances et des packages externes */
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/* Initialisation : */
var app = express();

app.use(express.static(__dirname + '/public')); //Dossier des données statics
app.use(morgan('dev')); //color output for development usage
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //type de l'application

//Connexion à la base de donnée : 
mongoose.connect('mongodb://localhost/ListeaFaire', {
    useNewUrlParser: true
});

//Format des données :
var Liste = mongoose.model('Liste', {
    text: String
});

//Récupère un fichier / et l'envoi à index.html
app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

app.get('/api/laliste', function(req, res) {
    Liste.find(function(err, laliste) {
        if (err)
            res.send(err)
        res.json(laliste);
    })
});

app.post('/api/laliste', function(req, res) {
    Liste.create({
        text : req.body.text,
        done : false
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});

app.delete('/api/laliste/:liste_id', function(req, res) {
    Liste.deleteOne({
        _id : req.params.liste_id
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        }); 
    });
});

//Utilisation du port 8080 : 
app.listen(8080);
console.log("on utilise le port 8080");
