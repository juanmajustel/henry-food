const { Recipe } = require(`../db.js`);

module.exports = async (req, res) => {
    try {
        
        const { id } = req.params

        const recipe = await Recipe.findByPk(id);

        await recipe.destroy();
        
        return res.send("Deleted Recipe");
        
    } catch (err) {

        return res.status(500).json()
    
    }
}








// router.delete('/:id', async (req, res) =>{
//     const {id} = req.params

//     const verification = await Recipe.findAll({
//         where:{
//             id: id
//         }
//     });

//     if(!id){
//         return res.status(404).send('no hay id');
//     }else if(!verification.length){
//         return res.status(404).send('Id incorrecto');
//     }
//     else{
//          await Recipe.destroy({
//             where: {
//             id: id
//             }
//             });
//         return res.status(200).send('Se elimino');
//     }
// })

// router.put('/:id',async (req, res)=>{
//     const {id} = res.params;
//     const {summary, step, diet, healthScore, name} = req.body; 

//     const allRecipe = await getApi();
//     const aux = allRecipe.find(el => el.id === id);
//     if(aux){
        
//     }else{
//         res.status(404).send('Id no encontrado')
//     }
// })