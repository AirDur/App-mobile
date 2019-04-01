var router = require('express').Router();

var User = require('../models/model.Users');

router.get('/', function(req, res) {
  res.render('users/index.html');
});

router.get('/registration', function(req, res) {
  res.render('users/registration.html');
});

router.get('/confirmation', function(req, res) {
  res.render('users/confirmation.html');
});

//Créer un nouvel utilisateur
router.post('/User/add', function(req, res) {
//   if(req.body.password == req.body.password_bis)
  if(typeof req.body.username != "undefined" 
  && typeof req.body.password != "undefined" 
  && typeof req.body.passwordconf != "undefined"
  && req.body.password == req.body.passwordconf) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save({}, function(err, user) {
      if (err)
          res.send(err);
      User.find(function(err, leuser) {
          if (err)
              res.send(err);
          res.json(leuser);
      });
    });
  } else {
    res.send("Erreur de données");
  }
});

//Connexion : 
router.post('/User/connect', function(req, res) {
  User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
    if (err)
      res.send(err);


        // login was successful if we have a user
        if (user) {
            res.send("Connexion réussie");
            return;
        }

        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
            case reasons.PASSWORD_INCORRECT:
              res.send('Utilisateur ou Mot de passe incorrect');
              return;
                break;
            case reasons.MAX_ATTEMPTS:
              res.send("Tu as atteints la limite d'essais de connexion");
              return;
                // send email or otherwise notify user that account is
                // temporarily locked
                break;
        }
    });
});

module.exports = router;