var routerListe = require('express').Router();

//Récupère un fichier / et l'envoi à index.html
routerListe.get('/', function(req, res) {
    res.sendFile('/views/index.html');
});

//Récupère toute lt la liste
routerListe.get('/Liste', function(req, res) {
    dataLayerListe.getTask(function(dtSet) {
        res.send(dtSet);
    });
});

//Modifier la tâche :
routerListe.post('/Liste/modify/:liste_id/:text', function(req, res) {
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
routerListe.delete('/Liste/delete/:liste_id', function(req, res) {
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
routerListe.post('/Liste', function(req, res) {
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
routerListe.post('/Liste/:liste_id/:done', function(req, res) {
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