var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-shard-00-00-dvnm0.mongodb.net:27017 ';

//Connexion à la base de donnée : 
var client = new MongoClient(url, {
    useNewUrlParser: true
});


client.connect(function(err) {
    if(err) throw err;

    const Liste = client.db('ListeaFaire').collection('listes').find({});

    Liste.forEach(function(task){
        console.log(task.text + " | " + task.done);
    })
});


module.exports = Liste;