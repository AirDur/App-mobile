var mongoose = require('mongoose');

//Format des données :
var User = mongoose.model('Users', {
    name: String,
    password: String,
    email: String,
    verified: Boolean
});

module.exports = User;