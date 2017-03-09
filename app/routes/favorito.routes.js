var router = require('express').Router();
var FavoritoController = require('../controllers/favorito.controller');


router.route('/favoritos/usuario/:usuario_id')
            .get(FavoritoController.getFavoriteByUser);

router.route('/favoritos/usuario/create')
    .post(FavoritoController.addUserFavorite);

router.route('/favoritos/usuario/:usuario_id/gasolinera/:gasolinera_id')
    .delete(FavoritoController.deleteUserFavorite);

module.exports = router;