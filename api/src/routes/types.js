const { Router } = require('express');
const obtenerTipos = require('../contoller/obtener-tipos');
const recetasFiltradasPorDietas = require('../contoller/recetas-filtradas-por-dietas.js');
require('dotenv').config();



const router = Router();
router.get('',obtenerTipos)
router.get('/recipe', recetasFiltradasPorDietas)


module.exports = router;