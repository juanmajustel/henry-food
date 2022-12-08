require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require(`../db.js`);
const { Op } = require("sequelize");


// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
const reduceObjectsRecipes = (r) => {
    return {
        id: r.id,
        name: r.title,
        image: r.image,
        summary: r.summary,
        healthScore: r.healthScore,
        steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps.reduce((obj, s) => {
            obj[s.number] = s.step
            return obj
        }, {}) :
            {},
        diets: r.diets
    }
}

const modifyDietAttributes = (r) => {
    r = r.toJSON();
    r.diets = r.diets.map(diet => diet.name);
    return r;
}

const getRecipeByName = async (req, res) => {

    try {

        const { name } = req.query

        // Busca 100 recetas en la API 
        const { results } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

        //Filtra las recetas a solo las que tengan el valor de la query "name" incluida en su titulo       
        let recipesApi = !!name ? results.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()))
            : results;

        //Objeto de cada receta solo con las propiedades necesarias
        recipesApi = recipesApi.map((recipe) => reduceObjectsRecipes(recipe))

        let recipesDB = await Recipe.findAll({
            where: !!name ? {
                name: {
                    [Op.substring]: name.toLowerCase()
                }
            } : {},
            include: {
                model: Diet,
                as: "diets",
                attributes: ["name"],
                through: { attributes: [] }
            }
        })

        recipesDB = recipesDB.map(recipe => modifyDietAttributes(recipe));
        const recipesAll = recipesApi.concat(recipesDB);
        return (recipesAll.length) ? res.json(recipesAll) : res.json([]);

    } catch (err) {
        return res.status(404).json(err)

    }
}

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

const getRecipeById = async (req, res) => {

    const { id } = req.params;
    try {

        if (id === undefined) return res.status(404).send("no hay ID");
        if (!id.includes("-")) {
            const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
                .then(r => r.data);
            if (recipeApi.hasOwnProperty('id')) return res.json(reduceObjectsRecipes(recipeApi));
        } else {
            const recipeDB = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    as: "diets",
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            });
            return res.json(modifyDietAttributes(recipeDB));
        }
        return res.status(404).send("No se encontro receta")

    } catch (err) {
        return res.status(404).json(err)
    }
}

module.exports = {
    getRecipeByName,
    getRecipeById
}


//por nombre
//https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100


//porid
// `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`