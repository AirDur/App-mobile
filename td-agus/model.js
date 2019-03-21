var mongoose = require('mongoose');

//Connexion à la base de donnée : 
mongoose.connect('mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true', {
    useNewUrlParser: true
});

//Format des données de :
var Tasks = mongoose.model('Listes', {
    text: String,
    date: Date,
    done: Boolean
});

//Format des données :
var User = mongoose.model('Users', {
    name: String,
    password: String,
    email: String,
    verified: Boolean
});

module.exports = Tasks, User;