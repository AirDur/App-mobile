var router = require('express').Router();
var mongoose = require('mongoose');

//Connexion à la base de donnée : 
mongoose.connect('mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true', {
    useNewUrlParser: true
});

var Liste = require('../models/model.Liste.js');

//Récupère un fichier / et l'envoi à index.html
router.get('/', function(req, res) {
    res.render('Listes/index.html');
});

//Récupère toute lt la liste
router.get('/api/laliste', function(req, res) {
    Liste.find(function(err, laliste) {
        if (err)
            res.send(err)
        res.json(laliste);
    })
});

//Modifier la tâche :
router.post('/api/laliste/modify/:liste_id/:text', function(req, res) {
    Liste.updateOne({
        _id : req.params.liste_id
    },
    { text : req.params.text },
    function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        }); 
    });
});

//Supprime la tâche à faire
router.delete('/api/laliste/delete/:liste_id', function(req, res) {
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

//Créer une tâche à faire
router.post('/api/laliste', function(req, res) {
    var dataToInsert = {
        text : req.body.text,
        date : Date.now(),
        done : false
    };
    Liste.create(dataToInsert, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});

//Change la tâche
router.post('/api/laliste/:liste_id/:done', function(req, res) {
    Liste.updateOne({
        _id : req.params.liste_id
    }, 
    { done : req.params.done },
    function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        }); 
    });
});

module.exports = router;