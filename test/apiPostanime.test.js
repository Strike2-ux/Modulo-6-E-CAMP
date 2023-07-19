import { assert } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../app.js';

chai.use(chaiHttp);

let servidor = app.listen(3000);

describe('VALIDACIÓN DE ENDPOINT CREATE ANIMES', () => {
  it('Validar que código de respuesta sea un 201, respuesta contenga una propiedad anime y que sea un Object.', (done) => {
    let anime = {
      nombre: 'Pokemon',
      genero: 'Shonen',
      año: '1998',
      autor: 'Satoshi Tajiri',
    };

    chai
      .request(servidor)
      .post('/api/v1/anime')
      .send(anime)
      .end((err, res) => {
        let respuesta = res.body;
        assert.equal(
          res.status,
          201,
          'código de estado de respuesta no coincide con 201.'
        );
        assert.exists(
          respuesta.anime,
          'No existe propiedad anime en la respuesta.'
        );
        assert.propertyVal(
          respuesta.anime,
          'nombre',
          'Tenshi-Muyo',
          'Nombre de objeto devuelto no coincide.'
        );
        assert.propertyVal(
          respuesta.anime,
          'genero',
          'Shonen',
          'Nombre del propietario devuelto no coincide.'
        );
        assert.exists(
          respuesta.anime.id,
          'Objeto devuelto no tiene propiedad id.'
        );
        done();
      });
  });
});
