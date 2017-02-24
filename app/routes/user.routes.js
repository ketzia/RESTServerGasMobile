var router = require("express").Router();
var  UserController = require('../controllers/user.controller');

router.route('/users')
    .get(UserController.getUsers);


module.exports = router;