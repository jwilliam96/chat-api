const fs = require("node:fs/promises");
const path = require("path");
// importamos las clases de los errores de sequelize
const {
  ConnectionError,
  ValidationError,
  DatabaseError,
} = require("sequelize");

const getError = (req, err, res) => {
  const { body, url, method } = req;
  console.log(body);
  const formatBody = body ? JSON.stringify(body) : null;
  const { status, ...error } = err;
  return (
    `req: ${method} ${url} body: ${formatBody} \nres: status: ${status}, ${JSON.stringify(
      error
    )}` + "\n\n"
  );
};

const errorLogger = (err, req, res, next) => {
  const date = new Date().toLocaleString();
  console.log(err);
  const filePath = path.join(__dirname, `../logs/logs.txt`);
  fs.appendFile(
    filePath,
    `========================ERROR ${date}===========================\n`
  );

  fs.appendFile(filePath, getError(req, err, res)); // convierte el error en un texto en json // la \n es salto de linea
  next(err);
};

const ormErrorHandler = (err, req, res, next) => {
  //aqui llega un error lanzado en un controlador
  // verificamos si este error fue creado con la clase Connection error
  if (err instanceof ConnectionError) {
    return res.status(409).json({
      error: "database connection error",
      message: err.name,
    });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: err.name,
      message: err?.original?.detail,
      errors: err.errors,
    });
  }
  if (err instanceof DatabaseError) {
    return res.status(409).json({
      error: err.name,
      message: err?.message,
      errors: err.errors,
    });
  }

  next(err);
};

const jwtErrorHandler = (err, req, res, next) => {
  const jwtError = ["TokenExpiredError", "JsonWebTokenError"];

  if (jwtError.includes(err.name)) {
    return res.status(401).json({
      error: err.name,
      message: err.message,
    });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const { status, ...error } = err;
  res.status(err.status || 500).json(error);
  next(err);
};

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "not found",
    messager: "The requested resource is not into the server",
  });
};

module.exports = {
  errorLogger,
  errorHandler,
  notFoundErrorHandler,
  ormErrorHandler,
  jwtErrorHandler,
};
