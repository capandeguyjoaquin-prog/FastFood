import { conexion } from '../database/conexion.js';
const con = await conexion();

export const calta = (req, resp) => {
    resp.render('cliente/calta', { error: null, mensaje: null });
}

export const guardarCliente = async (req, resp) => {
    let id, nombre,apellido, direc, tel;
    id = req.body.idhtml;
    nombre = req.body.nomhtml;
    apellido = req.body.apellidohtml;
    tel = req.body.telhtml;
    direc = req.body.dirhtml;
    
    let Altasql = "INSERT INTO cliente (idCliente,nombreC,apellidoC,telefonoC,direccionC) VALUES ('"+ id+"','"+ nombre +"','"+ apellido +"','"+ tel+"','"+ direc+"');";
    try{

        const[registros]= await con.query(Altasql);
        console.log(registros)
        resp.render('cliente/calta', {
            error: null,
            mensaje: 'Cliente guardado correctamente.'
        });
    }catch(error){
        console.log(`error la sentencia insert ${error}`);
        resp.render('cliente/calta', {
            error: 'No se pudo guardar el cliente. Verifica los datos e intenta nuevamente.',
            mensaje: null
        });
    }
}

export const cbaja = (req, resp) => {
    resp.render('cliente/cbaja', {
        error: null,
        mensaje: null
    });
}

export const borrarCliente = async (req, resp) => {
    let idCliente = req.body.idhtml;
    let EliminarClienteSQL = "DELETE FROM cliente WHERE idCliente = '" + idCliente + "';";
    try {
       const [registros] = await con.query(EliminarClienteSQL);
       console.log(registros);
       resp.render('cliente/cbaja', {
            error: null,
            mensaje: 'Cliente eliminado correctamente.'
        });
    } catch (error) {
        console.log(error);
        resp.render('cliente/cbaja', {
            error: 'No se pudo eliminar el cliente. Verifica los datos e intenta nuevamente.',
            mensaje: null
        });
    }
}

export const cmod = (req, resp) => {
    resp.render('cliente/cmod', { error: null, mensaje: null });
}

export const actualizarCliente = async (req, resp) => {
    let id, nombre,apellido, direc, tel;
    id = req.body.idhtml;
    nombre = req.body.nomhtml;
    apellido = req.body.apellidohtml;
    tel = req.body.telhtml;
    direc = req.body.dirhtml;
    let ModificarClienteSQL = "UPDATE cliente SET nombreC = '" + nombre + "', apellidoC = '" + apellido + "', telefonoC = '" + tel + "', direccionC = '" + direc + "' WHERE idCliente = '" + id + "';";
    try {
        const [registros] = await con.query(ModificarClienteSQL);
        console.log(registros);
        resp.render('cliente/cmod', {
            error: null,
            mensaje: 'Cliente modificado correctamente.'
        });
    } catch (error) {
        console.log(error);
        resp.render('cliente/cmod', {
            error: 'No se pudo modificar el cliente. Verifica los datos e intenta nuevamente.',
            mensaje: null
        });
    }
}

export const ccons = (req, resp) => {
    resp.render('cliente/ccons', { cliente: null , error: null, mensaje: null });
}

export const consultarCliente = async (req, resp) => {
    let id;
    id = req.body.idhtml;
    let consultarClienteSQL = "SELECT * FROM cliente WHERE idCliente = '" + id + "';";
    try {
        const [registros] = await con.query(consultarClienteSQL);
        console.log(registros);
        resp.render('cliente/ccons' , { cliente: registros[0] }, {
            error: null,
            mensaje: 'Cliente consultado correctamente.'
        });
    } catch (error) {
        console.log(error);
        resp.render('cliente/ccons', {
            error: 'No se pudo consultar el cliente. Verifica los datos e intenta nuevamente.',
            mensaje: null
            , cliente: null
        });
    }
}



export const cmost= async (req,resp)=>{
    try{
        let mostrarsql="SELECT * from Cliente";
        const[registros]= await con.query(mostrarsql)
        console.log(registros)
        resp.render('cliente/cmost',{registros});
    }
    catch(error){
        console.log(error);
        resp.render('cliente/cmost', {
            error: 'No se pudo mostrar los clientes. Verifica los datos e intenta nuevamente.',
            mensaje: null
            , cliente: null
        });
    }

};

export const cliente = (req, resp) => {
    resp.render('cliente/cliente');
} 