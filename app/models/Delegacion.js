var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var delegacionSchema = new mongoose.Schema({
    nombre :{
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Delegacion',delegacionSchema);