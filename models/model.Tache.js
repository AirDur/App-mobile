var mongoose = require('mongoose');

var Tache = mongoose.model('Tache', {
    text : String,
    date : Date,
    creator : String,
    done : Boolean
  });

module.exports = Tache;