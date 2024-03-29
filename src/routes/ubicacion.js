const express =require ('express');
const router= express.Router();
const dbconnection = require('../models/dbconnection');
const conexion= dbconnection();



router.get('/', async function(req,res){

    conexion.query('select * from ubicacion',(err,result)=>{
        if (err) {
            res.status(500).json({
               message: 'Ocurrio un error',
             })
         }else{
           res.status(200).json(result);
         }
       })
   });



   router.get('/:codigo', async function(req,res){
    var parametro=req.params.codigo;
    conexion.query("select * from ubicacion where NOMBRE LIKE '%"+parametro+"%' OR ESTANTE LIKE '%"+parametro+"%'",
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: 'Ocurrio un error',
             })
         }else{
           res.status(200).json(result);
         }
    })
  });

router.post('/', async function(req,res){
  console.log(req.body)
    const {NOMBRE,ESTANTE}=req.body;
    conexion.query('INSERT INTO UBICACION (NOMBRE,ESTANTE)VALUES(?,?)',
    [NOMBRE,ESTANTE],
    (err,result)=>{
        if (err) {
             res.status(500).json({
                message: 'Ocurrio un error',
              })
          }else{
            res.status(200).json({
                message: 'agregado satisfactoriamente',
                Method: 'POST',
                Status: 'Recibido'
              })
          }
    })

});

router.put('/:codigo', async function(req,res){
    console.log(req.params.codigo);
    const {NOMBRE,ESTANTE}=req.body;
    console.log(req.body);
    conexion.query('Update UBICACION Set NOMBRE= ? ,ESTANTE= ? WHERE CODIGO=?',
    [NOMBRE,ESTANTE,req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: 'Ocurrio un error',
             })
         }else{
           res.status(200).json({
            message: ' Actualizado satisfactoriamente',
            Method: 'PUT',
            Status: 'Actualizado'
             })
         }
    })
});


router.delete('/:codigo', async function(req,res){
    console.log(req.params.codigo);
    conexion.query('delete from UBICACION where codigo= ?',[req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: 'Ocurrio un error',
             })
         }else{
           res.status(200).json({
            message: 'Elimiando Saisfactoriamente',
            Method: 'PUT',
            Status: 'Eliminado'
             })
         }
    })
});
module.exports=router;