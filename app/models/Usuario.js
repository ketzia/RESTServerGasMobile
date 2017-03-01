var mongoose    = require('mongoose');
var crypto      = require('crypto');

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
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex')
    return this.hash === hash;
};

module.exports = mongoose.model('Usuario',userSchema);