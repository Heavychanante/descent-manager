// Función middleware para comprobar está autenticado al acceder a los servicios REST
module.exports = {
  auth: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  }
};
