var router = require('express').Router();
var FavoritoController = require('../controllers/favorito.controller');


router.route('/favoritos/usuario/:usuario_id')
            .get(FavoritoController.getFavoriteByUser);

router.route('/favoritos/create')
    .post(FavoritoController.createFavorite);

module.exports = router;