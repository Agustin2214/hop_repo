const mockVehicle = {
  name: "Sand Crawler",
  model: "Digger Crawler",
  manufacturer: "Corellia Mining Corporation",
  cost_in_credits: "150000",
  length: "36.8 ",
  max_atmosphering_speed: "30",
  crew: "46",
  passengers: "30",
  cargo_capacity: "50000",
  consumables: "2 months",
  vehicle_class: "wheeled",
  films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/5/"],
  pilots: [],
  created: "2014-12-10T15:36:25.724000Z",
  edited: "2014-12-20T21:30:21.661000Z",
  url: "https://swapi.dev/api/vehicles/4/",
  count: 20, // Asegúrate de que el count esté en el mock
};

const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("@jest/globals");
const VehiclesService = require("../services/VehicleService");
const SequelizeInventoryRepository = require("../repositories/SequelizeInventoryRepository");
const SwapiService = require("../services/SwapiService");
const Server = require("../models/server");

const swapiService = new SwapiService();
const inventoryRepository = new SequelizeInventoryRepository();
const vehicleService = new VehiclesService(swapiService, inventoryRepository);
let app;
let server;
describe("Vehicle Controller", () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeAll(() => {
    server = new Server(5001);
    server.listen();
    app = server.app;
  });
  afterAll((done) => {
    server.close(done);
  });
  

  test(
    "PUT" + "/api/inventory/vehicles/:id crear o editar inventario ",
    async () => {
      const id = "4";
      const count = 20;

      const response = await request(app)
        .put(`/api/inventory/vehicles/${id}`)
        .send({ count: count });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Inventario actualizado",
        count: count,
      });
    }
  );

  test("GET /api/inventory/vehicles/:id should retornar el inventario de <id> vehiculo", async () => {
    const id = "4";

    sinon.stub(swapiService, "getVehiclesById").returns(mockVehicle);

    sinon
      .stub(inventoryRepository, "getInventoryBySwapiId")
      .returns(mockVehicle.count);

    const response = await request(app).get(`/api/inventory/vehicles/${id}`);

    const expectedResponse = {
      ...mockVehicle,
      count: mockVehicle.count,
    };

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  test("PUT /api/inventory/vehicles/:id/add incrementar contador", async () => {
    const id = "4";
    const quantityToAdd = 20;
    const initialCount = 20; // El valor inicial debe ser el que estás usando
    const updatedCount = initialCount + quantityToAdd;

    const response = await request(app)
      .put(`/api/inventory/vehicles/${id}/add`)
      .send({ quantity: quantityToAdd });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Inventario actualizado",
      count: updatedCount,
    });
  });

  test("PUT /api/inventory/vehicles/:id/subtract decrementar contador", async () => {
    const id = "4";
    const quantityToSubtract = 10;
    const initialCount = 40;
    const updatedCount = initialCount - quantityToSubtract;

    sinon
      .stub(inventoryRepository, "updateInventoryCountSubtract")
      .returns(updatedCount);

    const response = await request(app)
      .put(`/api/inventory/vehicles/${id}/subtract`)
      .send({ quantity: quantityToSubtract });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Inventario actualizado",
      count: updatedCount,
    });
  });

  test("PUT /api/inventory/vehicles/:id/subtract decrementar a menos de 0", async () => {
    const id = "4";

    sinon
      .stub(inventoryRepository, "updateInventoryCountSubtract")
      .throws(new Error("Error al actualizar"));

    const response = await request(app)
      .put(`/api/inventory/vehicles/${id}/subtract`)
      .send({ quantity: 40 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Error al actualizar el inventario",
      error: "No se puede decrementar el inventario a menos de 0",
    });
  });
});
