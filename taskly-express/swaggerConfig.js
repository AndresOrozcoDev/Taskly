const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'Documentación generada con Swagger para una aplicacion de Express sobre autenticación de usuarios.',
      contact: {
        name: 'Andres Orozco',
        url: 'https://github.com/AndresOrozcoDev',
        email: 'andres.orozco.dev@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'http://localhost:4200',
        description: 'Frontend local server',
      },
      {
        url: 'https://luminous-starship-eb26e8.netlify.app',
        description: 'Frontend production server',
      }
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints for managing authentication.',
      }
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
