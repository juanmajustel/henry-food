const { Router } = require('express');
const getDiets = require(`../controllers/getDiets.js`)

const router = Router();

router.get("/", getDiets)

module.exports = router;


// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar 
// la base de datos con los tipos de datos indicados por spoonacular.