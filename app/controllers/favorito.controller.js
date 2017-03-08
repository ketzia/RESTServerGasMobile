var Favorito = require('../models/Favorito');
var isValid = require("mongoose").Types.ObjectId.isValid;
var ObjectId = require("mongoose").Types.ObjectId;

exports.getFavoriteByUser = function(req, res) {
    if (!req.params.usuario_id) return res.status(400).send({err: "Se necesita un usuario"});
    if (!isValid(req.params.usuario_id)) return res.status(400).send({err: "Usuario invalido"});

    Favorito.find({usuario: new ObjectId(req.params.usuario_id)}, function (err, favoritos) {
        console.log(req.params.usuario_id);
        if (err) return res.status(500).send({err: err});
        res.send(favoritos);
    });
};
exports.createFavorite = function (req,res) {
    if(!req.body.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.body.gasolinera) return res.status(400).send({err: "Se necesita una gaoslinera"});
    if(!isValid(req.body.usuario_id)) return res.status(400).send({err: "Usuario invalido"});
    if(!isValid(req.body.gasolinera)) return res.status(400).send({err: "Gasolinera invalido"});

    var favorito = new Favorito();
    favorito.usuario = req.body.usuario_id;
    favorito.gasolinera = req.body.favorito;

    favorito.save(function(err){
        if(err) return res.status(500).send({err: err});
        // Todo enviar token
        res.status(200).send({msg:"Favoritos actualizados"});
    });

};