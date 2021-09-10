const axios = require('axios');
let recetas = [];

function obtenerRecetas() {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.APIKEY}&number=100&addRecipeInformation=true`)
            .then(response => {
                response.data.results.forEach(receta => {
                    let { title, spoonacularScore, summary, healthScore, analyzedInstructions, image, diets: dietas } = receta;
                    let steps = JSON.stringify(analyzedInstructions[0] ? analyzedInstructions[0].steps : 'no hay pasos');
                    let nombre = title,  resumen = summary, salud = healthScore, pasos = steps, url = image;
                    recetas.push({ nombre,  resumen, salud, pasos, url, dietas,spoonacularScore })
                })
                resolve({
                    recetas
                })

            })
            .catch(function (error) {
                // handle error
                console.error(error)
            });
    })
}


module.exports = obtenerRecetas;
