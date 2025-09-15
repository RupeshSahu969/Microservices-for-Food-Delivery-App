const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic swagger definition
const options = {
  definition: {
    openapi: '3.0.0',  // Use OpenAPI 3.0 standard
    info: {
      title: 'My Microservice API',
      version: '1.0.0',
      description: 'API documentation for my Node.js microservice',
    },
    servers: [
      {
        url: 'http://localhost:8001', // Change to your server URL & port
      },
    ],
  },
  apis: ['./src/api/*.js'],  // Path to the API route files to scan for annotations
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
