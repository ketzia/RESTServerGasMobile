var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gastoSchema = new mongoose.Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
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