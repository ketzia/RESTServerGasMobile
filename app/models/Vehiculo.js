var mongoose    = require('mongoose');
var crypto      = require('crypto');
var Schema = mongoose.Schema;

var vehiculoSchema = new mongoose.Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});



module.exports = mongoose.model('Vehiculo',vehiculoSchema);