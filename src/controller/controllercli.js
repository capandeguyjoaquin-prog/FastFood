import { conexion } from '../database/conexion.js';
const con = await conexion();

export const calta = (peq, resp) => {
    resp.render('cliente/calta');
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
        resp.render('cliente/calta')
    }catch(error){
        console.log(`error la sentencia insert ${error}`);
    }
}

export const cbaja = (req, resp) => {
    resp.render('cliente/cbaja');
}

export const borrarCliente = async (req, resp) => {
    let idCliente = req.body.idhtml;
    let EliminarClienteSQL = "DELETE FROM cliente WHERE idCliente = '" + idCliente + "';";
    try {
       const [registros] = await con.query(EliminarClienteSQL);
       console.log(registros);
       resp.render('cliente/cbaja');
    } catch (error) {
        console.log(error);
        resp.render('cliente/cbaja', { error: 'No se pudo eliminar el cliente' });
    }
}

export const cmod = (req, resp) => {
    resp.render('cliente/cmod');
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
        resp.render('cliente/cmod');
    } catch (error) {
        console.log(error);
        resp.render('cliente/cmod', { error: 'No se pudo modificar el cliente' });
    }
}

export const ccons = (req, resp) => {
    resp.render('cliente/ccons', { cliente: null });
}

export const consultarCliente = async (req, resp) => {
    let id;
    id = req.body.idhtml;
    let consultarClienteSQL = "SELECT * FROM cliente WHERE idCliente = '" + id + "';";
    try {
        const [registros] = await con.query(consultarClienteSQL);
        console.log(registros);
        resp.render('cliente/ccons' , { cliente: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('cliente/ccons', { error: 'No se pudo consultar el cliente', cliente: null });
    }
}



export const cmost= async (peq,resp)=>{
    try{
        let mostrarsql="SELECT * from Cliente";
        const[registros]= await con.query(mostrarsql)
        console.log(registros)
        resp.render('cliente/cmost',{registros});
    }
    catch(error){
        console.log(error);
    }

};

export const cliente = (req, resp) => {
    resp.render('cliente/cliente');
} 