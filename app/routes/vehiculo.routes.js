var router = require("express").Router();
var VehiculoController = require("../controllers/vehiculo.controller");

router.route('/vehiculos/usuario/:usuario_id')
    .get(VehiculoController.getVehiclesByUser);

module.exports = router;
