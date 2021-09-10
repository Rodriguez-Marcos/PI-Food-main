const { Recetas, Tipos } = require('../db.js');
const { Sequelize } = require('sequelize');
const obtenerRecetas = require('../funciones/obtener-recetas');


async function obtenerRecetasPorQuery (req, res) {
    if (!req.query.name) {
        let recetas = await Recetas.findAll({include: [{ model: Tipos, attributes: ["nombre"], through: { attributes: [] } }],order:["id"]});
        if (recetas.length)
            return res.status(200).json(recetas)

        obtenerRecetas()
            .then(async (response) => {
                if (response) {
                    response.recetas.forEach(async (receta) => {
                        const { nombre, resumen, salud, pasos, url, dietas,spoonacularScore } = receta;
                        const crearReceta = await Recetas.create({
                            nombre,
                            resumen,
                            salud,
                            pasos,
                            url,
                            spoonacularScore,
                        })
                        const dietasDB = await Tipos.findAll({
                            where: {
                                nombre: dietas,
                            }
                        });
                        const idDietas = dietasDB.map(x => {
                            return x.dataValues.id
                        })
                        await crearReceta.addTipos(idDietas);
                    })
                }
                recetas = await Recetas.findAll({include: [{ model: Tipos, attributes: ["nombre"], through: { attributes: [] } }],order:["id"]});
                return res.status(200).json(recetas)
            })
    }
    else {
        let recetas = await Recetas.findAll({include: [{ model: Tipos, attributes: ["nombre"], through: { attributes: [] } }],order:["id"], where: { nombre: { [Sequelize.Op.iLike]: `%${req.query.name}%` },   } });
        if (recetas.length)
            return res.status(200).json(recetas);

        return res.status(404).json("no se encontro ninguna receta con el nombre: " + req.query.name);
    }
}

module.exports = obtenerRecetasPorQuery;