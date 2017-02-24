var users = require('./routes/user.routes');

var apiRoutes = function(app){
        app.use('/api',users);
};

module.exports = apiRoutes;