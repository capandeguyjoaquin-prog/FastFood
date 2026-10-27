import express from "express";
import {detalle,dealta,guardarDetalle,debaja,borrarDetalle,demod,actualizarDetalle,decons,consultarDetalle,demost} from '../controller/controllerdet.js';

const Rdetalle = express.Router();

Rdetalle.get('/detalle', detalle);
Rdetalle.get('/detalle/Alta', dealta);
Rdetalle.post('/detalle/Alta', guardarDetalle);
Rdetalle.get('/detalle/Baja', debaja);
Rdetalle.post('/detalle/Baja', borrarDetalle);
Rdetalle.get('/detalle/Mod', demod);
Rdetalle.post('/detalle/Mod', actualizarDetalle);
Rdetalle.get('/detalle/Cons', decons);
Rdetalle.post('/detalle/Cons', consultarDetalle);
Rdetalle.get('/detalle/Most', demost);

export { Rdetalle };