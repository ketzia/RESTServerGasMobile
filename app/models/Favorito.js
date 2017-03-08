var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    gasolinera: {
        type :Schema.Types.ObjectId,
        ref: 'Gasolinera'
    }
});

module.exports = mongoose.model('Favorito', favoritoSchema);

