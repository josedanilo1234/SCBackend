const express =require ('express');
const router= express.Router();
const dbconnection = require('../models/dbconnection');
const conexion= dbconnection();



router.get('/', async function(req,res){

    conexion.query('select * from servicio',(err,result)=>{
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
    conexion.query('select * from servicio where CODIGO= ?',[req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: err,
             })
         }else{
           res.status(200).json(result);
         }
    })
  });

router.post('/', async function(req,res){
  console.log(req.body)
    const {FK_EMPLEADO,FK_MOTO,FECHA_PROCEDIMIENTO,NOMBRE,ESTADO,VALOR}=req.body;
    conexion.query('INSERT INTO SERVICIO (FK_EMPLEADO,FK_MOTO,FECHA_PROCEDIMIENTO,NOMBRE,ESTADO,VALOR)VALUES(?,?,?,?,?,?)',
    [FK_EMPLEADO,FK_MOTO,FECHA_PROCEDIMIENTO,NOMBRE,ESTADO,VALOR],
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
    const {FK_EMPLEADO,FK_MOTO,FECHA_PROCEDIMIENTO,NOMBRE,ESTADO,VALOR}=req.body;
    console.log(req.body);
    conexion.query('Update servicio Set FK_EMPLEADO= ? ,FK_MOTO= ?,FECHA_PROCEDIMIENTO= ? ,NOMBRE= ? ,ESTADO= ? ,VALOR= ? WHERE CODIGO=?',
    [FK_EMPLEADO,FK_MOTO,FECHA_PROCEDIMIENTO,NOMBRE,ESTADO,VALOR,req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: err,
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
    conexion.query('delete from SERVICIO where codigo= ?',[req.params.codigo],
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