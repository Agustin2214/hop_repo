const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../utils/swagger.json'); // Ajusta la ruta según la ubicación del archivo

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};