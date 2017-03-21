var router = require("express").Router();
var PuntuacionController = require("../controllers/puntuacion.controller");

router.route('/gasolinera/:gasolinera_id/puntuacion')
    .get(PuntuacionController.getScoreByGas);

router.route('/puntuacion/create')
    .post(PuntuacionController.addScore);

module.exports = router;