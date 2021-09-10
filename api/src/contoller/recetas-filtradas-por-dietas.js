const { Recetas, Tipos } = require('../db.js');
const obtenerPaginado = require('./obtener-paginado.js');




async function recetasFiltradasPorDietas(req, res) {
    let { page } = req.body;
    if(!req.body.dietas)
    return obtenerPaginado(req,res);


    if (req.body.dietas.length) {
        let recetas = await Recetas.findAll({
            attributes: ["id"], include: [{
                model: Tipos, required: true, attributes: [], where: {
                    nombre: req.body.dietas[0]
                }, through: { attributes: [] }
            }]
        });

        let idRecetas = []

        recetas.forEach(x => {
            idRecetas.push(x.dataValues.id)
        });

        for (let i = 1; i < req.body.dietas.length; i++) {
            recetas = await Recetas.findAll({
                where: { id: idRecetas },
                attributes: ["id"], include: [{
                    model: Tipos, required: true, attributes: [], where: {
                        nombre: req.body.dietas[i]
                    }, through: { attributes: [] }
                }]
            });

            idRecetas = []

            recetas.forEach(x => {
                idRecetas.push(x.dataValues.id)
            });
        }
        recetas = await Recetas.findAll({
            where: {
                id: idRecetas
            }, order: ["id"], include: { model: Tipos, required: true, attributes: ["nombre"], through: { attributes: [] } }
        })

        if (!recetas.length) {
            return res.status(500).json("no se encontro ninguna receta");
        } else {
            let floor;
            if (page) {
                try {
                    if(Number.isInteger(page)){
                    throw page + " no es un numero entero"}
                    page = page*10;
                    floor = page - 10;
                }
                catch (err) {
                    return res.status(507).send(err)
                }
                
            return res.status(200).json(recetas.slice(floor,page));

            }
            return res.status(200).json(recetas);
        }
    } else {
        obtenerPaginado(req,res);
    }
}

module.exports = recetasFiltradasPorDietas;