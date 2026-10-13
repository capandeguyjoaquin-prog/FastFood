import express from "express";
import color from "colors";
import path from "path";
import { fileURLToPath} from "url";

const puerto=3000
const app=express()

app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');

const directorio=path.dirname(fileURLToPath(import.meta.url));
app.set('views',path.join(directorio,'vistas'));

app.use(express.static(path.join(directorio,'public')));


import { Rinicio } from "./rutas/RutaInicio.js";
app.use(Rinicio);


app.listen(puerto,()=>{
    console.log(`Servidor iniciando ${puerto}`.blue);
});