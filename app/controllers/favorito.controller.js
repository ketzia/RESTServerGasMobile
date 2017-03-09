var Favorito = require('../models/Favorito');
var isValid = require("mongoose").Types.ObjectId.isValid;
var ObjectId = require("mongoose").Types.ObjectId;
var Usuario = require('../models/Usuario');

exports.getFavoriteByUser = function(req, res) {
    if (!req.params.usuario_id) return res.status(400).send({err: "Se necesita un usuario"});
    if (!isValid(req.params.usuario_id)) return res.status(400).send({err: "Usuario invalido"});

    Favorito.find({usuario: new ObjectId(req.params.usuario_id)}, function (err, favoritos) {
        console.log(req.params.usuario_id);
        if (err) return res.status(500).send({err: err});
        res.send(favoritos);
    });
};

//Usuario_id
// Gasolinera_id
exports.addUserFavorite = function (req,res) {
    console.log("holi");
    if(!req.body.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.body.gasolinera_id) return res.status(400).send({err: "Se necesita una gaoslinera"});
    if(!isValid(req.body.usuario_id)) return res.status(400).send({err: "Usuario invalido"});

    Usuario.findById(req.body.usuario_id, function(err,usuario){
        if(!usuario) return res.status(400).send({err:"No se encontró un usuario con ese id"});
        if(err) return res.status(500).send({err:err});
        //Se estan agregando favoritos
        usuario.favoritos.push(req.body.gasolinera_id);
        usuario.save(function(err){
            if(err) return res.status(500).send({err:err});
            res.status(200).send({msg: "Gasolinera añadida a favoritos"});
        });
    });

};
//En delete se tiene que pasar a tarves de la url
exports.deleteUserFavorite = function(req,res){
    if(!req.params.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.params.gasolinera_id) return res.status(400).send({err: "Se necesita una gasolinera"});

    Usuario.findById(req.params.usuario_id, function(err,usuario){
        if(!usuario) return res.status(400).send({err:"No se encontró un usuario con ese id"});
        if(err) return res.status(500).send({err:err});

        for(var i=0; i<usuario.favoritos.length;i++){
            var favorito = usuario.favoritos[i];
            // 3 iguales compara el valor y el tipo de dato
            if(favorito === req.params.gasolinera_id){
                usuario.favoritos.splice(i,1);
            }
        }
        usuario.save(function(err){
            if(err) return res.status(500).send({err:err});
            res.status(200).send({msg: "Gasolinera removida satisfactoriamente"});
        });
    });

};