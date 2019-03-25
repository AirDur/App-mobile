var router = require('express').Router();

//Récupère un fichier / et l'envoi à index.html
router.get('/', function(req, res) {
    res.sendFile('/views/Listes.html');
});

//Récupère toute lt la liste
router.get('/Liste', function(req, res) {
    dataLayerListe.getTaskSet(function(dtSet) {
        res.send(dtSet);
    });
});

//Modifier la tâche :
router.post('/Liste/modify/:liste_id/:text', function(req, res) {
    if(req.params) {
        var id = {
            _id : req.params.liste_id
        };
        var newData = { text : req.params.text };
        dataLayerListe.modifyTask(id, newData, function() { 
            res.send({success : true});
        });
    } else {
        res.send({
            success : false,
            errorCode : "PARAM_MISSING"
        });
    }
});

//Supprime la tâche à faire
router.delete('/Liste/delete/:liste_id', function(req, res) {
    if(req.params) {
        var id = {
            _id : req.params.liste_id
        };
        dataLayerListe.deleteTask(id, function() { 
            res.send({success : true});
        });
    } else {
        res.send({
            success : false,
            errorCode : "PARAM_MISSING"
        });
    }
});

//Créer une tâche à faire
router.post('/Liste', function(req, res) {
    if(req.body) {
        var dataToInsert = {
            text : req.body.text,
            date : Date.now(),
            done : false
        };
        dataLayerListe.insertTask(dataToInsert, function() { 
            res.send({success : true});
        });
    } else {
        res.send({
            success : false,
            errorCode : "PARAM_MISSING"
        });
    }
});

// Met une tâche "fait"
router.post('/Liste/:liste_id/:done', function(req, res) {
    if(req.params) {
        var id = {
            _id : req.params.liste_id
        };
        var newData = { done : req.params.done };
        dataLayerListe.modifyTask(id, newData, function() { 
            res.send({success : true});
        });
    } else {
        res.send({
            success : false,
            errorCode : "PARAM_MISSING"
        });
    }
});

module.exports = routerListe;