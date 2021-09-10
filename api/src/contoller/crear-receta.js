const { Recetas, Tipos } = require('../db.js');

async function crearRecetas(req, res) {
    const { nombre, resumen, salud, pasos, url, dietas, spoonacularScore } = req.body;
    if (typeof pasos === 'string')
        try {
            if (JSON.parse(pasos)[0]){}
        } catch (err) {
            return res.status(500).send("Pasos mal enviados. Debe ser un Array de objetos con la propiedad step como pasos, en formato JSON!!!!!!!!!")
        }
    const existe = await Recetas.findAll({
        where: {
            nombre
        }
    })
    if (existe.length)
        return res.status(500).send("la receta ya existe")
    const crearReceta = await Recetas.create({ nombre, resumen, pasos, salud, url, spoonacularScore });
    if (!nombre || !resumen || !salud || !spoonacularScore) {
        return res.status(500).send("faltan algunos campos");
    }
    const dietasDB = await Tipos.findAll({
        where: {
            nombre: dietas,
        }
    });
    const idDietas = dietasDB.map(x => {
        return x.dataValues.id
    });
    await crearReceta.addTipos(idDietas);
    return res.json("receta Creada, id: " + crearReceta.dataValues.id);
}
module.exports = crearRecetas;