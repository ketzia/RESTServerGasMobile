var mongoose    = require('mongoose');
var crypto      = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: true
    },
    apellidoMaterno: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    if(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    }
};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    var token = jwt.sign({
        _id: this._id,
        email: this.email,
        nombre: this.nombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        exp: parseInt(expiry.getTime() / 1000)
    },"MY_SECRET");
    return token;
};

module.exports = mongoose.model('Usuario',userSchema);