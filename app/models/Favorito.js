var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritoSchema = new Schema({
    usuario: {
        type: number,
        required: true
    },
    gasolinera: {
        type :number,
        required: true
    }
});

module.exports = mongoose.model('Favorito', favoritoSchema);

