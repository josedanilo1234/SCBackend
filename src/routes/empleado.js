const express =require ('express');
const router= express.Router();
const dbconnection = require('../models/dbconnection');
const conexion= dbconnection();



router.get('/', async function(req,res){

    conexion.query('select * from empleado',(err,result)=>{
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
    conexion.query("select * from empleado where CEDULA LIKE '%"+parametro+"%' OR NOMBRE LIKE '%"+parametro+"%' OR APELLIDO LIKE '%"+parametro+"%'",
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
    
    const {CEDULA,NOMBRE,APELLIDO,TELEFONO,SUELDO}=req.body;
    conexion.query('INSERT INTO EMPLEADO VALUES(?,?,?,?,?)',
    [CEDULA,NOMBRE,APELLIDO,TELEFONO,SUELDO],
    (err,result)=>{
        if (err) {
             res.status(500).json({
                message: err,
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
    const {NOMBRE,APELLIDO,TELEFONO,SUELDO}=req.body;
    console.log(req.body);
    conexion.query('Update EMPLEADO Set NOMBRE= ? ,APELLIDO =?,TELEFONO =?,SUELDO =? WHERE CEDULA=?',
    [NOMBRE,APELLIDO,TELEFONO,SUELDO,req.params.codigo],
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

    conexion.query('delete from empleado where CEDULA = ?',[req.params.codigo],
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