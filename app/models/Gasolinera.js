var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var gasolineraSchema = new mongoose.Schema({
    nombre :{
        type: String
    },
    delegacion: {
        type: Schema.Types.ObjectId,
        ref: 'Delegacion'
    }
});