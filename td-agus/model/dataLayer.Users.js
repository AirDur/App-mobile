var MongoClient = require("mongodb").MongoClient;
var uri = "mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true";
// var mongoose = require('mongoose');
var client = new MongoClient(uri, {
    useNewUrlParser: true
});
var db;

var dataLayer = {

    init : function(cb) {
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("ListeaFaire");
            cb();
        });
    },

    getTask : function(cb) {
        db.collection("Listes").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    insertTask : function(task, cb) {
        db.collection("Listes").insertOne(task, function(err, result) {
            cb();
        });
    },

    modifyTask : function(task, data, cb) {
        db.collection("Listes").updateOne(task, data, function(err, result) {
            cb();
        });
    },

    deleteTask : function(task, cb) {
        db.collection("Listes").deleteOne(task, function(err, result) {
            cb();
        });
    }
}


module.exports = dataLayerUsers;