var mongoose = require('mongoose');

//Connexion à la base de donnée : 
mongoose.connect('mongodb://localhost/ListeaFaire', {
    useNewUrlParser: true
});

//Format des données :
var Liste = mongoose.model('Liste', {
    text: String,
    date: Date
});

module.exports = Liste;