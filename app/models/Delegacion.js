var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var delegacionSchema = new mongoose.Schema({

    nombre :{
        type: String,
        unique: true,
        require: true
    }


});

module.exports = mongoose.model('Delegacion',delegacionSchema);