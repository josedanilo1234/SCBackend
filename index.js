import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
const bodyParser = require('body-parser');
const AuthToken =require('./src/middlewares/AuthToken')
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Middleware
app.use(AuthToken);
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/login',require('./src/routes/login'));
app.use('/api/usuario',require('./src/routes/usuario'));
app.use('/api/ubicacion',require('./src/routes/ubicacion'));
app.use('/api/articulo',require('./src/routes/articulo'));
app.use('/api/empleado',require('./src/routes/empleado'));
app.use('/api/cliente',require('./src/routes/cliente'));
app.use('/api/moto',require('./src/routes/moto'));
app.use('/api/maquinaria',require('./src/routes/maquinaria'));
app.use('/api/servicio',require('./src/routes/servicio'));
app.use('/api/dashboard',require('./src/routes/dashboard'));


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('app listening on port '+ app.get('puerto'));
});