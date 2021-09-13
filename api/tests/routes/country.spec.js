/* eslint-disable import/no-extraneous-dependencies */
const { expect, assert, should } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recetas, conn } = require('../../src/db.js');

const agent = session(app);
const receta = { nombre: 'Milanesa a la napolitana', resumen: 'muuuuy rica', salud: 100 };

describe('Recetas routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Recetas.sync({ force: true })
    .then(() => Recetas.create(receta)));

  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect((200))
    );
  });
  describe('GET /types', () => {
    it('should get 200', () => 
      agent.get('/types').expect(200)
    );
  })
});