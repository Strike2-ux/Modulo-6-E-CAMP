import { Router } from 'express';

import fs from 'fs/promises';

import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pathAnime = path.resolve(__dirname, '../database/anime.json');

const router = Router();

//traer todos los animes
router.get('/', async (req, res) => {
  let data = await fs.readFile(pathAnime, 'utf8');
  data = JSON.parse(data);

  res.render('home', {
    anime: data.anime,
  });
});

export default router;
