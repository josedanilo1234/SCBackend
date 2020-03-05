const express = require('express');
const router = express.Router();
const dbconnection = require('../models/dbconnection');
const conexion = dbconnection();
const jwt= require('jsonwebtoken');
const secret='sincrohonda';

router.post('/', async function (req, res) {
    var aux;
    const { NOMBRE, PASSWORD } = req.body;
    console.log(req.body)
    conexion.query('call logintemp(?,?)',
        [NOMBRE, PASSWORD],
        (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Ocurrio un error',
                })
            } else {
                if (result[0].length > 0) {
                    aux = [result[0][0]];
                    var payload={
                        aux
                    };
                    jwt.sign(payload,secret,{ expiresIn: 3600},function(error,token){
                        if(error){
                           console.log(error)
                        }else{
                            aux[0].token=token;
                            res.status(200).json(aux[0]);
                        }
                    })
                } else {
                    res.status(500).json({
                        message: 'Las credenciales no coinciden con ningun usuario, por favor verifique las mismas',
                        Method: 'POST',
                        Status: 'No autenticado'
                    })
                }
            }
        })


})
module.exports = router;