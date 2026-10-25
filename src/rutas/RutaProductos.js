import express from "express";
import {productos,pralta,guardarProducto,prbaja,borrarProducto,prmod,actualizarProducto,prcons,consultarProducto,prmost} from '../controller/controllerprod.js';

const Rproductos = express.Router();

Rproductos.get('/productos', productos);
Rproductos.get('/productos/Alta', pralta);
Rproductos.post('/productos/Alta', guardarProducto);
Rproductos.get('/productos/Baja', prbaja);
Rproductos.post('/productos/Baja', borrarProducto);
Rproductos.get('/productos/Mod', prmod);
Rproductos.post('/productos/Mod', actualizarProducto);
Rproductos.get('/productos/Cons', prcons);
Rproductos.post('/productos/Cons', consultarProducto);
Rproductos.get('/productos/Most', prmost);

export { Rproductos };