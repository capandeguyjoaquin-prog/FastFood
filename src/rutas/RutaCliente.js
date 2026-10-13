import express from "express";
import {cliente,calta,guardarCliente,cbaja,borrarCliente,cmod,actualizarCliente,ccons,consultarCliente,cmost} from '../controller/controllercli.js';

const Rcliente = express.Router();

Rcliente.get('/cliente', cliente);
Rcliente.get('/cliente/Alta', calta);
Rcliente.post('/cliente/Alta', guardarCliente);
Rcliente.get('/cliente/Baja', cbaja);
Rcliente.post('/cliente/Baja', borrarCliente);
Rcliente.get('/cliente/Mod', cmod);
Rcliente.post('/cliente/Mod', actualizarCliente);
Rcliente.get('/cliente/Cons', ccons);
Rcliente.post('/cliente/Cons', consultarCliente);
Rcliente.get('/cliente/Most', cmost);

export { Rcliente };