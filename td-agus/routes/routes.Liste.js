var router = require('express').Router();
var mongoose = require('mongoose');

var dataLayer = require('../dataLayer.js');

//Connexion à la base de donnée : 
mongoose.connect('mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true', {
    useNewUrlParser: true
});

//Récupère un fichier / et l'envoi à index.html
// router.get('/', function(req, res) {
//     res.render('Listes/index.html');
// });

router.get('/#?id=:id', function(req, res) {
    res.render('Listes/index.html');
});

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
        res.send(result)
    });
});

//Modifier la Liste : 
router.post('/api/modify/:id', function(req, res) {
    data = req.body;
    param = req.params;
    dataLayer.modifyList(param,data,function(){
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