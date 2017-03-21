var Puntuacion = require('../models/Puntuacion');
var isValid = require("mongoose").Types.ObjectId.isValid;
var ObjectId = require("mongoose").Types.ObjectId;
var Gasolinera = require('../models/Gasolinera');

exports.getScoreByGas = function(req,res){
    if(!req.params.gasolinera_id) return res.status(400).send({err:err});

    Puntuacion.find({gasolinera : req.params.gasolinera_id}, function(req,puntuacion){
        if(err) return res.status(500).send({err:err});
        res.send({puntuacions: puntuacion});
    });
};

exports.addScore = function(req,res){
    if(!req.body.usuario_id) return res.status(400).send({err:"Se necesita un usuario"});
    if(!req.body.gasolinera_id) return res.status(400).send({err:"Se necesita una gasolinera"});
    if(!req.body.puntuacion) return res.status(400).send({err:"Se nesecita una puntuacion"});

    var puntuacion = new Puntuacion();
    puntuacion.gasolinera = req.body.gasolinera_id;
    puntuacion.usuario = req.body.usuario_id;
    puntuacion.puntuacion = req.body.puntuacion;

    puntuacion.save(function(err){
        if(err) return res.status(500).send({err: err});
        res.status(200).send({msg:"Puntuacion creada"});
    });
};