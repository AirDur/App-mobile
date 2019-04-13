var router = require('express').Router();
var mongoose = require('mongoose');

var dataLayer = require('../dataLayer.js');

//Connexion à la base de donnée : 
mongoose.connect('mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true', {
    useNewUrlParser: true
});

router.get('/#?id=:id', function(req, res) {
    res.render('Liste/index.html');
});

//Récupère toute lt la liste
router.get('/api', function(req, res) {
    Liste.find(function(err, laliste) {
        if (err)
            res.send(err)
        res.json(laliste);
    })
});

// Créer une tâche : 
router.post('/api/:id', function(req, res) {
    data = req.body;
    param = req.params;
    dataLayer.addTask(param,data,function(){
        dataLayer.getList(param,function(result){
            res.send(result);
        });
    });
});

//Modifier la tâche :
router.post('/api/modify/:id/:tache_id', function(req, res) {
    data = req.body;
    param = req.params;
    dataLayer.updateTask(param,data, function(result){
        dataLayer.getList(param,function(result){
            res.send(result)
        });
    });
});

//Déclare la tâche "fait" ou "non fait"
router.post('/api/modify_done/:id/:tache_id', function(req, res) {
    data = req.body;
    param = req.params;
    dataLayer.updateTask_Done(param,data,function(){
        dataLayer.getList(param,function(result){
            res.send(result);
        });
    });
});

//Supprime la tâche à faire
router.delete('/api/delete/:id/:tache_id', function(req, res) {
    param = req.params;
    dataLayer.delete(param,function(){
        dataLayer.getList(param,function(result){
            res.send(result);
        });
    });
});

// Supprime les tâches finies : 
router.delete('/api/delete/:id', function(req, res) {
    dataLayer.deleteTask_Done(function(){
        dataLayer.getList(param,function(result){
            res.send(result);
        });
    });
});

module.exports = router;