var Gasto = require('../models/Gasto');
var isValid = require('mongoose').Types.ObjectId.isValid;
var ObjectId = require("mongoose").Types.ObjectId;


//preguntar sobre la promesa
exports.getExpenseByUser = function(req,res){
    if(!req.params.usuario_id) return res.status(400).send({err: "Se necesita un usuario"});

    Gasto.find({usuario : req.params.usuario_id},function(err,gastos){
        console.log(req.params.usuario_id);
        if(err) return res.status(500).send({err:err});
        res.send(gastos);
    });

};

exports.createExpense = function(req,res){
    if(!req.body.usuario_id) return res.status(400).send({err: "Se necesita un usuario"});
    if(!req.body.monto) return res.status(400).send({err: "Se necesita un monto"});
    if(!req.body.fecha) return res.status(400).send({err: "Se necesita una fecha "});
    // A new expense is created
    // We take the parameters from the body
    var gasto = new Gasto();
    gasto.monto = req.body.monto;
    gasto.fecha = req.body.fecha;
    gasto.usuario = req.body.usuario_id;

    //Then we need to save all the data
    gasto.save(function(err){
        if(err) return res.status(500).send({err: err});
        // Todo enviar token
        res.status(200).send({msg:"Gasto creado"});
    });
};

exports.deleteExpense = function(req,res){
    if(!req.params.usuario_id) return res.status(400).send({err:err});
    if(!req.params.gasto_id) return res.status(400).send({err:err});

    Gasto.findById(req.params.gasto_id, function(err,gasto) {
        if (!gasto) return res.status(400).send({err: "No se encontró ese gasto"});
        if (err) return res.status(500).send({err: err});
       // gasto.set('gasto_id', undefined, {strict: false} );

        gasto.remove(function(err) {
            if(err) return res.status(500).send({err:err});
            return res.status(200).send({msg: 'Gasto removido'});
        });


    });
};