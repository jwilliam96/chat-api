const {
  errorHandler,
  errorLogger,
  notFoundErrorHandler,
  ormErrorHandler,
  jwtErrorHandler,
} = require("../middlewares/errors.middleware");

const errorRoutes = (app) => {
  app.use(errorLogger); // mostramos el error por consola
  app.use(errorHandler); // errores personales
  app.use(ormErrorHandler); // buscamos si el error es del ORM
  app.use(notFoundErrorHandler); //mandamos 404 para rutas no encontradas
  app.use(jwtErrorHandler);
};

module.exports = errorRoutes;
