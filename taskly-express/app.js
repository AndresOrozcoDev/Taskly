var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var swaggerUi = require('swagger-ui-express');
var swaggerSpec = require('./swaggerConfig');
var errorHandler = require("./middlewares/errorHandler");

var indexRouter = require('./routes/index');
var authRouter = require('./routes/v1/auth');

var app = express();

// Configuración del motor de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middlewares básicos
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Configuración de CORS
const corsOptions = {
  origin: [
    "http://localhost:4200",
    "https://luminous-starship-eb26e8.netlify.app",
  ],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

// Rutas principales
app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);

// Capturar errores 404 y pasarlos al manejador de errores
app.use((req, res, next) => {
  next(createError(404, "Recurso no encontrado"));
});

// Middleware de manejo de errores centralizado
app.use(errorHandler);

module.exports = app;
