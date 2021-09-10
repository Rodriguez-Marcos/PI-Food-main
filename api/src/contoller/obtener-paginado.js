const { Recetas, Tipos } = require('../db.js');
async function obtenerPaginado(req, res) {
    let { page } = req.body;
    if(page === undefined){
        page = req.params.pag;
    }
    try {
        page = parseInt(page);
        if (isNaN(page)) {
            throw "Debes ingresar una pagina del 1 al 9"
        }
    } catch (err) {
        return res.status(507).json(err)
    }
    let id = [];
    let interval = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    interval.forEach(x => {
        id.push(parseInt("" + page + x));
    })
    pagina = await Recetas.findAll({ where: { id }, order:["id"],include:[{model:Tipos, attributes:["nombre"],through:{attributes:[]}}] })
    res.json(pagina);
}



module.exports = obtenerPaginado;