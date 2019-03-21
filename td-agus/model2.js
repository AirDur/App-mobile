var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true';

//Connexion à la base de donnée : 
var client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(function(err) {
    if(err) throw err;

    var task = {
        name : "oijfjeifizjef",
        done : false
    }

    //Liste = client.db('ListeaFaire').collection('listes').find({});

    client.db('ListeaFaire').collection('listes').insertOne(task); //inserer un truc dans la base.
    /*
    Liste.forEach(function(task){
        // console.log(task.text + " | " + task.done);
    });

    return Liste;
    */
});

var Liste = "";
console.log(Liste);
module.exports = Liste;