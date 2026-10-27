import { conexion } from '../database/conexion.js';
const con = await conexion();

export const pealta = (req, resp) => {
    resp.render('pedido/pealta');
}

export const guardarPedido = async (req, resp) => {
    let id, fecha, tipo_servicio, estado_pedido, cliente, empleado;
    id = req.body.idhtml;
    fecha = req.body.fechahtml;
    tipo_servicio = req.body.tiposerviciohtml;
    estado_pedido = req.body.estadopedidohtml;
    cliente = req.body.clienteIdhtml;
    empleado = req.body.empleadoIdhtml;

    if (fecha) {
        fecha = fecha.replace("T", " ") + ":00";
    }

    let Altasql = "INSERT INTO Pedidos (idPedido,fecha_pedidosPe,tipo_servicioPe,estadoPe,Cliente_idCliente,Empleados_idEmpleado) VALUES (?,?,?,?,?,?);";
    try{
        const[registros]= await con.query(Altasql, [id, fecha, tipo_servicio, estado_pedido, cliente, empleado]);
        console.log(registros)
        resp.render('pedido/pealta')
    } catch (error) {
        console.log(`error la sentencia insert ${error}`);
        resp.render('pedido/pealta', { error: 'No se pudo guardar el pedido. Verificá que el cliente y el empleado existan.' });
    }
}

export const pebaja = (req, resp) => {
    resp.render('pedido/pebaja');
}

export const borrarPedido = async (req, resp) => {
    let idPedido = req.body.idhtml;
    let EliminarPedidoSQL = "DELETE FROM Pedidos WHERE idPedido = '" + idPedido + "';";
    try {
       const [registros] = await con.query(EliminarPedidoSQL);
       console.log(registros);
       resp.render('pedido/pebaja');
    } catch (error) {
        console.log(error);
        resp.render('pedido/pebaja', { error: 'No se pudo eliminar el pedido' });
    }
}

export const pemod = (req, resp) => {
    resp.render('pedido/pemod');
}

export const actualizarPedido = async (req, resp) => {
     let id, fecha, tipo_servicio, estado_pedido, cliente, empleado;
    id = req.body.idhtml;
    fecha = req.body.fechahtml;
    tipo_servicio = req.body.tiposerviciohtml;
    estado_pedido = req.body.estadopedidohtml;
    cliente = req.body.clienteIdhtml;
    empleado = req.body.empleadoIdhtml;
    let ModificarPedidoSQL = "UPDATE Pedidos SET fecha_pedidosPe = '" + fecha + "', tipo_servicioPe = '" + tipo_servicio + "', estadoPe = '" + estado_pedido + "', Cliente_idCliente = '" + cliente + "', Empleados_idEmpleado = '" + empleado + "' WHERE idPedido = '" + id + "';";
    try {
        const [registros] = await con.query(ModificarPedidoSQL);
        console.log(registros);
        resp.render('pedido/pemod');
    } catch (error) {
        console.log(error);
        resp.render('pedido/pemod', { error: 'No se pudo modificar el pedido' });
    }
}

export const pecons = (req, resp) => {
    resp.render('pedido/pecons', { pedido: null });
}

export const consultarPedido = async (req, resp) => {
    let id;
    id = req.body.idhtml;
    let consultarPedidoSQL = "SELECT * FROM Pedidos WHERE idPedido = '" + id + "';";
    try {
        const [registros] = await con.query(consultarPedidoSQL);
        console.log(registros);
        resp.render('pedido/pecons' , { pedido: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pecons', { error: 'No se pudo consultar el pedido', pedido: null });
    }
}



export const pemost= async (req,resp)=>{
    try{
        let mostrarsql="SELECT * from Pedidos";
        const[registros]= await con.query(mostrarsql)
        console.log(registros)
        resp.render('pedido/pemost',{registros});
    }
    catch(error){
        console.log(error);
    }

};

export const pedido = (req, resp) => {
    resp.render('pedido/pedido');
} 