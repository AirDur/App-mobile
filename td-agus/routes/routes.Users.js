var router = require('express').Router();

var User = require('../models/model.Users');

router.get('/', function(req, res) {
  res.render('users/index.html');
});

router.get('/User/registration', function(req, res) {
  res.render('users/registration.html');
});

router.get('/User/confirmation', function(req, res) {
  res.render('users/confirmation.html');
});

//Créer un nouvel utilisateur
router.post('/User/add', function(req, res) {
//   if(req.body.password == req.body.password_bis)
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
});

router.post('/User/connect', function(req, res) {

    // attempt to authenticate user
  User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
    if (err)
      res.send(err);


        // login was successful if we have a user
        if (user) {
            // handle login success
            res.send('Connexion avec succès');
            return;
        }

        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
              res.send('Utilisateur non trouvé');
              return;
            case reasons.PASSWORD_INCORRECT:
              res.send('Mot de passe incorrect');
              return;
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
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