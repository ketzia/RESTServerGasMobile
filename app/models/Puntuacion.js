var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var puntuacionSchema  = new Schema ({
    gasolinera :{
        type : String,
        required: true

    },
    puntuacion :{
        type : Number,
        required: true
    },
    usuario :{
        type : Number,
        required : true
    }
});

mongoose.exports = mongoose.model('Puntuacion', puntuacionSchema);