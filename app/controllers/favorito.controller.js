var Favorito = require('../models/Favorito');
var isValid = require("mongoose").Types.ObjectId.isValid;
var ObjectId = require("mongoose").Types.ObjectId;
var Usuario = require('../models/Usuario');

exports.getFavoriteByUser = function(req, res) {
    if (!req.params.usuario_id) return res.status(400).send({err: "Se necesita un usuario"});
    if (!isValid(req.params.usuario_id)) return res.status(400).send({err: "Usuario invalido"});

    Usuario.findById(req.params.usuario_id, function(err, usuario){
        if(!usuario) return res.status(400).send({err: "SNo se encontró un usuario con ese id"});
        if(err) return res.status(500).send({err:err});

        var json = {
          favoritos : usuario.favoritos
        };
        return res.status(200).send(json);
    });
};

//Usuario_id
// Gasolinera_id
exports.addUserFavorite = function (req,res) {

    if(!req.body.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.body.gasolinera_id) return res.status(400).send({err: "Se necesita una gaoslinera"});
    if(!isValid(req.body.usuario_id)) return res.status(400).send({err: "Usuario invalido"});

    Usuario.findById(req.body.usuario_id, function(err,usuario){
        if(!usuario) return res.status(400).send({err:"No se encontró un usuario con ese id"});
        if(err) return res.status(500).send({err:err});

        // Se verifica aqui si el favorito a aniadir ya se encuentra en los favoritos del usuario
        for(var i=0; i<usuario.favoritos.length;i++){
            if(usuario.favoritos[i] === req.body.gasolinera_id){
                return res.status(500).send({err: "Esa gasolinera ya está en tus favoritos"}); //Hace el return en caso de que sea verdadero se sale de la funcion
            }
        }
        //En caso de ser un favorito no repetido se mete en el arreglo
        usuario.favoritos.push(req.body.gasolinera_id);
        usuario.save(function(err){
            if(err) return res.status(500).send({err:err});
            res.status(200).send({msg: "Gasolinera añadida a favoritos"});
        });
    });

};
//En delete se tiene que pasar a tarves de la url, no en el body
exports.deleteUserFavorite = function(req,res){
    if(!req.params.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.params.gasolinera_id) return res.status(400).send({err: "Se necesita una gasolinera"});

    //Se checa si existe un usuario con el idea que se pasa en el url, o si se paso un usuario en el url
    Usuario.findById(req.params.usuario_id, function(err,usuario){
        if(!usuario) return res.status(400).send({err:"No se encontró un usuario con ese id"});
        if(err) return res.status(500).send({err:err});

        //se recorre el arreglo de favoritos (el arreglo de favoritos se encuentra dentro del suaurio)
        for(var i=0; i<usuario.favoritos.length;i++){
            var favorito = usuario.favoritos[i];
            // 3 iguales compara el valor y el tipo de dato
            // si hay un favorito dentro del usuario que sea igual al que se pasa en el url, se utiliza la funcion splice, splice(indice a partir del que se va a borrar de manera
            // inclusiva, numero de elementos que se borraran a partir de ese indice)
            if(favorito === req.params.gasolinera_id){
                usuario.favoritos.splice(i,1);
            }
        }
        //se guarda el usuario
        usuario.save(function(err){
            if(err) return res.status(500).send({err:err});
            res.status(200).send({msg: "Gasolinera removida satisfactoriamente"});
        });
    });

};