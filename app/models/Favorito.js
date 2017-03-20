var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritoSchema = new Schema({
    usuario: {
        type: Number,
        required: true
    },
    gasolinera: {
        type : Number,
        required: true
    }
});

module.exports = mongoose.model('Favorito', favoritoSchema);

