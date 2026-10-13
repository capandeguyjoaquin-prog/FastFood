import { conexion } from '../database/conexion.js';
const con = await conexion();

export const producto = (req, resp) => {
    resp.render('productos');
}

export const pralta = (req, resp) => {
    resp.render('pralta', { error: '' });
}

export const guardarProducto = async (req, resp) => {
    try {
        const { idProducto, nombreP, categoriaP, precio_unitarioP } = req.body;

        if (!idProducto || !nombreP || !categoriaP || !precio_unitarioP) {
            return resp.render('pralta', { error: 'Complete todos los campos' });
        }

        const sql = 'INSERT INTO productos (idProducto, nombreP, categoriaP, precio_unitarioP) VALUES (?, ?, ?, ?)';
        await con.query(sql, [idProducto, nombreP, categoriaP, precio_unitarioP]);

        resp.redirect('/productos/Most');
    } catch (error) {
        console.log(error);
        resp.render('pralta', { error: 'No se pudo guardar el producto' });
    }
}

export const prbaja = (req, resp) => {
    resp.render('prbaja', { error: '' });
}

export const borrarProducto = async (req, resp) => {
    try {
        const { idProducto } = req.body;

        if (!idProducto) {
            return resp.render('prbaja', { error: 'Ingrese un ID para borrar' });
        }

        const sql = 'DELETE FROM productos WHERE idProducto = ?';
        const [resultado] = await con.query(sql, [idProducto]);

        if (resultado.affectedRows === 0) {
            return resp.render('prbaja', { error: 'No existe ese producto' });
        }

        resp.redirect('/productos/Most');
    } catch (error) {
        console.log(error);
        resp.render('prbaja', { error: 'No se pudo eliminar el producto' });
    }
}

export const prmod = (req, resp) => {
    resp.render('prmod', { error: '' });
}

export const actualizarProducto = async (req, resp) => {
    try {
        const { idProducto, nombreP, categoriaP, precio_unitarioP } = req.body;

        if (!idProducto || !nombreP || !categoriaP || !precio_unitarioP) {
            return resp.render('prmod', { error: 'Complete todos los campos' });
        }

        const sql = 'UPDATE productos SET nombreP = ?, categoriaP = ?, precio_unitarioP = ? WHERE idProducto = ?';
        const [resultado] = await con.query(sql, [nombreP, categoriaP, precio_unitarioP, idProducto]);

        if (resultado.affectedRows === 0) {
            return resp.render('prmod', { error: 'No existe ese producto' });
        }

        resp.redirect('/productos/Most');
    } catch (error) {
        console.log(error);
        resp.render('prmod', { error: 'No se pudo modificar el producto' });
    }
}

export const prcons = (req, resp) => {
    resp.render('prcons', { error: '', producto: null });
}

export const consultarProducto = async (req, resp) => {
    try {
        const { idProducto } = req.body;

        if (!idProducto) {
            return resp.render('prcons', { error: 'Ingrese un ID para consultar', producto: null });
        }

        const sql = 'SELECT * FROM productos WHERE idProducto = ?';
        const [registros] = await con.query(sql, [idProducto]);

        if (registros.length === 0) {
            return resp.render('prcons', { error: 'No existe ese producto', producto: null });
        }

        resp.render('prcons', { error: '', producto: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('prcons', { error: 'No se pudo consultar el producto', producto: null });
    }
}

export const prmost = async (req, resp) => {
    try {
        const [registros] = await con.query('SELECT * FROM productos');
        resp.render('prmost', { registros });
    } catch (error) {
        console.log(error);
        resp.render('prmost', { registros: [] });
    }
}
