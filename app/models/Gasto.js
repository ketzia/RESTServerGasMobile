var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var GastoSchema = new mongoose.Schema({
    monto :{
        type:Number,
        required: true

    },
    fecha :{
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

module.exports = mongoose.model('Gasto',gastoSchema);