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

router.get('/:id', function(req, res) {
    param = req.params;
    dataLayer.getMySpace(param,function(result){
        res.render('users/perso.html', 
        {
            user: result,
            id : param.id
        });
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
    data = req.body;
    dataLayer.createCollab(data,function(result){
        res.send(result);
    });
});

module.exports = router;