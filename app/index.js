var users = require('./routes/user.routes');
var vehiculos = require('./routes/vehiculo.routes');

var apiRoutes = function(app){
        app.use('/api',users);
        app.use('/api',vehiculos);
};

module.exports = apiRoutes;