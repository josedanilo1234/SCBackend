const express =require ('express');
const router= express.Router();
const dbconnection = require('../models/dbconnection');
const conexion= dbconnection();



router.get('/', async function(req,res){

    conexion.query('select * from articulo',(err,result)=>{
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
    conexion.query('select * from articulo where CODIGO= ?',[req.params.codigo],
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
    const {NOMBRE,CANTIDAD,TIPO,MARCA,VALOR,FK_UBICACION}=req.body;
    conexion.query('INSERT INTO ARTICULO (NOMBRE,CANTIDAD,TIPO,MARCA,VALOR,FK_UBICACION)VALUES(?,?,?,?,?,?)',
    [NOMBRE,CANTIDAD,TIPO,MARCA,VALOR,FK_UBICACION],
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
    const {NOMBRE,CANTIDAD,TIPO,MARCA,VALOR,FK_UBICACION}=req.body;
    console.log(req.body);
    conexion.query('Update ARTICULO Set NOMBRE= ? ,CANTIDAD= ?,TIPO= ? ,MARCA= ? ,VALOR= ? ,FK_UBICACION= ? WHERE CODIGO=?',
    [NOMBRE,CANTIDAD,TIPO,MARCA,VALOR,FK_UBICACION,req.params.codigo],
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
    conexion.query('delete from ARTICULO where codigo= ?',[req.params.codigo],
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