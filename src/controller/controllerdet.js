import { conexion } from '../database/conexion.js';
const con = await conexion();

export const dealta = (req, resp) => {
    resp.render('detalles/dealta');
}

export const guardarDetalle = async (req, resp) => {
    let id, cantidad, idproducto, idpedido;
    id = req.body.idhtml;
    cantidad = req.body.cantidadhtml;
    idproducto = req.body.idproductohtml;
    idpedido = req.body.idpedidohtml;

    try{
        const [productos] = await con.query("SELECT precio_unitarioP FROM Productos WHERE idProducto = ?",[idproducto]);

        let subtotal = Number(productos[0].precio_unitarioP) * Number(cantidad);
        let Altasql = "INSERT INTO Detalle_Pedido (idDetalle,cantidadDeta,subtotalDeta,Productos_idProducto,Pedidos_idPedido) VALUES (?,?,?,?,?);";
        const[registros]= await con.query(Altasql, [id, cantidad, subtotal, idproducto, idpedido]);
        console.log(registros)
        resp.render('detalles/dealta')
    }catch(error){
        console.log(`error la sentencia insert ${error}`);
        resp.status(400).render('detalles/dealta', { error: 'No se pudo guardar el detalle. Verificá que el pedido y el producto existan.' });
    }
}

export const debaja = (req, resp) => {
    resp.render('detalles/debaja');
}

export const borrarDetalle = async (req, resp) => {
    let idDetalle = req.body.idhtml;
    let EliminarDetalleSQL = "DELETE FROM Detalle_Pedido WHERE idDetalle = '" + idDetalle + "';";
    try {
       const [registros] = await con.query(EliminarDetalleSQL);
       console.log(registros);
       resp.render('detalles/debaja');
    } catch (error) {
        console.log(error);
        resp.render('detalles/debaja', { error: 'No se pudo eliminar el detalle' });
    }
}

export const demod = (req, resp) => {
    resp.render('detalles/demod');
}

export const actualizarDetalle = async (req, resp) => {
    let id, cantidad,subtotal, idproducto, idpedido;
    id = req.body.idhtml;
    cantidad = req.body.cantidadhtml;
    idproducto = req.body.idproductohtml;
    idpedido = req.body.idpedidohtml;
   try {
        const [productos] = await con.query("SELECT precio_unitarioP FROM Productos WHERE idProducto = ?",[idproducto]);
        subtotal = Number(productos[0].precio_unitarioP) * Number(cantidad);
        let ModificarDetalleSQL = "UPDATE Detalle_Pedido SET cantidadDeta = '" + cantidad + "', subtotalDeta = '" + subtotal + "', Productos_idProducto = '" + idproducto + "', Pedidos_idPedido = '" + idpedido + "' WHERE idDetalle = '" + id + "';";
        const [registros] = await con.query(ModificarDetalleSQL);
        console.log(registros);
        resp.render('detalles/demod');
    } catch (error) {
        console.log(error);
        resp.render('detalles/demod', { error: 'No se pudo modificar el detalle' });
    }
}

export const decons = (req, resp) => {
    resp.render('detalles/decons', { detalle: null });
}

export const consultarDetalle = async (req, resp) => {
    let id;
    id = req.body.idhtml;
    let consultarDetalleSQL = "SELECT * FROM Detalle_Pedido WHERE idDetalle = '" + id + "';";
    try {
        const [registros] = await con.query(consultarDetalleSQL);
        console.log(registros);
        resp.render('detalles/decons', { detalle: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('detalles/decons', { error: 'No se pudo consultar el detalle', detalle: null });
    }
}



export const demost= async (req,resp)=>{
    try{
        let mostrarsql="SELECT * from Detalle_Pedido";
        const[registros]= await con.query(mostrarsql)
        console.log(registros)
        resp.render('detalles/demost',{registros});
    }
    catch(error){
        console.log(error);
    }

};

export const detalle = (req, resp) => {
    resp.render('detalles/detalle_Pedidos');
} 