var mongoose = require('mongoose');

//Format des données de :
var Tasks = mongoose.model('Listes', {
    text: String,
    date: Date,
    done: Boolean
});

module.exports = Tasks;