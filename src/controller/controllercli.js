import { conexion } from '../database/conexion.js';
const con = await conexion();

export const calta = (req, resp) => {
    resp.render('calta', { error: '' });
}

export const guardarCliente = async (req, resp) => {
    try {
        const { idCliente, nombreC, apellidoC, telefonoC, direccionC } = req.body;

        if (!idCliente || !nombreC || !apellidoC || !telefonoC || !direccionC) {
            return resp.render('calta', { error: 'Complete todos los campos' });
        }

        const sql = 'INSERT INTO cliente (idCliente, nombreC, apellidoC, telefonoC, direccionC) VALUES (?, ?, ?, ?, ?)';
        await con.query(sql, [idCliente, nombreC, apellidoC, telefonoC, direccionC]);

        resp.redirect('/cliente/Most');
    } catch (error) {
        console.log(error);
        resp.render('calta', { error: 'No se pudo guardar el cliente' });
    }
}

export const cbaja = (req, resp) => {
    resp.render('cbaja', { error: '' });
}

export const borrarCliente = async (req, resp) => {
    try {
        const { idCliente } = req.body;

        if (!idCliente) {
            return resp.render('cbaja', { error: 'Ingrese un ID para borrar' });
        }

        const sql = 'DELETE FROM cliente WHERE idCliente = ?';
        const [resultado] = await con.query(sql, [idCliente]);

        if (resultado.affectedRows === 0) {
            return resp.render('cbaja', { error: 'No existe ese cliente' });
        }

        resp.redirect('/cliente/Most');
    } catch (error) {
        console.log(error);
        resp.render('cbaja', { error: 'No se pudo eliminar el cliente' });
    }
}

export const cmod = (req, resp) => {
    resp.render('cmod', { error: '' });
}

export const actualizarCliente = async (req, resp) => {
    try {
        const { idCliente, nombreC, apellidoC, telefonoC, direccionC } = req.body;

        if (!idCliente || !nombreC || !apellidoC || !telefonoC || !direccionC) {
            return resp.render('cmod', { error: 'Complete todos los campos' });
        }

        const sql = 'UPDATE cliente SET nombreC = ?, apellidoC = ?, telefonoC = ?, direccionC = ? WHERE idCliente = ?';
        const [resultado] = await con.query(sql, [nombreC, apellidoC, telefonoC, direccionC, idCliente]);

        if (resultado.affectedRows === 0) {
            return resp.render('cmod', { error: 'No existe ese cliente' });
        }

        resp.redirect('/cliente/Most');
    } catch (error) {
        console.log(error);
        resp.render('cmod', { error: 'No se pudo modificar el cliente' });
    }
}

export const ccons = (req, resp) => {
    resp.render('ccons', { error: '', cliente: null });
}

export const consultarCliente = async (req, resp) => {
    try {
        const { idCliente } = req.body;

        if (!idCliente) {
            return resp.render('ccons', { error: 'Ingrese un ID para consultar', cliente: null });
        }

        const sql = 'SELECT * FROM cliente WHERE idCliente = ?';
        const [registros] = await con.query(sql, [idCliente]);

        if (registros.length === 0) {
            return resp.render('ccons', { error: 'No existe ese cliente', cliente: null });
        }

        resp.render('ccons', { error: '', cliente: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('ccons', { error: 'No se pudo consultar el cliente', cliente: null });
    }
}

export const cmost = async (req, resp) => {
    try {
        const sql = 'SELECT * FROM cliente';
        const [registros] = await con.query(sql);
        resp.render('cmost', { registros });
    } catch (error) {
        console.log(error);
        resp.render('cmost', { registros: [] });
    }
}

export const cliente = (req, resp) => {
    resp.render('cliente');
} 