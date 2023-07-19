import { assert } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../app.js';

chai.use(chaiHttp);

let servidor = app.listen(3000);

describe('VALIDACIÓN DE ENDPOINT FIND ALL ANIMES', () => {
  it('Validar que código de respuesta sea un 200, respuesta contenga objeto anime que sea un array.', (done) => {
    chai
      .request(servidor)
      .get('/api/v1/anime')
      .end((err, res) => {
        let respuesta = res.body;
        assert.equal(
          res.status,
          200,
          'código de estado de respuesta no coincide con 200.'
        );
        assert.isArray(respuesta.anime, 'Respuesta no es un array.');
        done();
      });
  });
});
