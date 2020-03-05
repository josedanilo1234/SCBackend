const jwt = require('jsonwebtoken');
const secret='sincrohonda';

 var a1='/api/usuario'
 var a2='/api/ubicacion'
 var a3='/api/articulo'
 var a4='/api/empleado'
 var a5='/api/cliente'
 var a6='/api/moto'
 var a7='/api/maquinaria'
 var a8='/api/servicio'
 var a9='/api/dashboard'

module.exports = function(req,res,next){
   
   var ruta=req.path
   var metodo=req.method;
  
   if(ruta ==a1 || ruta ==a2|| ruta ==a3 || ruta ==a4 || ruta ==a5 || ruta ==a6 || ruta ==a7 || ruta ==a8 || ruta ==a9){
       if(metodo !='OPTIONS'){
        if(req.headers.authorization!='Bearer null'){
            let token =req.headers.authorization.split(' ')[1]
            jwt.verify(token,secret,function(error,decoded){
                if(error){
                    res.status(403).json({
                Error : error
            })
                }else{
                    next();
                }
            })
           }else{
               console.log("hp")
            res.status(403).json({
                Error :{
                    message: 'No Posee Token de validacion'
                }
            })
           }
       }else next();
   }else next();

}