const express = require("express");
const cors = require("cors");
const db = require("../db/connection");
const swaggerConfig = require("../utils/swagger");

class Server {
  constructor(port) {
    this.app = express();
    this.port = port 
    //Rutas

    //Conexión a la base de datos
    this.dbConnection();

    // Lectura y parseo a JSON
    this.app.use(express.json());

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async dbConnection() {
    try {
      await db.sync({ force: false });
      console.log('DB ONLINE')
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    // Configurar Swagger
    swaggerConfig(this.app);

    // Directorio público
    this.app.use(express.static("public"));

    // Cors
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/inventory", require("../routes/inventoryRoutes"));
  }

  listen() {
    this.server = this.app.listen(this.port, () => {
      // Ahora asignamos la referencia del servidor a this.server
      console.log(`Server running on port`,this.port)
      console.log(`Documentation: /api-docs/#/`)
    });
  }

  close(callback) {
    if (this.server) {
      this.server.close(callback);
      this.server = null; 
    } else {
      callback();
    }
  }
}

module.exports = Server;
