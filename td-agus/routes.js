var router = require('express').Router();

var Liste = require('./model.js');

//Récupère un fichier / et l'envoi à index.html
router.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

router.get('/api/laliste', function(req, res) {
    Liste.find(function(err, laliste) {
        if (err)
            res.send(err)
        res.json(laliste);
    })
});

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

router.delete('/api/laliste/:liste_id', function(req, res) {
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

router.post('/api/laliste/:liste_id/:done', function(req, res) {
    console.log(req.params);
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