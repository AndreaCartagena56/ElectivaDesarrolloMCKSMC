const mysql = require('mysql2');

// Configura tu conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_pec',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class UserRepository {

        // Simulación de la búsqueda de un usuario por cédula
        async findByDocumentNumber(Documento) {
            console.log(Documento)
            // Implementación que consulta en la base de datos
            // Retorna el usuario si existe, o null si no existe
           const[rows]= await promisePool.query('SELECT * FROM registro WHERE Documento = ?', [Documento]);
            return rows.length > 0 ? rows[0] : null;

        }
    
        // Simulación de la búsqueda de un usuario por nombre de usuario
        async findByUsername(Nombre_de_Usuario) {
            // Implementación que consulta en la base de datos
            // Retorna el usuario si existe, o null si no existe
            const[rows]= await promisePool.query('SELECT * FROM registro WHERE Nombre_de_Usuario = ?', [Nombre_de_Usuario]);
            return rows.length > 0 ? rows[0] : null;

        }
    
    
    async createUser(user) {
        const { Documento, Tipo_doc, Nombre_Completo, Correo_Electronico, Nombre_de_Usuario, Contrasena } = user;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO registro (Documento, Tipo_doc, Nombre_Completo, Correo_Electronico, Nombre_de_Usuario, Contrasena) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [Documento, Tipo_doc, Nombre_Completo, Correo_Electronico, Nombre_de_Usuario, Contrasena]
            );
            return { Id: result.insertId, ...user };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new UserRepository();
