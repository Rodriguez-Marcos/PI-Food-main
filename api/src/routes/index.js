const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes');
const types = require('./types');
const page = require('./page');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/page', page)
router.use('/types', types);

module.exports = router;

// para poder importar los modelos así: const { Product, User } = require('./db.js');
// para importart la conexión { conn } = require('./db.js');