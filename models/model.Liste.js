var mongoose = require('mongoose');

//Format des données de Liste : 
var Liste = mongoose.model('Liste', {
    name : String,
    description : String,
    creator : String,
    tasks: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tache'
      }
    ],
    collaboraters: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
    ]
});

module.exports = Liste;

