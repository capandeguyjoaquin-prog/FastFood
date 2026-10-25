import { conexion } from '../database/conexion.js';
const con = await conexion();

export const ealta = (req, resp) => {
    resp.render('empleado/ealta');
}

export const guardarEmpleado = async (req, resp) => {
    let id, nombre,cargo,turno;
    id = req.body.idhtml;
    nombre = req.body.nomhtml;
    cargo = req.body.cargohtml;
    turno = req.body.turnohtml;
    
    let Altasql = "INSERT INTO Empleados (idEmpleado,nombreE,cargoE,turnoE) VALUES ('"+ id+"','"+ nombre +"','"+ cargo +"','"+ turno+"');";
    try{
        const[registros]= await con.query(Altasql);
        console.log(registros)
        resp.render('empleado/ealta')
    }catch(error){
        console.log(`error la sentencia insert ${error}`);
    }
}

export const ebaja = (req, resp) => {
    resp.render('empleado/ebaja');
}

export const borrarEmpleado = async (req, resp) => {
    let idEmpleado = req.body.idhtml;
    let EliminarEmpleadoSQL = "DELETE FROM Empleados WHERE idEmpleado = '" + idEmpleado + "';";
    try {
       const [registros] = await con.query(EliminarEmpleadoSQL);
       console.log(registros);
       resp.render('empleado/ebaja');
    } catch (error) {
        console.log(error);
        resp.render('empleado/ebaja', { error: 'No se pudo eliminar el empleado' });
    }
}

export const emod = (req, resp) => {
    resp.render('empleado/emod');
}

export const actualizarEmpleado = async (req, resp) => {
    let id, nombre,cargo,turno;
    id = req.body.idhtml;
    nombre = req.body.nomhtml;
    cargo = req.body.cargohtml;
    turno = req.body.turnohtml;
    let ModificarEmpleadoSQL = "UPDATE Empleados SET nombreE = '" + nombre + "', cargoE = '" + cargo + "', turnoE = '" + turno + "' WHERE idEmpleado = '" + id + "';";
    try {
        const [registros] = await con.query(ModificarEmpleadoSQL);
        console.log(registros);
        resp.render('empleado/emod');
    } catch (error) {
        console.log(error);
        resp.render('empleado/emod', { error: 'No se pudo modificar el empleado' });
    }
}

export const econs = (req, resp) => {
    resp.render('empleado/econs', { empleado: null });
}

export const consultarEmpleado = async (req, resp) => {
    let id;
    id = req.body.idhtml;
    let consultarEmpleadoSQL = "SELECT * FROM Empleados WHERE idEmpleado = '" + id + "';";
    try {
        const [registros] = await con.query(consultarEmpleadoSQL);
        console.log(registros);
        resp.render('empleado/econs' , { empleado: registros[0] });
    } catch (error) {
        console.log(error);
        resp.render('empleado/econs', { error: 'No se pudo consultar el empleado', empleado: null });
    }
}



export const emost= async (req,resp)=>{
    try{
        let mostrarsql="SELECT * from Empleados";
        const[registros]= await con.query(mostrarsql)
        console.log(registros)
        resp.render('empleado/emost',{registros});
    }
    catch(error){
        console.log(error);
    }

};

export const empleado = (req, resp) => {
    resp.render('empleado/empleado');
} 