var mongoose = require('mongoose');

//Format des données de :
var Liste = mongoose.model('Listes', {
    text: String,
    date: Date,
    done: Boolean
});

module.exports = Liste;