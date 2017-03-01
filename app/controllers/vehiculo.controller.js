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
    if(!req.body.anio) return res.status(400).send({err: 'Se necesita un anio'});
    if(!req.body.marca) return res.status(400).send({err: 'Se necesita una marca'});
    if(!req.body.modelo) return res.status(400).send({err: 'Se necesita un modelo'});

    var vehiculo = new Vehiculo();
    vehiculo.marca = req.body.marca;
    vehiculo.anio = req.body.anio;
    vehiculo.modelo = req.body.modelo;
    vehiculo.usuario = req.body.usuario;


    vehiculo.save(function(err){
        if(err) return res.status(500).send({err: err});
        // Todo enviar token
        res.status(200).send({msg:"Vehiculo creado"});
    });
}