const express =require ('express');
const router= express.Router();
const dbconnection = require('../models/dbconnection');
const conexion= dbconnection();



router.get('/', async function(req,res){

    conexion.query('select * from usuario',(err,result)=>{
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
    conexion.query("select * from usuario where  CODIGO LIKE '%"+parametro+"%' OR NOMBRE LIKE '%"+parametro+"%'",
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
    const {NOMBRE,PASSWORD,FK_EMPLEADO}=req.body;
    conexion.query('INSERT INTO USUARIO (NOMBRE,PASSWORD,FK_EMPLEADO)VALUES(?,MD5(?),?)',
    [NOMBRE,PASSWORD,FK_EMPLEADO],
    (err,result)=>{
        if (err) {
             res.status(500).json({
                message: err,
              })
          }else{
            res.status(200).json({
                message: 'Usuario agregado satisfactoriamente',
                Method: 'POST',
                Status: 'Recibido'
              })
          }
    })

});

router.put('/:codigo', async function(req,res){
    console.log(req.params.codigo);
    const {NOMBRE,PASSWORD}=req.body;
    console.log(req.body);
    conexion.query('Update USUARIO Set NOMBRE= ? ,PASSWORD= MD5(?) WHERE CODIGO=?',
    [NOMBRE,PASSWORD,req.params.codigo],
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
    conexion.query('delete from usuario where CODIGO= ?',[req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: 'Ocurrio un error',
             })
         }else{
           res.status(200).json({
            message: 'Usuario Elimiando Saisfactoriamente',
            Method: 'PUT',
            Status: 'Eliminado'
             })
         }
    })
});
module.exports=router;