import express from "express";
import {pedido,pealta,guardarPedido,pebaja,borrarPedido,pemod,actualizarPedido,pecons,consultarPedido,pemost} from '../controller/controllerped.js';

const Rpedidos = express.Router();

Rpedidos.get('/pedido', pedido);
Rpedidos.get('/pedido/Alta', pealta);
Rpedidos.post('/pedido/Alta', guardarPedido);
Rpedidos.get('/pedido/Baja', pebaja);
Rpedidos.post('/pedido/Baja', borrarPedido);
Rpedidos.get('/pedido/Mod', pemod);
Rpedidos.post('/pedido/Mod', actualizarPedido);
Rpedidos.get('/pedido/Cons', pecons);
Rpedidos.post('/pedido/Cons', consultarPedido);
Rpedidos.get('/pedido/Most', pemost);

export { Rpedidos };