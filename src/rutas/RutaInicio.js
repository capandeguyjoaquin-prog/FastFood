import express from "express";

import {Rcliente} from './RutaCliente.js';
import {Rproductos} from '../rutas/RutaProductos.js';
import {Rempleado} from '../rutas/RutaEmpleado.js';
import {Rpedidos} from '../rutas/RutaPedidos.js';
import {Rdetalle} from '../rutas/RutaDetalle.js';

const Rinicio = express.Router();

Rinicio.use(Rcliente);
Rinicio.use(Rproductos);
Rinicio.use(Rempleado);
Rinicio.use(Rpedidos);
Rinicio.use(Rdetalle);

Rinicio.get("/",(req,resp)=>{
    resp.render('index')
});

export { Rinicio };