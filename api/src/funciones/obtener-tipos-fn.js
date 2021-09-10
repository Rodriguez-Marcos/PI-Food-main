const axios = require('axios')
let diets = [];

function obtenerTipos() {
  return new Promise((resolve, reject) => {

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.APIKEY}&number=100&addRecipeInformation=true`)
      .then(function (response) {
        response.data.results.forEach(receta => {
          diets = [...diets, ...receta.diets]
        });
        //elimina duplicados
        for (var i = diets.length - 1; i >= 0; i--) {
          if (diets.indexOf(diets[i]) !== i) diets.splice(i, 1);
        }
        resolve(diets);
      })
      .catch(function (error) {
        // handle error
      })
  })
}

module.exports = obtenerTipos;