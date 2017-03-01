var mongoose    = require('mongoose');
var crypto      = require('crypto');
var Schema = mongoose.Schema;

var vehiculoSchema = new mongoose.Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    marca:{
        type: String,
        required: true
    },
    modelo :{
        type: String,
        required: true
    },
    anio :{
        type: Number,
        required: true

    }
});



module.exports = mongoose.model('Vehiculo',vehiculoSchema);