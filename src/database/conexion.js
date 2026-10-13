import Mysql from "mysql2/promise";

export async function conexion() {
    try {
        const conexion = await Mysql.createPool({
            host: 'localhost',
            database: 'fastfood',
            user: 'root',
            password: 'Losmemes190_'
        });

        console.log('conectado')
        return conexion;
    }catch (error) {
        console.log('error de conexion')
        console.log(error)
    }
}