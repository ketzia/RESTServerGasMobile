var router = require("express").Router();
var VehiculoController = require("../controllers/vehiculo.controller");

router.route('/vehiculos/usuario/:usuario_id')
    .get(VehiculoController.getVehiclesByUser);

router.route('/vehiculos/create')
    .post(VehiculoController.createVehicle);

router.route('/vehiculos')
    .get(VehiculoController.getVehicles);

module.exports = router;
