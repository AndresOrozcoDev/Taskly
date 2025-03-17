const createError = require("http-errors");

function errorHandler(err, req, res, next) {
  // Determinar el código de estado
  const statusCode = err.status || 500;

  // Definir mensaje de error
  const message = err.message || "Internal Server Error";

  // Si estamos en desarrollo, incluir el stack trace
  const errorResponse = {
    status: statusCode,
    message: message,
    ...(req.app.get("env") === "development" && { stack: err.stack }),
  };

  // Responder con JSON si es una API, de lo contrario renderizar la vista de error
  if (req.accepts("json")) {
    res.status(statusCode).json(errorResponse);
  } else {
    res.status(statusCode);
    res.render("error", { message, error: req.app.get("env") === "development" ? err : {} });
  }
}

module.exports = errorHandler;
