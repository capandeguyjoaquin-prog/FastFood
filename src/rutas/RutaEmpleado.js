import express from "express";
import {empleado,ealta,guardarEmpleado,ebaja,borrarEmpleado,emod,actualizarEmpleado,econs,consultarEmpleado,emost} from '../controller/controlleremp.js';

const Rempleado = express.Router();

Rempleado.get('/empleado', empleado);
Rempleado.get('/empleado/Alta', ealta);
Rempleado.post('/empleado/Alta', guardarEmpleado);
Rempleado.get('/empleado/Baja', ebaja);
Rempleado.post('/empleado/Baja', borrarEmpleado);
Rempleado.get('/empleado/Mod', emod);
Rempleado.post('/empleado/Mod', actualizarEmpleado);
Rempleado.get('/empleado/Cons', econs);
Rempleado.post('/empleado/Cons', consultarEmpleado);
Rempleado.get('/empleado/Most', emost);

export { Rempleado };