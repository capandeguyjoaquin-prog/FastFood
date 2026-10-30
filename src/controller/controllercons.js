import { conexion } from '../database/conexion.js';

const con = await conexion();

export const consultas = (req, resp) => {
    resp.render('consultas/consultas');
};

export const mostrarListprod = (req, resp) => {
    resp.render('consultas/listprod', {
        error: null,
        productos: [],
        precioMinimo: '',
        busquedaRealizada: false
    });
};

export const listarProductosPorPrecio = async (req, resp) => {
    let precioMinimo = req.body.precioMinimo;
    let precioNumerico = Number(precioMinimo);

    let ListarProductosSQL = `SELECT idProducto, nombreP, precio_unitarioP, categoriaP
    FROM Productos WHERE precio_unitarioP > ` + precioNumerico + ` ORDER BY precio_unitarioP DESC`;

    try {
        const [registros] = await con.query(ListarProductosSQL);

        resp.render('consultas/listprod', {
            error: null,
            productos: registros,
            precioMinimo,
            busquedaRealizada: true
        });
    } catch (error) {
        console.log(`Error al listar productos: ${error}`);
        resp.render('consultas/listprod', {
            error: 'No se pudieron consultar los productos.',
            productos: [],
            precioMinimo,
            busquedaRealizada: false
        });
    }
};

export const mostrarPedcliente = (req, resp) => {
    resp.render('consultas/pedcliente', {
        error: null,
        pedidos: [],
        clienteId: '',
        busquedaRealizada: false
    });
};

export const listarPedidosCliente = async (req, resp) => {
    let clienteId = req.body.clienteId;

    let ListarPedidosSQL = `SELECT idPedido, fecha_pedidosPe, tipo_servicioPe, estadoPe
    FROM Pedidos WHERE Cliente_idCliente = ` + clienteId + ` ORDER BY fecha_pedidosPe DESC`;

    try {
        const [registros] = await con.query(ListarPedidosSQL);

        resp.render('consultas/pedcliente', {
            error: null,
            pedidos: registros,
            clienteId,
            busquedaRealizada: true
        });
    } catch (error) {
        console.log(`Error al listar pedidos del cliente: ${error}`);
        resp.render('consultas/pedcliente', {
            error: 'No se pudieron consultar los pedidos.',
            pedidos: [],
            clienteId,
            busquedaRealizada: false
        });
    }
};

export const mostrarTotaldia = async (req, resp) => {
    let TotalDiaSQL = `SELECT
            CURDATE() AS fecha,
            COUNT(DISTINCT pe.idPedido) AS cantidadPedidos,
            COALESCE(SUM(d.subtotalDeta), 0) AS totalRecaudado
        FROM Pedidos pe
        LEFT JOIN Detalle_Pedido d
            ON d.Pedidos_idPedido = pe.idPedido
        WHERE pe.fecha_pedidosPe >= CURDATE()
          AND pe.fecha_pedidosPe < CURDATE() + INTERVAL 1 DAY`;

    try {
        const [registros] = await con.query(TotalDiaSQL);

        resp.render('consultas/totaldia', {
            error: null,
            resultado: registros[0]
        });
    } catch (error) {
        console.log(`Error al calcular el total recaudado: ${error}`);
        resp.render('consultas/totaldia', {
            error: 'No se pudo calcular la recaudación del día.',
            resultado: null
        });
    }
};