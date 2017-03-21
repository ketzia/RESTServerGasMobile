var users = require('./routes/user.routes');
var vehiculos = require('./routes/vehiculo.routes');
var gastos = require('./routes/gasto.routes');
var favoritos = require('./routes/favorito.routes');
var puntuacion = require('./routes/puntuacion.routes');

var apiRoutes = function(app){
        app.use('/api',users);
        app.use('/api',vehiculos);
        app.use('/api', gastos);
        app.use('/api', favoritos);
        app.use('/api',puntuacion);


};

module.exports = apiRoutes;