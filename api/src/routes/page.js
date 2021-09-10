const { Router } = require('express');
const obtenerPaginado = require('../contoller/obtener-paginado');
const router = Router();

router.use('/:pag', obtenerPaginado)

module.exports = router;
