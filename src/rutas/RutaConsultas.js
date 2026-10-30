import express from 'express';
import {
    consultas,
    mostrarListprod,
    listarProductosPorPrecio,
    mostrarPedcliente,
    listarPedidosCliente,
    mostrarTotaldia
} from '../controller/controllercons.js';

const Rconsultas = express.Router();

Rconsultas.get('/consultas', consultas);

Rconsultas.get('/consultas/listprod', mostrarListprod);
Rconsultas.post('/consultas/listprod', listarProductosPorPrecio);

Rconsultas.get('/consultas/pedcliente', mostrarPedcliente);
Rconsultas.post('/consultas/pedcliente', listarPedidosCliente);

Rconsultas.get('/consultas/totaldia', mostrarTotaldia);

export { Rconsultas };