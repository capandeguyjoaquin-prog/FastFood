import { conexion } from '../database/conexion.js';

const con = await conexion();

export const pedido = (req, resp) => {
    resp.render('pedido/pedido');
};

export const pealta = (req, resp) => {
    resp.render('pedido/pealta', {
        error: null,
        mensaje: null,
        mostrarDetalle: false,
        pedidoId: null
    });
};

export const guardarPedido = async (req, resp) => {
    let id, fecha, tipo_servicio, estado_pedido, cliente, empleado;

    id = req.body.idhtml;
    fecha = req.body.fechahtml;
    tipo_servicio = req.body.tiposerviciohtml;
    estado_pedido = req.body.estadopedidohtml;
    cliente = req.body.clienteIdhtml;
    empleado = req.body.empleadoIdhtml;

    if(fecha) {
        fecha = fecha.replace('T', ' ');
        if (fecha.length === 16) {
            fecha = fecha + ':00';
        }
    }

    let Altasql = `INSERT INTO Pedidos
        (idPedido, fecha_pedidosPe, tipo_servicioPe, estadoPe,
        Cliente_idCliente, Empleados_idEmpleado)
    VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const [registros] = await con.query(Altasql, [
            id, fecha, tipo_servicio, estado_pedido, cliente, empleado
        ]);

        console.log(registros);
        resp.render('pedido/pealta', {
            error: null,
            mensaje: null,
            mostrarDetalle: true,
            pedidoId: id
        });
    } catch (error) {
        console.log(`Error al guardar el pedido: ${error}`);
        resp.render('pedido/pealta', {
            error: 'No se pudo guardar el pedido. Verificá que el cliente y el empleado existan.',
            mensaje: null,
            mostrarDetalle: false,
            pedidoId: null
        });
    }
};

export const guardarDetalle = async (req, resp) => {
    let id, cantidad, producto, pedido;
    id = req.body.idhtml;
    cantidad = req.body.cantidadhtml;
    producto = req.body.idproductohtml;
    pedido = req.body.idpedidohtml;

    try {
        const [productos] = await con.query(
            'SELECT precio_unitarioP FROM Productos WHERE idProducto = ?',
            [producto]
        );

        if (productos.length === 0) {
            throw new Error('No existe el producto indicado');
        }

        let subtotal = Number(productos[0].precio_unitarioP) * Number(cantidad);

        let AltadetalleSQL = `INSERT INTO Detalle_Pedido
            (idDetalle, cantidadDeta, subtotalDeta, Productos_idProducto, Pedidos_idPedido)
            VALUES (?, ?, ?, ?, ?)`;

        const [registros] = await con.query(AltadetalleSQL, [
            id, cantidad, subtotal, producto, pedido
        ]);

        console.log(registros);
        resp.render('pedido/pealta', {
            error: null,
            mensaje: null,
            mostrarDetalle: false,
            pedidoId: null
        });
    } catch (error) {
        console.log(`Error al guardar el detalle: ${error}`);
        resp.render('pedido/pealta', {
            error: 'No se pudo guardar el detalle. Verificá que el pedido y el producto existan.',
            mensaje: null,
            mostrarDetalle: true,
            pedidoId: pedido
        });
    }
};

export const pebaja = (req, resp) => {
    resp.render('pedido/pebaja', { error: null });
};

export const borrarPedido = async (req, resp) => {
    let idPedido = req.body.idhtml;

    try {
        let EliminarDetallesSQL =
            'DELETE FROM Detalle_Pedido WHERE Pedidos_idPedido = ?';
        await con.query(EliminarDetallesSQL, [idPedido]);

        let EliminarPedidoSQL =
            'DELETE FROM Pedidos WHERE idPedido = ?';
        const [registros] = await con.query(EliminarPedidoSQL, [idPedido]);

        console.log(registros);
        resp.render('pedido/pebaja', { error: null });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pebaja', {
            error: 'No se pudo eliminar el pedido y sus detalles.'
        });
    }
};

export const borrarDetalle = async (req, resp) => {
    try {
        let EliminarDetalleSQL =
            'DELETE FROM Detalle_Pedido WHERE idDetalle = ?';
        const [registros] = await con.query(EliminarDetalleSQL, [req.body.idhtml]);

        console.log(registros);
        resp.render('pedido/pebaja', { error: null });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pebaja', {
            error: 'No se pudo eliminar el detalle.'
        });
    }
};

export const pemod = (req, resp) => {
    resp.render('pedido/pemod', {
        error: null,
        mensaje: null,
        mostrarDetalle: false,
        pedidoId: null
    });
};

export const actualizarPedido = async (req, resp) => {
    let id, fecha, tipo_servicio, estado_pedido, cliente, empleado;

    id = req.body.idhtml;
    fecha = req.body.fechahtml;
    tipo_servicio = req.body.tiposerviciohtml;
    estado_pedido = req.body.estadopedidohtml;
    cliente = req.body.clienteIdhtml;
    empleado = req.body.empleadoIdhtml;

    if (fecha) {
        fecha = fecha.replace('T', ' ');
        if (fecha.length === 16) {
            fecha = fecha + ':00';
        }
    }

    let ModificarPedidoSQL = `UPDATE Pedidos
        SET fecha_pedidosPe = ?, tipo_servicioPe = ?, estadoPe = ?,
            Cliente_idCliente = ?, Empleados_idEmpleado = ?
        WHERE idPedido = ?`;

    try {
        const [registros] = await con.query(ModificarPedidoSQL, [
            fecha, tipo_servicio, estado_pedido, cliente, empleado, id
        ]);

        console.log(registros);
        resp.render('pedido/pemod', {
            error: null,
            mensaje: null,
            mostrarDetalle: true,
            pedidoId: id
        });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pemod', {
            error: 'No se pudo modificar el pedido.',
            mensaje: null,
            mostrarDetalle: false,
            pedidoId: null
        });
    }
};

export const actualizarDetalle = async (req, resp) => {
    let id, cantidad, producto, pedido;
    id = req.body.idhtml;
    cantidad = req.body.cantidadhtml;
    producto = req.body.idproductohtml;
    pedido = req.body.idpedidohtml;

    try {
        const [productos] = await con.query(
            'SELECT precio_unitarioP FROM Productos WHERE idProducto = ?',
            [producto]
        );

        if (productos.length === 0) {
            throw new Error('No existe el producto indicado');
        }

        let subtotal = Number(productos[0].precio_unitarioP) * Number(cantidad);

        let ModificarDetalleSQL = `UPDATE Detalle_Pedido
            SET cantidadDeta = ?, subtotalDeta = ?,
                Productos_idProducto = ?, Pedidos_idPedido = ?
            WHERE idDetalle = ?`;

        const [registros] = await con.query(ModificarDetalleSQL, [
            cantidad, subtotal, producto, pedido, id
        ]);

        console.log(registros);
        resp.render('pedido/pemod', {
            error: null,
            mensaje: 'Detalle modificado correctamente.',
            mostrarDetalle: false,
            pedidoId: null
        });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pemod', {
            error: 'No se pudo modificar el detalle.',
            mensaje: null,
            mostrarDetalle: true,
            pedidoId: pedido
        });
    }
};

export const pecons = (req, resp) => {
    resp.render('pedido/pecons', {
        error: null,
        pedido: null,
        detalles: [],
        detalle: null
    });
};

export const consultarPedido = async (req, resp) => {
    let id = req.body.idhtml;

    let consultarPedidoSQL = `SELECT pe.*,
        c.nombreC AS nombreCliente,
        e.nombreE AS nombreEmpleado
        FROM Pedidos pe
        LEFT JOIN cliente c ON c.idCliente = pe.Cliente_idCliente
        LEFT JOIN Empleados e ON e.idEmpleado = pe.Empleados_idEmpleado
        WHERE pe.idPedido = ?`;

    try {
        const [pedidos] = await con.query(consultarPedidoSQL, [id]);

        if (pedidos.length === 0) {
            return resp.render('pedido/pecons', {
                error: 'No se encontró el pedido.',
                pedido: null,
                detalles: [],
                detalle: null
            });
        }

        let consultarDetallesSQL = `SELECT d.*, p.nombreP AS nombreProducto
            FROM Detalle_Pedido d
            LEFT JOIN Productos p ON p.idProducto = d.Productos_idProducto
            WHERE d.Pedidos_idPedido = ?`;

        const [detalles] = await con.query(consultarDetallesSQL, [id]);

        resp.render('pedido/pecons', {
            error: null,
            pedido: pedidos[0],
            detalles: detalles,
            detalle: null
        });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pecons', {
            error: 'No se pudo consultar el pedido.',
            pedido: null,
            detalles: [],
            detalle: null
        });
    }
};

export const consultarDetalle = async (req, resp) => {
    try {
        let consultarDetalleSQL = `SELECT d.*, p.nombreP AS nombreProducto
            FROM Detalle_Pedido d
            LEFT JOIN Productos p ON p.idProducto = d.Productos_idProducto
            WHERE d.idDetalle = ?`;

        const [detalles] = await con.query(consultarDetalleSQL, [req.body.idhtml]);

        resp.render('pedido/pecons', {
            error: detalles.length ? null : 'No se encontró el detalle.',
            pedido: null,
            detalles: [],
            detalle: detalles[0] || null
        });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pecons', {
            error: 'No se pudo consultar el detalle.',
            pedido: null,
            detalles: [],
            detalle: null
        });
    }
};

export const pemost = async (req, resp) => {
    try {
        let mostrarPedidosSQL = `SELECT pe.*,
            c.nombreC AS nombreCliente,
            e.nombreE AS nombreEmpleado
            FROM Pedidos pe
            LEFT JOIN cliente c ON c.idCliente = pe.Cliente_idCliente
            LEFT JOIN Empleados e ON e.idEmpleado = pe.Empleados_idEmpleado`;

        const [pedidos] = await con.query(mostrarPedidosSQL);

        let mostrarDetallesSQL = `SELECT d.*, p.nombreP AS nombreProducto
            FROM Detalle_Pedido d
            LEFT JOIN Productos p ON p.idProducto = d.Productos_idProducto`;

        const [detalles] = await con.query(mostrarDetallesSQL);

        resp.render('pedido/pemost', {
            error: null,
            pedidos: pedidos,
            detalles: detalles
        });
    } catch (error) {
        console.log(error);
        resp.render('pedido/pemost', {
            error: 'No se pudieron mostrar los pedidos y detalles.',
            pedidos: [],
            detalles: []
        });
    }
};