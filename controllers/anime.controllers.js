import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';

import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pathAnime = path.resolve(__dirname, '../database/anime.json');

export const findAll = async (req, res) => {
  try {
    let data = await fs.readFile(pathAnime, 'utf8');
    data = JSON.parse(data);
    res.status(200).json({
      code: 200,
      message: 'OK',
      anime: data.anime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error al leer los animes de la DB.',
    });
  }
};

export const findByPk = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await fs.readFile(pathAnime, 'utf8');
    data = JSON.parse(data);

    let animeBuscado = data.anime.find((anime) => anime.id == id);

    if (!animeBuscado)
      return res.status(404).json({
        code: 404,
        message: `no existe en la base de datos un anime con el ID: ${id}`,
      });

    res.status(200).json({
      code: 200,
      message: 'OK',
      anime: animeBuscado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error al leer el anime con ID: ' + id,
    });
  }
};

export const create = async (req, res) => {
  try {
    let { nombre, genero, año, autor } = req.body;
    console.log(nombre, genero, año, autor);
    let nuevoAnime = {
      id: uuid().slice(0, 6),
      nombre,
      genero,
      año,
      autor,
    };
    console.log(nuevoAnime);
    let data = await fs.readFile(pathAnime, 'utf8');
    data = JSON.parse(data);
    data.anime.push(nuevoAnime);
    await fs.writeFile(pathAnime, JSON.stringify(data, null, 2), 'utf8');

    res.status(201).json({
      code: 201,
      message: `Se ha creado con éxito el anime con ID: ${nuevoAnime.id}`,
      anime: nuevoAnime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error al ingresar un nuevo anime',
    });
  }
};

export const deleteAnime = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await fs.readFile(pathAnime, 'utf8');
    data = JSON.parse(data);

    let index = data.anime.findIndex((anime) => anime.id == id);
    if (index < 0)
      return res.status(404).json({
        code: 404,
        message: 'El anime que desea eliminar no se encuentra en la BD.',
      });

    let animeEliminado = data.anime.splice(index, 1);

    await fs.writeFile(pathAnime, JSON.stringify(data, null, 2), 'utf8');

    res.status(200).json({
      code: 200,
      message: 'Se ha eliminado con éxito el anime con ID: ' + id,
      data: animeEliminado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error al eliminar el anime con ID: ' + id,
    });
  }
};

export const update = async (req, res) => {
  let id = req.params.id;
  try {
    let { id, nombre, genero, año, autor } = req.body;

    let data = await fs.readFile(pathAnime, 'utf8');
    data = JSON.parse(data);

    let animeBuscado = data.anime.find((anime) => anime.id == id);

    if (!animeBuscado)
      return res.status(404).json({
        code: 404,
        message: 'El anime que desea modificar no se encuentra en la BD.',
      });

    animeBuscado.id = id || animeBuscado.id;
    animeBuscado.nombre = nombre || animeBuscado.nombre;
    animeBuscado.genero = genero || animeBuscado.genero;
    animeBuscado.año = año || animeBuscado.año;
    animeBuscado.autor = autor || animeBuscado.autor;

    await fs.writeFile(pathAnime, JSON.stringify(data, null, 2), 'utf8');

    res.status(201).json({
      code: 201,
      message: `Se ha modificado con éxito el anime con ID: ${id}`,
      anime: animeBuscado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error al modificar el anime con ID: ' + id,
    });
  }
};
