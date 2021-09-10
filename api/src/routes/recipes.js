const { Router } = require('express');
const obtenerRecetasPorId = require('../contoller/obtener-receta-por-id');
const obtenerRecetasPorQuery = require('../contoller/obtener-recetas-por-query.js');
const crearRecetas = require('../contoller/crear-receta.js');


const router = Router();


router.get('/:idReceta', obtenerRecetasPorId)

router.get('', obtenerRecetasPorQuery )

router.post('', crearRecetas)

module.exports = router;