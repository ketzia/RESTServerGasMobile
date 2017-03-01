var router = require("express").Router();
var  UserController = require('../controllers/user.controller');

router.route('/usuarios')
    .get(UserController.getUsers)
    .post(UserController.postUser);

router.route('/usuarios/login')
    .post(UserController.loginUser);

module.exports = router;