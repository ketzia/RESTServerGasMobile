var Vehiculo = require("../models/Vehiculo");
var isValid = require("mongoose").Types.ObjectId.isValid;

exports.getVehiclesByUser = function(req, res){
    if(!req.params.usuario_id) return res.status(400).send({err: 'Se necesita un usuario'});
    if(!isValid(req.params.usuario_id)) return res.status(400).send({err: 'Se necesita un usuario válido'});

    Vehiculo.find({usuario : req.params.usuario_id},function(err,vehiculos){
        if(err) return status(500).send({err:err});
        res.send(vehiculos);
    });
};

exports.createVehicle = function(req,res){

    if(!req.body.usuario_id) return res.status(400).send({err : 'Se necesita un usuario'});
    if(!isValid(req.body.usuario_id)) return res.status(400).send({err: 'Se necesita un usuario válido'});

}