const { Recetas, Tipos } = require('../db.js');


async function obtenerRecetasPorId (req, res) {
    const receta = await Recetas.findByPk(req.params.idReceta, { include: [{ model: Tipos, attributes: ["nombre"], through: { attributes: [] } }] })
    if (receta) {
        return res.status(200).json(receta);
    }
    else {
        return res.status(404).json('no se encontro la receta nro: ' + req.params.idReceta)
    }
}

module.exports = obtenerRecetasPorId;