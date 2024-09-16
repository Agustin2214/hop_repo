const mockStarship = {
    name: "Death Star",
    model: "DS-1 Orbital Battle Station",
    manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
    cost_in_credits: "1000000000000",
    MGLT: "10",
    length: "120000",
    max_atmosphering_speed: "n/a",
    crew: "342,953",
    passengers: "843,342",
    cargo_capacity: "1000000000000",
    consumables: "3 years",
    hyperdrive_rating: "4.0",
    starship_class: "Deep Space Mobile Battlestation",
    films: [
      "https://swapi.dev/api/films/1/"
    ],
    pilots: [],
    created: "2014-12-10T16:36:50.509000Z",
    edited: "2014-12-20T21:26:24.783000Z",
    url: "https://swapi.dev/api/starships/9/",
    count: 20, 
  };
  

  const request = require('supertest');
//   const server = require('../apptest');  
  const sinon = require('sinon');
  const { expect } = require('@jest/globals');
  const StarshipsService = require('../services/StarshipService');
  const SequelizeInventoryRepository = require('../repositories/SequelizeInventoryRepository');
  const SwapiService = require('../services/SwapiService');
const Server = require('../models/server');
  
  const swapiService = new SwapiService();
  const inventoryRepository = new SequelizeInventoryRepository();
  const starshipService = new StarshipsService(swapiService, inventoryRepository);
  let app;
  let server;
  describe('Starship Controller', () => {
    afterEach(() => {
        sinon.restore();  
    });
    beforeAll(() => {
        server = new Server(5002);
         server.listen();
         app = server.app;
       });
       afterAll((done) => {
        server.close(done);
      });

      test('PUT /api/inventory/starships/:id crear o editar inventario', async () => {
          const id = '9';
          const count = 20;
          const response = await request(app)
          .put(`/api/inventory/starships/${id}`)
          .send({ count: count });
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'Inventario actualizado', count: count });
      });
  
      test('GET /api/inventory/starships/:id should return starship with inventory count', async () => {
          const id = '9';
          sinon.stub(swapiService, 'getStarshipById').returns(mockStarship);
          sinon.stub(inventoryRepository, 'getInventoryBySwapiId').returns(mockStarship.count);
          const response = await request(app).get(`/api/inventory/starships/${id}`);
  
          const expectedResponse = {
              ...mockStarship,
              count: mockStarship.count,
          };
  
          expect(response.status).toBe(200);
          expect(response.body).toEqual(expectedResponse);
      });
  
      test('PUT /api/inventory/starships/:id/add incrementar contador', async () => {
          const id = '9';
          const quantityToAdd = 20;
          const initialCount = 20;
          const updatedCount = initialCount + quantityToAdd;
  
          const response = await request(app)
              .put(`/api/inventory/starships/${id}/add`)
              .send({ quantity: quantityToAdd });
  
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'Inventario actualizado', count: updatedCount });
      });
  
      test('PUT /api/inventory/starships/:id/subtract decrementar contador', async () => {
          const id = '9';
          const quantityToSubtract = 10;
          const initialCount = 40;
          const updatedCount = initialCount - quantityToSubtract;
  
          sinon.stub(inventoryRepository, 'updateInventoryCountSubtract').returns(updatedCount);
  
          const response = await request(app)
              .put(`/api/inventory/starships/${id}/subtract`)
              .send({ quantity: quantityToSubtract });
  
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'Inventario actualizado', count: updatedCount });
      });
  
      test('PUT /api/inventory/starships/:id/subtract decrementar a menos de 0', async () => {
          const id = '9';
                    sinon.stub(inventoryRepository, 'updateInventoryCountSubtract').throws(new Error('Error al actualizar'));
  
          const response = await request(app)
              .put(`/api/inventory/starships/${id}/subtract`)
              .send({ quantity: 40 });
  
          expect(response.status).toBe(400);
          expect(response.body).toEqual({ message: 'Error al actualizar el inventario', error: 'No se puede decrementar el inventario a menos de 0' });
      });
 
  });
  