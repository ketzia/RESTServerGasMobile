var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gastoSchema = new mongoose.Schema({
    usuario: {
        type: Number,
        required: true
    },
    monto :{
        type:Number,
        required: true
    },
    fecha :{
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('Gasto',gastoSchema);