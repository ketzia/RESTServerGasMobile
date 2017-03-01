var jwt = require('jsonwebtoken');
var Usuario = require('../models/Usuario');

exports.getUsers = function(req,res){
    // Usar mongoose para obtener todos los usuarios, le pasas un json vacio como argumento para que encuentre todos
    Usuario.find({},function(err,usuarios){
        // Si hay un error, mandas un 500 y el error
        if(err) return res.status(500).send({err: err});
        // Si no hay errores mandas el array de usuarios
        res.send(usuarios);
    });
};

exports.postUser = function(req,res){
    // Verificar si todos los campos necesarios para crear un usuario estan presentes
    if(!req.body.email) return res.status(400).send({err: 'Se necesita un email para crear usuario'});
    if(!req.body.nombre) return res.status(400).send({err: 'Se necesita un nombre para crear usuario'});
    if(!req.body.apellidoPaterno) return res.status(400).send({err: 'Se necesita un apellido paterno para crear usuario'});
    if(!req.body.apellidoMaterno) return res.status(400).send({err: 'Se necesita un apellido materno para crear usuario'});
    if(!req.body.password) return res.status(400).send({err: 'Se necesita una contrasenia para crear usuario'});

    // Empezar a crear el nuevo usuario
    var usuario = new Usuario();
    usuario.email = req.body.email;
    usuario.nombre = req.body.nombre;
    usuario.apellidoPaterno = req.body.apellidoPaterno;
    usuario.apellidoMaterno = req.body.apellidoMaterno;
    usuario.setPassword(req.body.password);

    usuario.save(function(err){
       if(err) return res.status(500).send({err: err});
       // Todo enviar token
       res.status(200).send({msg:"Usuario creado"});
    });
};

exports.loginUser = function(req,res){
    // Verificar si los campos necesarios para hacer login estan presentes
    if(!req.body.email) return res.status(400).send({err: 'Se necesita un email para hacer login'});
    if(!req.body.password) return res.status(400).send({err: 'Se necesita una contrasenia para hacer login'});

    Usuario.findOne({email: req.body.email},function(err,usuario){
        if(err) return res.status(500).send({err: err});
        if(!usuario) return res.status(404).send({err: 'Usuario no encontrado'});

        if(usuario.validPassword(req.body.password)){
            // Si la contraseña es valida entonces mandamos un 200
            // Todo mandar token en vez de esto
            res.status(200).send({msg:"Te has logueado satisfactoriamente"})
        }else{
            res.status(401).send({msg:"Contraseña o usuario incorrecto"});
        }
    });

};


