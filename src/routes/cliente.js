const express =require ('express');
const router= express.Router();
const dbconnection = require('../models/dbconnection');
const conexion= dbconnection();



router.get('/', async function(req,res){

    conexion.query('select * from cliente',(err,result)=>{
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
    conexion.query("select * from cliente where CEDULA LIKE '%"+parametro+"%' OR NOMBRE LIKE '%"+parametro+"%' OR APELLIDO LIKE '%"+parametro+"%'",
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
    const {CEDULA,NOMBRE,APELLIDO,TELEFONO}=req.body;
    conexion.query('INSERT INTO CLIENTE VALUES(?,?,?,?)',
    [CEDULA,NOMBRE,APELLIDO,TELEFONO],
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
    const {NOMBRE,APELLIDO,TELEFONO}=req.body;
    console.log(req.body);
    conexion.query('Update cliente Set NOMBRE= ? ,APELLIDO =?,TELEFONO =? WHERE CEDULA=?',
    [NOMBRE,APELLIDO,TELEFONO,req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: err,
             })
         }else{
           res.status(200).json({
            message: 'Actualizado satisfactoriamente',
            Method: 'PUT',
            Status: 'Actualizado'
             })
         }
    })
});


router.delete('/:codigo', async function(req,res){
    console.log(req.params.codigo);
    conexion.query('delete from cliente where CEDULA = ?',[req.params.codigo],
    (err,result)=>{
        if (err) {
            res.status(500).json({
               message: err,
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