import express from "express";

import {Rcliente} from './RutaCliente.js';
import {Rproductos} from '../rutas/RutaProductos.js';
import {Rempleado} from '../rutas/RutaEmpleado.js';
import {Rpedidos} from '../rutas/RutaPedidos.js';
import {Rconsultas} from './RutaConsultas.js';



const Rinicio = express.Router();

Rinicio.use(Rcliente);
Rinicio.use(Rproductos);
Rinicio.use(Rempleado);
Rinicio.use(Rpedidos);
Rinicio.use(Rconsultas);

Rinicio.get("/",(req,resp)=>{
    resp.render('index')
});

export { Rinicio };