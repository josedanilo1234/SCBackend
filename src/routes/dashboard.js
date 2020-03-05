const express =require ('express');
const router= express.Router();

  router.get('/', async function(req,res){
    res.status(200).json({
        message: 'Login Activo',
        Method: 'Get',
        Status: 'Recibido'
      })

   });

  module.exports=router;