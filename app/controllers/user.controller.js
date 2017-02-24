var jwt = require('jsonwebtoken');

exports.getUsers = function(req,res){
        console.log("hola desde users");
        console.log("hola desde users");
        res.status(200).json({
            "message" : "Hola desde Users"
        });
};