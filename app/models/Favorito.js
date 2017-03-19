var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritoSchema = new Schema({
    usuario: {
        type: number

    },
    gasolinera: {
        type :number
    }
});

module.exports = mongoose.model('Favorito', favoritoSchema);

