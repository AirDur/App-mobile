var router = require('express').Router();
var dataLayer = require('../dataLayer.js');

// Affichage :
router.get('/', function(req, res) {
    res.render('users/index.html');
});

router.get('/registration', function(req, res) {
    res.render('users/registration.html');
});

router.get('/confirmation', function(req, res) {
    res.render('users/confirmation.html');
});

// Affichage d'une liste : 
router.post('/Liste', function(req, res) {
    param = req.body;
    dataLayer.getList(param,function(une_liste){
        res.render('Liste/index.html', { liste : une_liste });
    });
});

// Espace personnel (avec Nunjucks) : 
router.get('/User/espace/:id', function(req, res) {
    param = req.params;
    dataLayer.getMySpace(param,function(result){
        res.render('users/perso.html', 
        {
            liste_de_liste: result.listes,
            id : param.id
        });
    });
});

//Vérifie si un utilisateur existe déjà (lors de l'inscription)
// Renvoie false si le datalayer renvoit une quelconque erreur
router.post('/User/isExist', function(req, res) {
    dataLayer.existUser(req.body, function(err, result) {
        if(err==null) {
            res.send(result);
        } else {
            res.send(false);
        }
    });
});

//Créer un nouvel utilisateur
router.post('/User/add', function(req, res) {
    if(typeof req.body.username != "undefined" 
    && typeof req.body.password != "undefined" 
    && typeof req.body.passwordconf != "undefined"
    && req.body.password == req.body.passwordconf) {
        dataLayer.createUser(req.body,function(result){
            res.send(result);
        });
    } else {
        res.send("Erreur de données");
    }
});

//Connexion : 
router.post('/User/connect', function(req, res) {
    dataLayer.connectUser(req.body,function(user,result){
        if (result==null){
            var resultat = [user._id, 0];
        } else {
            var resultat = [result, 1];
        }
        res.send(resultat);
    });
});

//Liste des utilisateurs (debug via Postman) :
router.get('/User/list', function(req, res) {
    dataLayer.listUser(req.params,function(result){
        res.send(result);
    });
});

// Permet de créer une collaboration.
router.post('/Collaboration/create', function(req, res) {
    dataLayer.createCollab(req.body,function(result){
        res.send(result);
    });
});

module.exports = router;