var router = require('express').Router();
var GastoController = require('../controllers/gasto.controller');

router.route('/gastos/usuario/:usuario_id')
        .get(GastoController.getExpenseByUser);

router.route('/gastos/create')
        .post(GastoController.createExpense);

module.exports = router;