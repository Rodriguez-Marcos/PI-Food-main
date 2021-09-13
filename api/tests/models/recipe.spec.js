const { Recetas, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recetas model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recetas.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recetas.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recetas.create({ nombre: 'Milanesa a la napolitana', resumen:  'muuuuy rica', salud: 100 });
      });
    });
  });
});
