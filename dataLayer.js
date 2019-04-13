//var MongoClient = require('mongodb').MongoClient;
var client = require('mongoose');
var urlmongo = 'mongodb+srv://admin:rvadU17GzOPr5niT@cluster0-dvnm0.mongodb.net/ListeaFaire?retryWrites=true';
var db;
//var client = new MongoClient(urlmongo, { useNewUrlParser: true});

var Liste = require('./models/model.Liste');
var User = require('./models/model.Users');
var Tache = require('./models/model.Tache');

var dataLayer = {

    init : function(cb) {
        //Initialise la connexion entre l'API et notre BDD
        client.connect(urlmongo, { useNewUrlParser: true});
        db = client.connection;
        db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
        db.once('open', function (){
            console.log("Connexion à la base OK");
        });
        //callback vide
        cb();
        /*
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("Listeafaire");
            cb();
        });*/
    },

    //Récupère l'espace utilisateur : 
    getMySpace: function(param,cb) {
        //User.findOne({ _id: client.Types.ObjectId(param.id) }).populate('listes').exec((err, res) => { cb(res)})
        User.findById(param.id).populate({path : 'listes', populate : [{path:'creator'}, {path:'collaboraters'}]}).then(leuser => {
            cb(leuser)
        });
    },

    //Récupère les listes de tâche : 
    getList: function(param,cb) {
        Liste.findById(param.id).populate('tasks').then(Liste_tache => {cb(Liste_tache)});
    },

    //Créer une liste de tâche pour un (puis plusieurs) utilisateur(s) : 
    createList: function(param,data,cb) {
        Liste.create({
            name : data.name,
            description : data.description,
            creator : data.creator_id
        }, function(err, list) {
            if (err)
                cb(err);
            User.findByIdAndUpdate(param.id, {$push: {listes: list._id}}, {'new':true}, cb);
        });
    },

    //Modifie une liste de tâche : 
    updateList: function(param,data,cb) {
        Liste.findByIdAndUpdate(param.id, 
            {
                name: data.name, 
                description: data.description
            },
            cb);
    },

    //Supprime une liste de tâche : 
    deleteList: function(param,cb) {
        Liste.findByIdAndDelete(param.id);
        User.findByIdAndUpdate(param.user, {$pull: {listes: param.id}}, {'new':false}, cb);
    },

    // Créer un utilisateur et le sauvegarde dans la Base de donnée : 
    createUser : function(data,cb) {
        // create a user a new user
        var newUser = new User({
            username: data.username,
            password: data.password
        });
        // save user to database
        newUser.save({}, function(err) {
            if (err)
                cb(err);
            cb();
        });
    },

    // Vérifie si un identifiant d'utilisateur existe déjà :
    existUser: function(data,cb) {
        User.findById(data.id,function(err, user) {
            cb(err,user);
        });
    },

    //Connexion : 
    connectUser: function(data,cb) {
        User.getAuthenticated(data.username, data.password, function(err, user, reason) {
            if (err)
                cb(null, err);
            if (user) {
                cb(user, null);
                return;
            }
            // otherwise we can determine why we failed
            var reasons = User.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND :
                case reasons.PASSWORD_INCORRECT :
                    cb(null, 'Utilisateur non trouvé ou mot de passe incorrect.');
                    return;
                case reasons.MAX_ATTEMPTS:
                    cb(null, "Tu as atteints la limite d'essais de connexion.");
                    return;
            }
        });       
    },

    //Récupère toute la liste (debug POSTMAN)
    listUser : function(data, cb) {
        User.find(function(err, laliste) {
            if (err)
                cb(null, err);
            cb(laliste, );
        });
    },
    
    //Ajout d'une tâche : 
    addTask : function(param,data,cb){
        Tache.create({
            text : data.text,
            creator : data.creator,
            date: Date.now(),
            done : false
        }, function(err, tache) {
            if (err)
                cb(err);
            Liste.findByIdAndUpdate(param.id, { $push: {tasks: tache._id}} , { 'new': true}, cb);
        });
    },

    //Modification d'une tâche : 
    updateTask : function(param,data,cb) {
        Tache.updateOne({
            _id : param.tache_id
        },{
            text : data.text
        }, function(err) {
            if (err)
                cb(err);
            cb();
        }); 
    },

    //Modification du "fait" d'une tâche : 
    updateTask_Done : function(param,data,cb) {
        Tache.updateOne({
            _id : param.tache_id
        },{
            done : data.checked
        }, function(err) {
            if (err)
                cb(err);
            cb();
        });
    },

    //SUpprime toutes les tâches faites : 
    deleteTask_Done : function(cb) {
        Tache.deleteMany({
            done : true
        }, function(err) {
            if (err)
                cb(err);
            cb();
        });
    },

    //Supprime une tâche : 
    delete : function(param,cb) {
        //console.log(param);
        Tache.deleteOne({
            _id : param.tache_id
        }, function(err) {
            if (err)
                cb(err);
            Liste.findByIdAndUpdate(param.id, {$pull: {tasks: param.tache_id}}, {'new':false}, cb);
        });
    },

    //Rajoutement d'une collaboration : 
    createCollab: function(data,cb){
        if(typeof data.name != "undefined") {
            User.findOne({ username: data.name }).then(user => {
                if(user == null) cb(false);
                User.findByIdAndUpdate(user._id, {$push: {listes: data.list_id}}, {'new':true})
                    .then(user => { Liste.findByIdAndUpdate(data.list_id, {$push: {collaboraters: user._id}}, {'new':true}, cb);});
            });
        }
    }
    
}

module.exports = dataLayer;