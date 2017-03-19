var Favorito = require('../models/Favorito');
var isValid = require("mongoose").Types.ObjectId.isValid;
var ObjectId = require("mongoose").Types.ObjectId;
var Usuario = require('../models/Usuario');

exports.getFavoriteByUser = function(req, res) {
    if (!req.params.usuario_id) return res.status(400).send({err: "Se necesita un usuario"});
    //if (!isValid(req.params.usuario_id)) return res.status(400).send({err: "Usuario invalido"});

    Favorito.find({usuario : new ObjectId(req.params.usuario_id)},function(err,favoritos){
        console.log(req.params.usuario_id);
        if(err) return res.status(500).send({err:err});
        res.send(favoritos);
    });
};

//Usuario_id
// Gasolinera_id
exports.addUserFavorite = function (req,res) {

    if(!req.body.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.body.gasolinera_id) return res.status(400).send({err: "Se necesita una gaoslinera"});
    var favorito = new Favorito();
    favorito.usuario_id = req.body.usuario_id;
    favorito.gasolinera_id = req.body.gasolinera_id;

    //Then we need to save all the data
    favorito.save(function(err){
        if(err) return res.status(500).send({err: err});
        // Todo enviar token
        res.status(200).send({msg:"Gasto creado"});
    });

};
//En delete se tiene que pasar a tarves de la url, no en el body
exports.deleteUserFavorite = function(req,res){
    if(!req.params.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.params.gasolinera_id) return res.status(400).send({err: "Se necesita una gasolinera"});

    //Se checa si existe un usuario con el idea que se pasa en el url, o si se paso un usuario en el url
    Favorito.findById(req.params.gasto_id, function(err,favorito) {
        if (!favorito) return res.status(400).send({err: "No se encontró ese favorito"});
        if (err) return res.status(500).send({err: err});
        // gasto.set('gasto_id', undefined, {strict: false} );

        favorito.remove(function(err) {
            if(err) return res.status(500).send({err:err});
            return res.status(200).send({msg: 'Favorito removido'});
        });

    });

};