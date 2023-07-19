import { Router } from 'express';
import {
  findAll,
  findByPk,
  create,
  deleteAnime,
  update,
} from '../controllers/anime.controllers.js';

const router = Router();

//traer todos los animes
router.get('/', findAll);

//filtrar animes por id
router.get('/:id', findByPk);

//Crear un nuevo anime
router.post('/', create);

//eliminar animes por su id
router.delete('/:id', deleteAnime);

//actualizar anime
router.put('/:id', update);

export default router;
