import express from 'express';
import {
    pedido, pealta, guardarPedido, guardarDetalle,
    pebaja, borrarPedido, borrarDetalle,
    pemod, actualizarPedido, actualizarDetalle,
    pecons, consultarPedido, consultarDetalle,
    pemost
} from '../controller/controllerped.js';

const Rpedidos = express.Router();

Rpedidos.get('/pedido', pedido);

Rpedidos.get('/pedido/Alta', pealta);
Rpedidos.post('/pedido/Alta', guardarPedido);
Rpedidos.post('/pedido/Alta/Detalle', guardarDetalle);

Rpedidos.get('/pedido/Baja', pebaja);
Rpedidos.post('/pedido/Baja', borrarPedido);
Rpedidos.post('/pedido/Baja/Detalle', borrarDetalle);

Rpedidos.get('/pedido/Mod', pemod);
Rpedidos.post('/pedido/Mod', actualizarPedido);
Rpedidos.post('/pedido/Mod/Detalle', actualizarDetalle);

Rpedidos.get('/pedido/Cons', pecons);
Rpedidos.post('/pedido/Cons', consultarPedido);
Rpedidos.post('/pedido/Cons/Detalle', consultarDetalle);

Rpedidos.get('/pedido/Most', pemost);

export { Rpedidos };