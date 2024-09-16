const SequelizeInventoryRepository = require('../repositories/SequelizeInventoryRepository');
const Inventory = require('../models/Inventory');
const sinon = require('sinon');

describe('SequelizeInventoryRepository', () => {
  let repository;
  let findOneStub, findOrCreateStub, saveStub;

  beforeEach(() => {
    repository = new SequelizeInventoryRepository();
    findOneStub = sinon.stub(Inventory, 'findOne');
    findOrCreateStub = sinon.stub(Inventory, 'findOrCreate');
    saveStub = sinon.stub(Inventory.prototype, 'save');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getInventoryBySwapiId debe devolver el inventario correcto', async () => {
    const mockInventory = { count: 5 };
    findOneStub.resolves(mockInventory);

    const result = await repository.getInventoryBySwapiId(1);

    expect(result).toBe(5);
  });

  it('upsertInventory debe crear un nuevo inventario si no existe', async () => {
    const mockInventory = { count: 10 };
    findOrCreateStub.resolves([mockInventory, true]);

    const result = await repository.upsertInventory(1, 10);

    expect(result).toBe(10);
  });

  it('updateInventoryCountAdd debe incrementar el inventario correctamente', async () => {
    const mockInventory = { count: 5, save: saveStub };
    findOneStub.resolves(mockInventory);

    const result = await repository.updateInventoryCountAdd(1, 3);

    expect(result).toBe(8);
  });

  it('updateInventoryCountSubtract debe lanzar error si el inventario es negativo', async () => {
    const mockInventory = { count: 2, save: saveStub };
    findOneStub.resolves(mockInventory);

    await expect(repository.updateInventoryCountSubtract(1, 3))
      .rejects.toThrow('Bad Request');
  });
});