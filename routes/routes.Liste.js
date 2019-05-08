var router = require('express').Router();

var dataLayer = require('../dataLayer.js');

router.get('/api/:id', function(req, res) {
    param = req.params;
    dataLayer.getList(param,function(result){
      res.send(result);
    });
});

//Créer une liste : 
router.post('/api/create/:id', function(req, res) {
    data = req.body;
    param = req.params;
    dataLayer.createList(param,data,function(result){
        dataLayer.getMySpace(param,function(result){
            res.send(result);
        });
    });
});

//Modifier la Liste : 
router.post('/api/modify/:id', function(req, res) {
    data = req.body;
    param = req.params;
    dataLayer.updateList(param,data,function(){
        dataLayer.getList(param,function(result){
            res.send(result);
        });
    });
});

//Supprime les listes d'un utilisateur : 
router.delete('/api/delete/:user/:id', function(req, res) {
    param = req.params;
    dataLayer.deleteList(param,function(result){
        res.send(result);
    });
});

module.exports = router;
