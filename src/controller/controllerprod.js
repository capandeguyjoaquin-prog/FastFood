import { conexion } from '../database/conexion.js';
const con = await conexion();

export const pralta = (req, resp) => {
    resp.render('producto/pralta');
}

export const guardarProducto = async (req, resp) => {
    let id, nombre, precio,categoria;
    id = req.body.idhtml;
    nombre = req.body.nomhtml;
    categoria = req.body.categoriahtml;
    precio = req.body.preciohtml;

    let Altasql = "INSERT INTO Productos (idProducto,nombreP,precio_unitarioP,categoriaP) VALUES ('"+ id+"','"+ nombre +"','"+ precio +"','"+ categoria+"');";
    try{
        const[registros]= await con.query(Altasql);
        console.log(registros)
        resp.render('producto/pralta')
    }catch(error){
        console.log(`error la sentencia insert ${error}`);
    }
}

export const prbaja = (req, resp) => {
    resp.render('producto/prbaja');
}

export const borrarProducto = async (req, resp) => {
    let idProducto = req.body.idhtml;
    let EliminarProductoSQL = "DELETE FROM Productos WHERE idProducto = '" + idProducto + "';";
    try {
       const [registros] = await con.query(EliminarProductoSQL);
       console.log(registros);
       resp.render('producto/prbaja');
    } catch (error) {
        console.log(error);
        resp.render('producto/prbaja', { error: 'No se pudo eliminar el producto' });
    }
}

export const prmod = (req, resp) => {
    resp.render('producto/prmod');
}

export const actualizarProducto = async (req, resp) => {
    let id, nombre, precio, categoria;
    id = req.body.idhtml;
    nombre = req.body.nomhtml;
    precio = req.body.preciohtml;
    categoria = req.body.categoriahtml;
    let ModificarProductoSQL = "UPDATE Productos SET nombreP = '" + nombre + "', precio_unitarioP = '" + precio + "', categoriaP = '" + categoria + "' WHERE idProducto = '" + id + "';";
    try {
        const [registros] = await con.query(ModificarProductoSQL);
        console.log(registros);
        resp.render('producto/prmod');
    } catch (error) {
        console.log(error);
        resp.render('producto/prmod', { error: 'No se pudo modificar el producto' });
    }
}

export const prcons = (req, resp) => {
    resp.render('producto/prcons', { producto: null });
}

export const consultarProducto = async (req, resp) => {
    let id;
    id = req.body.idhtml;
    let consultarProductoSQL = "SELECT * FROM Productos WHERE idProducto = '" + id + "';";
    try {
        const [registros] = await con.query(consultarProductoSQL);
        console.log(registros);
        resp.render('producto/prcons' , { producto: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('producto/prcons', { error: 'No se pudo consultar el producto', producto: null });
    }
}



export const prmost= async (req,resp)=>{
    try{
        let mostrarsql="SELECT * from Productos";
        const[registros]= await con.query(mostrarsql)
        console.log(registros)
        resp.render('producto/prmost',{registros});
    }
    catch(error){
        console.log(error);
    }

};

export const productos = (req, resp) => {
    resp.render('producto/productos');
} 