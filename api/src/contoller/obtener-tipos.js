const obtenerTiposFn = require('../funciones/obtener-tipos-fn');
const { Tipos } = require('../db.js');


async function obtenerTipos (req, res) {
    let finDiet = await Tipos.findAll();
    if (!finDiet.length) {
        const recetas = await obtenerTiposFn()
        
        if (recetas) {
            recetas.forEach(async diet => {
                await Tipos.findOrCreate({
                    where: {
                        nombre: diet,
                    },order:["id"]
                })
            })
        }
        finDiet = await Tipos.findAll();
    }
    res.json(finDiet);
}

module.exports = obtenerTipos;