import { conexion } from '../database/conexion.js';
const con = await conexion();

export const ealta = (req, resp) => {
    resp.render('ealta', { error: '' });
}

export const guardarEmpleado = async (req, resp) => {
    try {
        const { idEmpleado, nombreE, cargoE, turnoE} = req.body;

        if (!idEmpleado || !nombreE || !cargoE || !turnoE ) {
            return resp.render('ealta', { error: 'Complete todos los campos' });
        }

        const sql = 'INSERT INTO empleados (idEmpleado, nombreE, cargoE, turnoE) VALUES (?, ?, ?, ?)';
        await con.query(sql, [idEmpleado, nombreE, cargoE, turnoE]);

        resp.redirect('/empleado/Most');
    } catch (error) {
        console.log(error);
        resp.render('ealta', { error: 'No se pudo guardar el empleado' });
    }
}

export const ebaja = (req, resp) => {
    resp.render('ebaja', { error: '' });
}

export const borrarEmpleado = async (req, resp) => {
    try {
        const { idEmpleado } = req.body;

        if (!idEmpleado) {
            return resp.render('ebaja', { error: 'Ingrese un ID para borrar' });
        }

        const sql = 'DELETE FROM empleados WHERE idEmpleado = ?';
        const [resultado] = await con.query(sql, [idEmpleado]);

        if (resultado.affectedRows === 0) {
            return resp.render('ebaja', { error: 'No existe ese empleado' });
        }

        resp.redirect('/empleado/Most');
    } catch (error) {
        console.log(error);
        resp.render('ebaja', { error: 'No se pudo eliminar el empleado' });
    }
}

export const emod = (req, resp) => {
    resp.render('emod', { error: '' });
}

export const actualizarEmpleado = async (req, resp) => {
    try {
        const { idEmpleado, nombreE, cargoE, turnoE} = req.body;

        if (!idEmpleado || !nombreE || !cargoE || !turnoE ) {
            return resp.render('emod', { error: 'Complete todos los campos' });
        }

        const sql = 'UPDATE empleados SET nombreE = ?, cargoE = ?, turnoE = ? WHERE idEmpleado = ?';
        const [resultado] = await con.query(sql, [nombreE, cargoE, turnoE, idEmpleado]);

        if (resultado.affectedRows === 0) {
            return resp.render('emod', { error: 'No existe ese empleado' });
        }

        resp.redirect('/empleado/Most');
    } catch (error) {
        console.log(error);
        resp.render('emod', { error: 'No se pudo modificar el empleado' });
    }
}

export const econs = (req, resp) => {
    resp.render('econs', { error: '', empleado: null });
}

export const consultarEmpleado = async (req, resp) => {
    try {
        const { idEmpleado } = req.body;

        if (!idEmpleado) {
            return resp.render('econs', { error: 'Ingrese un ID para consultar', empleado: null });
        }

        const sql = 'SELECT * FROM empleados WHERE idEmpleado = ?';
        const [registros] = await con.query(sql, [idEmpleado]);

        if (registros.length === 0) {
            return resp.render('econs', { error: 'No existe ese empleado', empleado: null });
        }

        resp.render('econs', { error: '', empleado: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('econs', { error: 'No se pudo consultar el empleado', empleado: null });
    }
}

export const emost = async (req, resp) => {
    try {
        const sql = 'SELECT * FROM empleados';
        const [registros] = await con.query(sql);
        resp.render('emost', { registros });
    } catch (error) {
        console.log(error);
        resp.render('emost', { registros: [] });
    }
}

export const empleado = (req, resp) => {
    resp.render('empleado');
} 